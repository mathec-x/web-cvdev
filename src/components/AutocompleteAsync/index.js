import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
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
const AutocompleteAsynchronous = ({ Service, OnSet, OptionLabel, allowCreate = true, clearOnSet, variant, label, placeholder, disableUnderline = undefined, ...props }) => {
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(props.defaultValue);

  const debouncedValue = useDebounce(inputValue, 500);

  React.useEffect(() => {
    if (inputValue) {
      setLoading(true)
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

  }, [debouncedValue]);

  return (
    <Autocomplete
      {...props}
      fullWidth
      autoHighlight
      freeSolo
      isOptionEqualToValue={(option, value) => option[OptionLabel] === value[OptionLabel]}
      getOptionLabel={x => {
        return x.isNew ? 'Novo: ' + x[OptionLabel] : x[OptionLabel]
      }}
      options={options}
      onChange={(_, data) => OnSet(data) && setInputValue('') }
      onInputChange={(e) => setInputValue(e.currentTarget?.value)}
      loading={loading}
      filterOptions={(defopts, params) => {
        const { inputValue } = params;
        let isExisting = 2;

        if (defopts.length > 0) {
          isExisting = defopts?.Search(inputValue)?.length || 0;
        }

        if (!loading && allowCreate && inputValue !== '' && isExisting !== 1) {
          defopts.push({
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