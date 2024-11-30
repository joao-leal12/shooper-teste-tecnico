
import { useFormLocalization } from '../Input/hooks/useFormLocalization';
import styles from './request-trip.module.css';

import { Autocomplete, Box, TextField, Typography } from '@mui/material';


import parse from 'autosuggest-highlight/parse'
import { useGetAutoCompletePlaces } from '../Input/hooks/useGetAutoCompletePlaces';



const autoCompleteStyle = { 
  borderRadius: '.8rem', 
 
  outline: '1px solid var(--green-btn)', 
  border: '1px solid var(--green-btn)',
  "focus": {
    color: 'none!important', 
    border: 'none!important', 
    outline:'none!important', 
    background: 'transparent!important'
  }, 
  "hover": {
    color: 'none!important', 
    border: 'none!important', 
    outline:'none!important', 
    background: 'transparent!important'
  },
  "active": {
    color: 'none', 
    border: 'none', 
    outline:'none', 
    background: 'transparent'
  }


}

export const RequestTrip = () => {

  
  
  const {control, handleSubmit, register, Controller, errors, onSubmitField} = useFormLocalization();

  const {setInputValue, optionsOrigin, optionsDestination,  inputValue, destinationValue, setDestinationValue} = useGetAutoCompletePlaces(); 
  

  return (
    <section className={styles.requestTripContainer}>
      <form className={styles.requestTripContainerForm} onSubmit={handleSubmit(onSubmitField)}>
        <TextField sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "var(--green-btn-hover)", 
                },
                "&:hover fieldset":{ 
                    borderColor: 'var(--green-btn-hover)'
                },
              },
            }}{...register("name")} className={styles.inputName} label="Digite o seu Nome"
            
            />
        <p className={styles.errorMessage}>{errors.name?.message}</p>
        <Controller
        name="origin"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            sx={autoCompleteStyle}
            value={inputValue}
            noOptionsText="Nenhum local encontrado"
            getOptionLabel={(option: {description: string} | string) => (typeof option === 'string' ? option : option.description)}
            filterOptions={(x) => x}
            options={optionsOrigin}
            autoComplete
            includeInputInList
            filterSelectedOptions
            onInputChange={(_, newInputValue) => {
              setInputValue(newInputValue)
            }}
            onChange={(_, newValue) => {
              if(typeof newValue === 'string'){ 
                field.onChange(newValue) 
                return 
              }
              field.onChange(newValue?.description);
            }}
            renderInput={(params) => <TextField {...params}  sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "var(--green-btn-hover)", 
                },
                "&:hover fieldset":{ 
                    borderColor: 'var(--green-btn-hover)'
                },
              },
            }}label="Digite o Ponto de Partida" />}
            renderOption={(props, option: any) => {
              const { key, ...optionProps } = props;
              const matches = option.structured_formatting.main_text_matched_substrings || [];

              const parts = parse(
                option.structured_formatting.main_text,
                matches.map((match: {offset: number, length: number}) => [match.offset, match.offset + match.length])
              );
              return (
                <li key={key} {...optionProps} >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                      {parts.map((part, index) => (
                        <Box
                          key={index}
                          component="span"
                          sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                        >
                          {part.text}
                        </Box>
                      ))}
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {option.structured_formatting.secondary_text}
                      </Typography>
                    </Box>
                  </Box>
                </li>
              );
            }}
          />
        )}
      />
        <p className={styles.errorMessage}>{errors.origin?.message}</p>
        <Controller
        name="destination"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            sx={autoCompleteStyle}
            value={destinationValue}
            noOptionsText="Nenhum local encontrado"
            getOptionLabel={(option: any) => ( typeof option === 'string' ? option : option.description)}
            filterOptions={(x) => x}
            options={optionsDestination}
            autoComplete
            includeInputInList
            filterSelectedOptions
            onInputChange={(_, newInputValue) => {
              setDestinationValue(newInputValue);
            }}
            onChange={(_, newValue) => {
          
              field.onChange(newValue?.description);
            }}
            renderInput={(params) => <TextField {...params}  sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "var(--green-btn-hover)", 
                },
                "&:hover fieldset":{ 
                    borderColor: 'var(--green-btn-hover)'
                },
              },
            }}label="Digite o Ponto de Destino" />}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              const matches = option.structured_formatting.main_text_matched_substrings || [];

              
              const parts = parse(
                option.structured_formatting.main_text,
                matches.map((match: {offset: number, length: number}) => [match.offset, match.offset + match.length])
              );
              return (
                <li key={key} {...optionProps} >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                      {parts.map((part, index) => (
                        <Box
                          key={index}
                          component="span"
                          sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                        >
                          {part.text}
                        </Box>
                      ))}
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {option.structured_formatting.secondary_text}
                      </Typography>
                    </Box>
                  </Box>
                </li>
              );
            }}
          />
        )}
      />
        <p className={styles.errorMessage}>{errors.destination?.message}</p>
        <button type="submit">Buscar Opções de viagem</button>
      </form>
    </section>
  )
}
