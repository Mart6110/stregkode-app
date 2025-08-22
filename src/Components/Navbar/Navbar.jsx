import { Box, Heading } from "@chakra-ui/react"
import ZBCLogo from "../ZBCLogo"

const NavBar = () => {
  return (
    <Box as="nav" bg="#004A6C" color="white" p={4} display={"flex"} alignItems="center" justifyContent="space-between">
      <ZBCLogo width="60" height="31" fill="white" />
      <Heading as="h1" size="lg" ml={4}>
        Inventar System
      </Heading>
      <Box></Box>
    </Box>
  )
}

export default NavBar