import { useDispatch } from 'react-redux'
import { apiSlice } from '../store/api/apiSlice'

// Custom hooks for common API operations
export const useInventoryOperations = () => {
  const dispatch = useDispatch()

  const refreshInventory = () => {
    dispatch(apiSlice.util.invalidateTags(['Inventory']))
  }

  const prefetchInventoryItem = (id) => {
    dispatch(apiSlice.util.prefetch('getInventoryItem', id, { force: false }))
  }

  return {
    refreshInventory,
    prefetchInventoryItem,
  }
}

// Error handling helper
export const handleApiError = (error) => {
  if (error?.data?.message) {
    return error.data.message
  }
  if (error?.message) {
    return error.message
  }
  return 'An unexpected error occurred'
}
