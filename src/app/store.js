import { configureStore } from '@reduxjs/toolkit'
import { inventoryApi } from '../features/inventory/inventoryAPI'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    // Add other reducers here as needed
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(inventoryApi.middleware),
})
