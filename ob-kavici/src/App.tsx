import './App.css'
import Editors from './components/editors/editors'
import Games from './components/games/games'
import Navbar from './components/navbar'
import { ThemeProvider } from './components/theme-provider'

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {
          <>
            <Navbar />
            <div className="bg-accent">
              <Games />
              <Editors />
            </div>
          </>
        }
      </ThemeProvider>
    </>
  )
}

export default App
