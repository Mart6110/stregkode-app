
// Simple toast notification system
let toastCounter = 0
const toasts = new Map()

export const toast = {
  success: (options) => {
    console.log('✅ Success:', options.title, options.description)
    // For now, we'll use console.log. In a real app, you'd implement proper toast UI
    if (typeof options === 'string') {
      console.log('✅', options)
    }
  },
  error: (options) => {
    console.error('❌ Error:', options.title, options.description)
    if (typeof options === 'string') {
      console.error('❌', options)
    }
  }
}

export const showSuccessToast = (title, description) => {
  toast.success({ title, description })
}

export const showErrorToast = (title, description) => {
  toast.error({ title, description })
}

// Empty Toaster component for now
export const Toaster = () => null
