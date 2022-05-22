import './App.css';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Subscription from './components/Subscription';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/subscribe" element={<Subscription/>} />
      </Routes>
    </div>
  );
}

export default App;
