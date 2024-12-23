import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mainpage from './Mainpage/Mainpage';
import Projects from './Mainpage/Components/Projects/Projects';
import Skills from './Mainpage/Components/Skills/Skills';
import Signin from './Mainpage/Components/Signin/Signin';
import Signup from './Mainpage/Components/Signup/Signup'
import Crud from './Crud/Crud'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Crud/>}></Route>
          {/* <Route path='/' element={<Mainpage/>}></Route> */}
          <Route path='/Project' element={<Projects/>}></Route>
          <Route path='Skills' element={<Skills/>}></Route>
          <Route path='Signin' element={<Signin/>}></Route>
          <Route path='Signup' element={<Signup/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
