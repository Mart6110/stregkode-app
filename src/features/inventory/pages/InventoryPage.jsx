import {
    Alert,
    Box,
    Card,
    EmptyState,
    IconButton,
    Menu,
    Spinner
} from "@chakra-ui/react"
import { useState } from "react"
import { LuChevronDown, LuPackage, LuRefreshCw } from 'react-icons/lu'
import { CreateItemDialog } from "../../../components/CreateItemDialog"
import SearchField from "../../../components/SearchField"
import { showErrorToast, showSuccessToast } from "../../../components/ui/toast"
import { Tooltip } from "../../../components/ui/tooltip"
import { InventoryTable } from "../components/InventoryTable"
import { useCreateInventoryItemMutation, useCreateInventoryTypeMutation, useGetInventoryQuery } from "../inventoryAPI"
import { handleInventoryError, useInventoryOperations } from "../inventoryUtils"

function InventoryPage() {
  const [searchValue, setSearchValue] = useState('')
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: 'object' // 'object' or 'type'
  })

  // RTK Query hook to fetch inventory data
  const {
    data: inventory = [],
    error,
    isLoading,
    refetch
  } = useGetInventoryQuery()

  // RTK Query mutations
  const [createInventoryItem, { isLoading: isCreatingItem }] = useCreateInventoryItemMutation()
  const [createInventoryType, { isLoading: isCreatingType }] = useCreateInventoryTypeMutation()

  // Custom inventory operations from useApi.js
  const { refreshInventory, prefetchInventoryItem } = useInventoryOperations()

  // Handle refresh button click
  const handleRefresh = () => {
    refreshInventory()
    refetch()
  }

  // Handle menu item selection
  const handleMenuSelect = (value) => {
    if (value === 'new-component') {
      setDialogState({ isOpen: true, type: 'object' })
    } else if (value === 'new-type') {
      setDialogState({ isOpen: true, type: 'type' })
    }
  }

  // Handle dialog close
  const handleDialogClose = () => {
    setDialogState({ isOpen: false, type: 'object' })
  }

  // Handle form submission
  const handleItemSubmit = async (formData) => {
    try {
      if (dialogState.type === 'object') {
        // Create inventory item
        await createInventoryItem({
          name: formData.name,
          stock: parseInt(formData.stock) || 0,
          location: formData.location,
          barcode: formData.barcode,
          department: formData.category || 'Ukendt' // Map category to department
        }).unwrap()
        
        showSuccessToast(
          "Objekt oprettet",
          `${formData.name} blev oprettet med succes`
        )
      } else if (dialogState.type === 'type') {
        // Create inventory type
        await createInventoryType({
          name: formData.name,
          description: formData.description
        }).unwrap()
        
        showSuccessToast(
          "Type oprettet", 
          `${formData.name} blev oprettet med succes`
        )
      }
      
    } catch (error) {
      console.error('Error creating item:', error)
      showErrorToast(
        "Fejl ved oprettelse",
        "Der opstod en fejl under oprettelsen. Prøv igen."
      )
    }
  }

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
                      <Menu.Item 
                        value="new-component" 
                        onClick={() => handleMenuSelect('new-component')}
                      >
                        Tilføj nyt Objekt
                      </Menu.Item>
                      <Menu.Item 
                        value="new-type" 
                        onClick={() => handleMenuSelect('new-type')}
                      >
                        Tilføj ny type
                      </Menu.Item>
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

          {/* {error && (
            <Alert.Root status="error" mb={4}>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Fejl ved indlæsning</Alert.Title>
                <Alert.Description>
                  {handleInventoryError(error)}
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )} */}

          {!isLoading && !error && inventory && inventory.length > 0 && (
            <InventoryTable
              data={inventory}
              columns={columns}
              globalFilter={searchValue}
              setGlobalFilter={setSearchValue}
              enableSorting={true}
              enableFiltering={true}
            />
          )}

          {!isLoading && /* !error && */ (!inventory || inventory.length === 0) && (
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

      {/* Create Item Dialog */}
      <CreateItemDialog
        isOpen={dialogState.isOpen}
        onClose={handleDialogClose}
        onSubmit={handleItemSubmit}
        type={dialogState.type}
        isLoading={dialogState.type === 'object' ? isCreatingItem : isCreatingType}
      />
    </Box>
  )
}

export default InventoryPage
