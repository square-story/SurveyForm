import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from '@/router/AppRouter'
import { ThemeProvider } from '@/provider/theme-provider'
import FloatingModeSwitch from './components/common/FloatingModeSwitch'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <FloatingModeSwitch />
    </ThemeProvider>
  )
}

export default App
