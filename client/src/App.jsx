import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navb from './Components/Navbar/Navb';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/HomePage/HomePage';
import CodeEditor from './Components/CodeEditor/CodeEditor';
import OurTeam from './Components/OurTeam/OurTeam';



function App() {
  return (
    
    <BrowserRouter>
      <Routes>
          
          <Route exact path='/' element={<HomePage />}/>
          <Route exact path='/CodeEditor' element={ <CodeEditor/>} />
          <Route exact path='/OurTeam' element={<OurTeam/>} />
          
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
