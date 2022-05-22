import './App.css';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Subscription from './components/Subscription';
import Login from './components/Login';
import Confirm from './components/Confirm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route exact path='/confirm' element={<Confirm/>} />
        <Route path="/subscribe" element={<Subscription/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
