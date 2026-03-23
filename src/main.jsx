import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';;
// قم بتغيير HashRouter إلى BrowserRouter
import { BrowserRouter } from "react-router-dom" 
import { Toaster } from 'react-hot-toast';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* استخدم BrowserRouter هنا */}
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
  </StrictMode>,
)