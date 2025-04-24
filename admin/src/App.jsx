import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ManageProducts from './pages/Manageproducts';
import AdminSignin from './pages/AdminSignin';
import AddProduct from './components/Addproduct';
import ManageOrders from './pages/ManageOrders';
import ManageUsers from './pages/ManageUsers';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';


function App() {
  return (

    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<AdminSignin />} />

        {/* Protected Routes */}
        <Route path="/admin/manageproducts" element={
          <ProtectedRoute>
            <ManageProducts />
          </ProtectedRoute>
        } />
        <Route
          path="/addproduct"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manageusers"
          element={
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manageorders"
          element={
            <ProtectedRoute>
              <ManageOrders />
            </ProtectedRoute>
          }
        />
         <Route
          path="/admin/addusers"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>

  );
}

export default App;
