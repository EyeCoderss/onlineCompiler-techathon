import './App.css';
import Navb from './Components/Navbar/Navb';
import 'bootstrap/dist/css/bootstrap.min.css';
import CodeEditor from './Components/Navbar/CodeEditor/CodeEditor';


function App() {
  return (
    <div className="App">
      <Navb/>
      <CodeEditor/>
    </div>
  );
}

export default App;
