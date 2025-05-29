import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bgImg from '../assets/b165cd987144dbabd57e10a8e0732f3ec8f119b1.jpg';
import logo from '../assets/Vector.png';
import { authService } from '../services/api';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.forgotPassword(email);
      if (response.status === 'success') {
        // Store email in localStorage for OpentheLink component
        localStorage.setItem('resetEmail', email);
        // Navigate to OpentheLink component
        navigate('/open-link');
      } else {
        setError(response.message || 'Failed to process request');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleBackClick = () => {
    navigate('/login');
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative p-0"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div
        className="absolute"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="flex flex-col items-start shadow-2xl backdrop-blur-lg"
          style={{
            width: 480,
            height: 420,
            background: 'rgba(220, 220, 220, 0.55)',
            borderRadius: 40,
            PaddingBottom:0,
            padding: 40,
            boxSizing: 'border-box',
          }}
        >
          {/* Top Row: Logo and Back Arrow */}
          <div className="flex items-center mb-4 w-full pb-0">
            <button
              onClick={handleBackClick}
              className="text-2xl text-black cursor-pointer p-0 mr-2 hover:text-blue-500 bg-transparent border-none focus:outline-none"
              aria-label="Back to Login"
              style={{ lineHeight: 1 }}
            >
              ←
            </button>
            <img src={logo} alt="Dronova Logo" className="w-7 h-7" />
          </div>
          {/* Title */}
          <h2 className="text-3xl font-bold text-black mb-2 mt-2 ml-0">Reset your password</h2>
          {/* Description */}
          <p className="text-base text-gray-700 mb-6 w-full pl-0">
            please enter the email adress you would like your password reset information sent to
          </p>

          {error && (
            <div className="w-full p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="w-full p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <label className="text-sm text-gray-800 pl-1 mb-1">Enter email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full px-5 py-3 rounded-2xl bg-white border-none text-black text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              style={{ fontSize: '1.1rem' }}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#1895F0] hover:bg-blue-600 text-white font-semibold py-3 rounded-2xl text-lg transition-colors mt-0 mb-0 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Sending...' : 'Next'}
            </button>
            <Link
              to="/login"
              className="text-[#1895F0] text-base font-semibold flex justify-center mt-2 hover:underline"
            >
              Back to Login
            </Link>
          </form>
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

export default PasswordReset;