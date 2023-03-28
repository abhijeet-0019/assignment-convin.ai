import './App.css';
import { Routes, Route } from 'react-router-dom'
import CreateCard from './components/CreateCard';
import AllCards from './components/AllCards';
import History from './components/History.js';
import Navbar from './components/Navbar';

function App() {
  return (
    // <Provider store={store}>
      <div>
      <Navbar />
        <Routes>
          <Route path='/' element={<CreateCard/>} />
          <Route path='/all-cards' element={<AllCards/>} />
          <Route path='/history' element={<History />} />
        </Routes>
      </div>
    // </Provider>
  );
}

export default App;
