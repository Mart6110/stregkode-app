import { Box, Heading, Card, IconButton, Menu, Portal } from "@chakra-ui/react"
import { useState } from "react"
import { LuChevronDown } from 'react-icons/lu'
import Table from "../Components/Table/Table"
import SearchField from "../Components/SearchField/SearchField"

function Main() {
  const [globalFilter, setGlobalFilter] = useState('')

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
      <Card.Root>
        <Card.Header flexDir={"row"} justifyContent="space-between" alignItems="center">
          <Card.Title>Inventarliste</Card.Title>
          <Box maxW="300px">
            <SearchField
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder="Search..."
              debounce={300}
            />
          </Box>
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton size={'sm'} bg={'#085646'}>
                <LuChevronDown />
              </IconButton>
            </Menu.Trigger>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="new-component">Tilføj nyt Objekt</Menu.Item>
                  <Menu.Item value="new-txt">Tilføj ny type</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Card.Header>
        <Card.Body>
          <Table 
            data={data} 
            columns={columns}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            enableSorting={true}
            enableFiltering={true}
          />
        </Card.Body>
      </Card.Root>
    </Box>
  )
}

export default Main