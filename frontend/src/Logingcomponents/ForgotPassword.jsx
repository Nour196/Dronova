import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgImg from '../assets/b165cd987144dbabd57e10a8e0732f3ec8f119b1.jpg';
import logo from '../assets/Vector.png';
import { authService } from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.forgotPassword(email);
      navigate('/login', { state: { message: 'Password reset email sent. Please check your inbox.' } });
    } catch (error) {
      setError(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="flex flex-col min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-gray-100 bg-opacity-90 p-10 rounded-3xl shadow-2xl max-w-md w-[380px] flex flex-col items-center">
          <img 
            src={logo}
            alt="Dronova Logo" 
            className="w-8 mb-2 mx-auto" 
          />
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-left w-full pl-2">Reset Password</h2>
          <p className="text-sm text-gray-600 mb-4 text-left w-full pl-2">
            Enter your email address to reset your password.
          </p>
          
          {error && (
            <div className="w-full p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <label className="text-sm font-medium text-black mb-1 ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email address"
              required
              className="w-full p-2 rounded-2xl bg-white border-none text-black text-base mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:lowercase"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 bg-[#1895F0] text-white border-none rounded-2xl font-bold cursor-pointer text-base hover:bg-blue-600 mb-2 mt-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : 'Send Reset Link'}
            </button>
            <Link 
              to="/login"
              className="text-[#1895F0] text-sm font-semibold flex justify-center mt-2 hover:underline"
            >
              Back to Login
            </Link>
          </form>
        </div>
      </div>
      <footer className="text-xs text-gray-300 text-center w-full pb-2 mt-auto">
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

export default ForgotPassword; 