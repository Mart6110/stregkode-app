import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define the inventory API slice
export const inventoryApi = createApi({
  reducerPath: 'inventoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', // Change this to your actual API base URL
    prepareHeaders: (headers, { getState }) => {
      // Add any authentication headers here if needed
      // const token = getState().auth.token
      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`)
      // }
      headers.set('content-type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Inventory', 'Component'], // Add tag types for caching
  endpoints: (builder) => ({
    // Get all inventory items
    getInventory: builder.query({
      query: () => '/inventory',
      providesTags: ['Inventory'],
    }),
    
    // Get single inventory item by ID
    getInventoryItem: builder.query({
      query: (id) => `/inventory/${id}`,
      providesTags: (result, error, id) => [{ type: 'Inventory', id }],
    }),
    
    // Create new inventory item
    createInventoryItem: builder.mutation({
      query: (newItem) => ({
        url: '/inventory',
        method: 'POST',
        body: newItem,
      }),
      invalidatesTags: ['Inventory'],
    }),
    
    // Update inventory item
    updateInventoryItem: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/inventory/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Inventory', id }],
    }),
    
    // Delete inventory item
    deleteInventoryItem: builder.mutation({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Inventory'],
    }),
  }),
})

// Export hooks for usage in functional components
export const {
  useGetInventoryQuery,
  useGetInventoryItemQuery,
  useCreateInventoryItemMutation,
  useUpdateInventoryItemMutation,
  useDeleteInventoryItemMutation,
} = inventoryApi
