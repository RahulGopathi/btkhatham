import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./views/Login"
import Register from './views/Register';
import Dashboard from "./views/Dashboard"
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
