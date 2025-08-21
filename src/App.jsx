import NavBar from "./Components/Navbar/Navbar"
import { Provider } from "./Components/ui/provider"
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store/store'
import Main from "./Pages/Main"

function App() {
  return (
    <ReduxProvider store={store}>
      <Provider>
        <NavBar />
        <Main />
      </Provider>
    </ReduxProvider>
  )
}

export default App
