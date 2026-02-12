import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsGrid from './pages/ProductGrids';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<ProductsGrid />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;