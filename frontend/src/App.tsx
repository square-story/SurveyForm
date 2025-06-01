import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from '@/router/AppRouter'
import { ThemeProvider } from '@/provider/theme-provider'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
