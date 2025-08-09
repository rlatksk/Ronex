import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { 
  preloadCriticalResources, 
  preloadRouteComponents, 
  optimizeFontLoading
} from './utils/resourceLoader'

// Initialize performance optimizations
preloadCriticalResources();
optimizeFontLoading();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Initialize non-critical optimizations after render
setTimeout(() => {
  preloadRouteComponents();
}, 100);
