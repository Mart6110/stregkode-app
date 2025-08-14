import { Box, Heading } from "@chakra-ui/react"
import Table from "../Components/Table/Table"

function Main() {
  // Sample data for the table - Electronics inventory
  const data = [
    { id: 1, name: "Arduino Uno R3", stock: 25, department: "Microcontrollers" },
    { id: 2, name: "LED Red 5mm", stock: 100, department: "LEDs" },
    { id: 3, name: "LED Blue 5mm", stock: 75, department: "LEDs" },
    { id: 4, name: "Resistor 220Ω", stock: 500, department: "Resistors" },
    { id: 5, name: "Breadboard 830", stock: 15, department: "Prototyping" },
    { id: 6, name: "Servo Motor SG90", stock: 8, department: "Motors" },
    { id: 7, name: "Ultrasonic Sensor HC-SR04", stock: 12, department: "Sensors" },
    { id: 8, name: "ESP32 DevKit", stock: 20, department: "Microcontrollers" },
    { id: 9, name: "Jumper Wires M-M", stock: 200, department: "Wiring" },
    { id: 10, name: "Capacitor 100µF", stock: 50, department: "Capacitors" },
    { id: 11, name: "RGB LED Strip", stock: 5, department: "LEDs" },
    { id: 12, name: "Push Button", stock: 30, department: "Switches" },
  ]

  // Column definitions for the table
  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Component',
    },
    {
      accessorKey: 'stock',
      header: 'Stock Qty',
    },
    {
      accessorKey: 'department',
      header: 'Category',
    },
  ]

  return (
    <Box p={6}>
      <Table 
        title="Inventarliste"
        data={data} 
        columns={columns}
        enableSorting={true}
        enableFiltering={true}
      />
    </Box>
  )
}

export default Main