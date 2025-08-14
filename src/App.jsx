import NavBar from "./Components/Navbar/Navbar"
import { Provider } from "./Components/ui/provider"
import Main from "./Pages/Main"

function App() {
  return (
    <Provider>
      <NavBar />
      <Main />
    </Provider>
  )
}

export default App
