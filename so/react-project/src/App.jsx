import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashbordcomponents/h';
import Users from './dashbordcomponents/Uesers';
import Services from './dashbordcomponents/Services12';
import Requests from './dashbordcomponents/KAPing';
import Profile from './dashbordcomponents/HomeDash2';
import Home from './pages/Home';
import User from './pages/user';
import SignupForm from './Logingcomponents/SignupForm';
import LoginForm from './Logingcomponents/LogingForm';
import Dashbord123 from './pages/Dashbord123';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './Logingcomponents/ForgotPassword';
import NewPassword from './Logingcomponents/NewPassword';
import OpentheLink from './Logingcomponents/Openthelink';
import PasswordReset from './Logingcomponents/PasswordReset';
import Formulaire from './pages/Formulaire';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Admin only routes */}
        <Route path="/dashboard/*" element={
          <PrivateRoute allowedRoles={['admin']}>
            <Dashbord123 />
          </PrivateRoute>
        } />
        <Route path="/dashboard123/*" element={
          <PrivateRoute allowedRoles={['admin']}>
            <Dashbord123 />
          </PrivateRoute>
        } />
        <Route path="/users" element={
          <PrivateRoute allowedRoles={['admin']}>
            <Users />
          </PrivateRoute>
        } />
        <Route path="/services" element={
          <PrivateRoute allowedRoles={['admin']}>
            <Services />
          </PrivateRoute>
        } />
        <Route path="/requests" element={
          <PrivateRoute allowedRoles={['admin']}>
            <Requests />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute allowedRoles={['admin']}>
            <Profile />
          </PrivateRoute>
        } />

        {/* Customer and Admin routes */}
        <Route path="/user" element={
          <PrivateRoute allowedRoles={['admin', 'customer']}>
            <User />
          </PrivateRoute>
        } />
        <Route path="/formulaire" element={
          <PrivateRoute allowedRoles={['admin', 'customer']}>
            <Formulaire />
          </PrivateRoute>
        } />

        {/* Public routes */}
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/new-password/:token" element={<NewPassword />} />
        <Route path="/open-link" element={<OpentheLink />} />
        <Route path="/password-reset" element={<PasswordReset />} />
      </Routes>
    </Router>
  );
}

export default App;