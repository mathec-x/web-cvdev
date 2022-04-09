import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import { useDebounce } from 'usehooks-ts';

/**
 * 
 * @type { <DefaultValue extends any>(props: Partial<import('@mui/material').AutocompleteProps> & {
 *  Service(value: DefaultValue): Promise<any> 
 *  OnSet(value: DefaultValue): any
 *  OptionLabel: string
 *  label?: string
 *  placeholder?: any
 *  variant?: any
 *  allowCreate?: boolean 
 *  disableUnderline?: boolean
 *  clearOnSet?: boolean
 *  helperText?: string
 *  defaultValue?: DefaultValue
 * }) => JSX.Element } props
 */
const AutocompleteAsynchronous = ({
  Service,
  OnSet,
  OptionLabel,
  allowCreate = true,
  clearOnSet,
  variant,
  label,
  placeholder,
  size = 'small',
  disableUnderline = undefined,
  ...props }) => {
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(props.defaultValue);

  const handleChange = (_, data) => {
    if(clearOnSet){
      setInputValue('');
    }
    if(OnSet) {
      OnSet(data);
    }
  }

  const debouncedValue = useDebounce(inputValue, 1000);

  const fetcher = () => {
    setOptions([]);
    setLoading(true);
    Service(inputValue)
    .then((response) => {
      if(response.status === 200)
      setOptions([...response.data])
    })
    .catch(() => setOptions([]))
    .finally(() => {
      setLoading(false);
      });
  }
  
  React.useEffect(() => {
    if (!!debouncedValue) {
      fetcher();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const autocompleteProps = {};

  if(disableUnderline){
    autocompleteProps['disableUnderline'] = true;
  }

  return (
    <Autocomplete
      {...props}
      fullWidth
      autoHighlight
      freeSolo
      // value={inputValue}
      isOptionEqualToValue={(option, value) => option[OptionLabel] === value[OptionLabel]}
      getOptionLabel={x => x[OptionLabel]}
      sx={{
        '& label': {
          fontSize: (theme) =>
            theme.typography.caption.fontSize
        },
        '& input': {
          fontSize: (theme) =>
            theme.typography.caption.fontSize
        }
      }}
      options={options}
      onChange={handleChange}
      onInputChange={(e) => setInputValue(e.currentTarget?.value)}
      loading={loading}
      size={size}
      renderOption={(props, option, { selected }) => (
        <ListItem dense selected={selected} {...props}>
          <ListItemText
            primaryTypographyProps={{
              variant: 'caption'
            }}
            primary={option[OptionLabel]}
            secondaryTypographyProps={{
              variant: 'caption',
              fontSize: 12
            }}
            secondary={option?.isNew && 'Adicionar novo'}
          />
        </ListItem>
      )}
      filterOptions={(defopts, params) => {
        const inputValue = params.inputValue;
        if (allowCreate) {
          let isExisting = 2;
          if (defopts.length > 0) {
            isExisting = defopts?.Search(inputValue)?.length || 0;
          }

          if (!loading && inputValue !== '' && isExisting !== 1) {
            defopts.unshift({
              isNew: true,
              [OptionLabel]: inputValue
            });
          }
        }

        return defopts;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          onFocus={({target}) => target.select()}
          variant={variant}
          placeholder={placeholder}
          label={label}
          InputProps={{
            ...params.InputProps,
            ...autocompleteProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

export default React.memo(AutocompleteAsynchronous);