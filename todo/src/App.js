
import React from 'react'

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';

export const App = () => {
  return (
   
      <Router>
       <div>
    <ToastContainer position='top-center'/>
    <Routes>
      <Route  path="/" Component={Home} />
      <Route path="/addContact" Component={AddEdit}/>
      <Route path="/update/:id" Component={AddEdit}/>
      <Route path="/view/:id" Component={View}/>
    </Routes>
    </div>
    </Router>
   
  )
}
export default App;

