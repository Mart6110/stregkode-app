
import { Button as ChakraButton } from "@chakra-ui/react"

const Button = ({ text, onClick, children, ...props }) => {
    return (
        <ChakraButton bg={'#085646'} onClick={onClick} {...props}>
            {children || text}
        </ChakraButton>
    )
}

export default Button