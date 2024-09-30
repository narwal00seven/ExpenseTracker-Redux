import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage/LandingPage';
import TransactionPage from './pages/TransactionPage/TransactionPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
