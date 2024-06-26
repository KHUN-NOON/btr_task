import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

const TextInput= ({name, defaultValue, label, id, type, required, multiline, display, min, max, size}) => {
    const { control } = useFormContext()
    
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue ?? ''}
            render={ ({field}) => {
                return (
                    <FormControl fullWidth margin='normal' variant='outlined' required={required ?? false}
                        sx={{
                            display: display ?? 'inline-flex',
                        }}
                        size={ size ?? 'medium' }
                    >
                        <InputLabel 
                            sx={{
                                fontWeight: 500
                            }}
                        >
                            {label}
                        </InputLabel>
                        <OutlinedInput
                            {...field}
                            label={label}
                            type={type ?? 'text'}
                            id={id}
                            multiline={ multiline ?? false }
                            inputProps={{
                                min: min ?? min,
                                max: max ?? max
                            }}
                        />
                    </FormControl>
                )
            }}
            rules={{ required: true }}
        />
    )
}

export default TextInput