import { useDispatch } from 'react-redux'
import { inventoryApi } from './inventoryAPI'

// Custom hooks for common inventory operations
export const useInventoryOperations = () => {
  const dispatch = useDispatch()

  const refreshInventory = () => {
    dispatch(inventoryApi.util.invalidateTags(['Inventory']))
  }

  const prefetchInventoryItem = (id) => {
    dispatch(inventoryApi.util.prefetch('getInventoryItem', id, { force: false }))
  }

  return {
    refreshInventory,
    prefetchInventoryItem,
  }
}

// Error handling helper for inventory operations
export const handleInventoryError = (error) => {
  if (error?.data?.message) {
    return error.data.message
  }
  if (error?.message) {
    return error.message
  }
  return 'Der opstod en uventet fejl'
}
