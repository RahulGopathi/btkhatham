import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import { Toaster } from 'react-hot-toast';
import NavBar from "./components/Navbar/NavBar";
import AddCandidate from './views/AddCandidate';
import IndividualCandidate from './views/IndividualCandidate'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <div>
                  <ProtectedRoute>
                    {' '}
                    <NavBar />
                    <Dashboard />{' '}
                  </ProtectedRoute>
                </div>
              }
            />
            <Route path='/addCandidate' element={<ProtectedRoute>
              {' '}
              <NavBar />
              <AddCandidate />{' '}
            </ProtectedRoute>}></Route>
            <Route path='/candidate/:id' element={<ProtectedRoute>
              {' '}
              <NavBar />
              <IndividualCandidate />{' '}
            </ProtectedRoute>}></Route>
          </Routes>
          <Toaster />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
