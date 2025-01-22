import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import CreateForm from './pages/CreateForm.jsx';
import EditForm from './pages/EditForm.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path = '/' element = {<App/>}/>
      <Route path = '/new' element = {<CreateForm/>}/>
      <Route path = '/edit/:id' element = {<EditForm/>}/>
      <Route path = '*' element = {<PageNotFound/>}/>
    </Routes>
  </BrowserRouter>
)
