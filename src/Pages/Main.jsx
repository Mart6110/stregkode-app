import {
  Box,
  Card,
  IconButton,
  Menu,
  Spinner,
  Text,
  Alert,
  EmptyState,
} from "@chakra-ui/react"
import { Tooltip } from "../Components/ui/tooltip"
import { useState } from "react"
import { LuChevronDown, LuPackage, LuRefreshCw } from 'react-icons/lu'
import { useGetInventoryQuery } from "../store/api/apiSlice"
import { useInventoryOperations, handleApiError } from "../hooks/useApi"
import ListTable from "../Components/Table/Table"
import SearchField from "../Components/SearchField/SearchField"

function Main() {
  const [searchValue, setSearchValue] = useState('')

  // RTK Query hook to fetch inventory data
  const {
    data: inventory = [],
    error,
    isLoading,
    refetch
  } = useGetInventoryQuery()

  // Custom inventory operations from useApi.js
  const { refreshInventory, prefetchInventoryItem } = useInventoryOperations()

  // Handle refresh button click
  const handleRefresh = () => {
    refreshInventory()
    refetch()
  }

  console.log("error:", error)

  // Table columns configuration
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
        <Card.Header>
          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
            <Card.Title>Inventar</Card.Title>
            <Tooltip content="Søg efter varer i inventaret" showArrow placement="bottom">
              <Box maxW="300px">
                <SearchField
                  value={searchValue}
                  onChange={setSearchValue}
                  placeholder="Søg i inventar..."
                  debounce={300}
                />
              </Box>
            </Tooltip>
            <Box display="flex" gap={2}>
              <Tooltip content="Opdater inventar data" showArrow>
                <IconButton size="sm" bg="#085646" color="white" onClick={handleRefresh}>
                  <LuRefreshCw />
                </IconButton>
              </Tooltip>
                <Menu.Root>
                  <Menu.Trigger asChild>
                    <IconButton size="sm" bg="#085646" color="white">
                      <LuChevronDown />
                    </IconButton>
                  </Menu.Trigger>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item value="new-component">Tilføj nyt Objekt</Menu.Item>
                      <Menu.Item value="new-type">Tilføj ny type</Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Menu.Root>
            </Box>
          </Box>
        </Card.Header>

        <Card.Body>
          {isLoading && (
            <Box display="flex" justifyContent="center" p={8}>
              <Spinner size="lg" />
            </Box>
          )}

          {error && (
            <Alert.Root status="error" mb={4}>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Fejl ved indlæsning</Alert.Title>
                <Alert.Description>
                  {handleApiError(error)}
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}

          {!isLoading && !error && inventory && inventory.length > 0 && (
            <ListTable
              data={inventory}
              columns={columns}
              globalFilter={searchValue}
              setGlobalFilter={setSearchValue}
              enableSorting={true}
              enableFiltering={true}
            />
          )}

          {!isLoading && !error && (!inventory || inventory.length === 0) && (
            <EmptyState.Root>
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <LuPackage />
                </EmptyState.Indicator>
                <EmptyState.Title>Intet inventar tilgængeligt</EmptyState.Title>
                <EmptyState.Description>
                  Der er ingen varer i systemet. Tilføj din første vare for at komme i gang.
                </EmptyState.Description>
              </EmptyState.Content>
            </EmptyState.Root>
          )}
        </Card.Body>
      </Card.Root>
    </Box>
  )
}

export default Main