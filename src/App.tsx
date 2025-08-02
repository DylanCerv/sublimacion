import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CollectionSidebar from './components/CollectionSidebar';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import SizeGuide from './pages/SizeGuide';
import InfoPage from './pages/InfoPage';
import Footer from './components/Footer.tsx';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Sidebar />
          <CollectionSidebar />
          
          <main className="pt-16">
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/collection" element={<Products />} />
              <Route path="/collection/:collectionId" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/size-guide" element={<SizeGuide />} />
              <Route path="/shipping" element={<InfoPage />} />
              <Route path="/how-to-buy" element={<InfoPage />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
