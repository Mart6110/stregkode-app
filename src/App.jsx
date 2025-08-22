import NavBar from "./components/Navbar/Navbar"
import { Provider } from "./components/ui/provider"
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './app/store'
import { InventoryPage } from './features/inventory'

function App() {
  return (
    <ReduxProvider store={store}>
      <Provider>
        <NavBar />
        <InventoryPage />
      </Provider>
    </ReduxProvider>
  )
}

export default App
