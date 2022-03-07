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
    setInputValue('');
    return OnSet && OnSet(data);
  }

  const debouncedValue = useDebounce(inputValue, 500);

  const fetcher = () => {
    setLoading(true);
    Service(inputValue)
      .then((res) => res.json())
      .then((data) => {
        setOptions([...data])
      })
      .catch(() => setOptions([]))
      .finally(() => {
        setLoading(false);
      });
  }

  React.useEffect(() => {
    if (debouncedValue) {
      fetcher();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <Autocomplete
      {...props}
      fullWidth
      autoHighlight
      freeSolo
      isOptionEqualToValue={(option, value) => option[OptionLabel] === value[OptionLabel]}
      getOptionLabel={x => x[OptionLabel] }
      sx={{
        '& input': {
          fontSize: (theme) => 
            theme.typography.caption.fontSize
        },
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
        const { inputValue } = params;
        let isExisting = 2;

        if (defopts.length > 0) {
          isExisting = defopts?.Search(inputValue)?.length || 0;
        }

        if (!loading && allowCreate && inputValue !== '' && isExisting !== 1) {
          defopts.unshift({
            isNew: true,
            [OptionLabel]: inputValue
          });
        }
        return defopts;
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          value={inputValue}
          variant={variant}
          placeholder={placeholder}
          label={label}
          InputProps={{
            ...params.InputProps,
            disableUnderline: disableUnderline,
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

export default AutocompleteAsynchronous;