import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ModalContainer } from 'reoverlay';
import App from './routes/App.jsx'
import './index.css';
import 'animate.css';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ModalContainer />
    </QueryClientProvider>
  </StrictMode>,
)
