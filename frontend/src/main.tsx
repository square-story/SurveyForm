import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster richColors position={window.innerWidth <= 768 ? "top-right" : "bottom-right"} />
    </Provider>
  </StrictMode>,
)
