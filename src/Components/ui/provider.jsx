import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Toaster } from "./toast"

export function Provider(props) {
  return (
    <ChakraProvider value={defaultSystem} {...props}>
      {props.children}
      <Toaster />
    </ChakraProvider>
  )
}
