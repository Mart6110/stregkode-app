import { Field, Input } from "@chakra-ui/react"
import React from 'react'

const SearchField = ({ 
    value: initialValue, 
    onChange, 
    placeholder = "Search...", 
    debounce = 300,
    ...props 
}) => {
    const [value, setValue] = React.useState(initialValue)

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value, debounce, onChange])

    return (
        <Field.Root floating>
            <Input 
                placeholder={placeholder}
                value={value || ''}
                onChange={(e) => setValue(e.target.value)}
                {...props}
            />
        </Field.Root>
    )
}

export default SearchField