import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AdminProvider } from './context/AdminContext';
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

// Admin Components
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ShirtManager from './pages/admin/ShirtManager';
import CollectionManager from './pages/admin/CollectionManager';
import ShirtForm from './components/admin/ShirtForm';
import CollectionForm from './components/admin/CollectionForm';
import SettingsForm from './components/admin/SettingsForm';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <AppProvider>
      <AdminProvider>
        <Router>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="shirts" element={<ShirtManager />} />
                    <Route path="shirts/new" element={<ShirtForm />} />
                    <Route path="shirts/edit/:id" element={<ShirtForm />} />
                    <Route path="collections" element={<CollectionManager />} />
                    <Route path="collections/new" element={<CollectionForm />} />
                    <Route path="collections/edit/:id" element={<CollectionForm />} />
                    <Route path="settings" element={<SettingsForm />} />
                    <Route path="" element={<AdminDashboard />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            } />

            {/* Public Routes */}
            <Route path="/*" element={
              <div className="App relative">
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
            } />
          </Routes>
        </Router>
      </AdminProvider>
    </AppProvider>
  );
}

export default App;
