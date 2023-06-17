import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Navbaar from './components/Navbaar';
import Home from './components/Home';
import Register from './components/Register';
import Edit from './components/Edit';
import Details from './components/Details';

import {Routes,Route} from 'react-router-dom';


function App() {
  return (
<>
 
  <Navbaar/>
  <Routes>
    <Route exact path='/' element={<Home/>}></Route>
    <Route exact path='/register' element={<Register/>}></Route>
    <Route exact path='/edit/:id' element={<Edit/>}></Route>
    <Route exact path='/view/:id' element={<Details/>}></Route>


  </Routes>


  
</>
  );
}

export default App;
