import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authService } from '../services/api';
import bgImg from '../assets/b165cd987144dbabd57e10a8e0732f3ec8f119b1.jpg';
import logo from '../assets/Vector.png';

const OpentheLink = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get email from location state or localStorage
    const storedEmail = location.state?.email || localStorage.getItem('resetEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [location]);

  const handleGoBack = () => {
    navigate('/forgot-password');
  };

  const handleResendEmail = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await authService.forgotPassword(email);
      if (response.status === 'success') {
        alert('Reset link has been resent to your email!');
      } else {
        setError(response.message || 'Failed to resend email');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to resend email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center relative p-0"
      style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="absolute" style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <div className="flex flex-col items-start shadow-2xl backdrop-blur-lg"
          style={{
            width: 480,
            height: 420,
            background: 'rgba(220, 220, 220, 0.55)',
            borderRadius: 40,
            padding: 40,
            boxSizing: 'border-box',
          }}>
          {/* Top Row: Logo and Back Arrow */}
          <div className="flex items-center mb-4 w-full">
            <button
              onClick={handleGoBack}
              className="text-2xl text-black cursor-pointer p-0 mr-2 hover:text-blue-500 bg-transparent border-none focus:outline-none"
              aria-label="Back to Forgot Password"
              style={{ lineHeight: 1 }}
            >
              ←
            </button>
            <img src={logo} alt="Dronova Logo" className="w-7 h-7" />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-black mb-2 mt-2 ml-0">Check Your Email</h2>

          {/* Description */}
          <p className="text-base text-gray-700 mb-6 w-full pl-0">
            We've sent a password reset link to {email || 'your email address'}. Please check your inbox and follow the instructions to reset your password.
          </p>

          {error && (
            <div className="w-full p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <div className="w-full flex flex-col gap-4">
            <button
              onClick={handleResendEmail}
              disabled={isLoading}
              className={`w-full bg-[#1895F0] hover:bg-blue-600 text-white font-semibold py-3 rounded-2xl text-lg transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Sending...' : 'Resend Email'}
            </button>

            <Link
              to="/login"
              className="text-[#1895F0] text-base font-semibold flex justify-center mt-2 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
      <footer className="absolute bottom-4 left-0 w-full text-center text-xs text-gray-300">
        2025 © Dronova &nbsp;
        <a href="#" className="hover:underline">Privacy Policy</a> &nbsp;
        <a href="#" className="hover:underline">Terms of Use</a> &nbsp;
        <a href="#" className="hover:underline">FAQ</a> &nbsp;
        <a href="#" className="hover:underline">DJI Support</a> &nbsp;
        <a href="#" className="hover:underline">Site Map</a>
      </footer>
    </div>
  );
};

export default OpentheLink; 