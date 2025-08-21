import { Box, Heading, Text, Spinner, Alert } from "@chakra-ui/react"
import { Button as ChakraButton } from "@chakra-ui/react"
// import { 
//   useGetInventoryQuery
// } from "../store/api/apiSlice"
// import ListTable from "../Components/Table/Table"

function InventoryPage() {
  // Hardcoded test data
  const inventory = [
    { id: 1, name: "Arduino Uno", stock: 15, department: "Microcontrollers" },
    { id: 2, name: "Resistor 220Ω", stock: 500, department: "Passive Components" },
    { id: 3, name: "LED Red", stock: 100, department: "Optoelectronics" }
  ]

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={4}>
        Test Inventory Page
      </Heading>
      
      <Text mb={4}>Testing Chakra UI components with hardcoded data</Text>
      
      <Box>
        <h3>Inventory Items:</h3>
        {inventory.map((item) => (
          <Box key={item.id} p={3} border="1px solid #ccc" mb={2}>
            <Text>ID: {item.id}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Stock: {item.stock}</Text>
            <Text>Department: {item.department}</Text>
          </Box>
        ))}
      </Box>
      
      <ChakraButton mt={4} colorScheme="blue">
        Test Button
      </ChakraButton>
    </Box>
  )
}

export default InventoryPage
