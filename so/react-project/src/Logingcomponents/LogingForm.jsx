import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgImg from '../assets/b165cd987144dbabd57e10a8e0732f3ec8f119b1.jpg';
import logo from '../assets/Vector.png';
import googleIcon from '../assets/devicon_google.png';
import facebookIcon from '../assets/Group 18.png';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load Google API
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '1094766500000-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com',
          callback: handleGoogleLogin,
          auto_select: false,
          cancel_on_tap_outside: true,
          context: 'signin',
          use_fedcm_for_prompt: true
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (window.google) {
        window.google.accounts.id.cancel();
      }
    };
  }, []);

  const handleGoogleLogin = async (response) => {
    try {
      setIsLoading(true);
      setError('');

      const result = await axios.post('/api/auth/google', {
        token: response.credential
      });

      if (result.data.token) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));

        // Redirect based on role
        if (result.data.user.role === 'admin') {
          navigate('/dashboard123');
        } else {
          navigate('/user');
        }
      }
    } catch (err) {
      console.error('Google login error:', err);
      if (err.response) {
        setError(err.response.data.message || 'Google authentication failed. Please try again.');
      } else if (err.request) {
        setError('Unable to connect to the server. Please check if the server is running.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleButtonClick = () => {
    if (!window.google) {
      setError('Google Sign-In is not available. Please try again later.');
      return;
    }

    try {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          setError('Please allow popups for this website to use Google Sign-In.');
        } else if (notification.isSkippedMoment()) {
          console.log('Google Sign-In was skipped');
        } else if (notification.isDismissedMoment()) {
          console.log('Google Sign-In was dismissed');
        }
      });
    } catch (err) {
      console.error('Google Sign-In error:', err);
      setError('An error occurred with Google Sign-In. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userRole', response.data.user.role);
        
        if (response.data.user.role === 'admin') {
          navigate('/dashboard123');
        } else {
          navigate('/user');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        setError(err.response.data.message || 'Invalid email or password');
      } else if (err.request) {
        setError('Unable to connect to the server. Please check if the server is running.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative p-8"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div
        className="relative flex flex-col items-start shadow-2xl backdrop-blur-lg"
        style={{
          width: 464,
          height: 'cover',
          background: 'rgba(229,229,229,0.80)',
          borderRadius: 40,
          padding: 40,
          paddingBottom: 0,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Logo */}
        <img src={logo} alt="Dronova Logo" className="w-7 h-7 absolute left-8 top-8" />
        {/* Title */}
        <h2 className="text-2xl font-bold text-black mb-6 mt-2 ml-0">Log in to Dronova</h2>
        
        {error && (
          <div className="w-full p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
          <label className="text-sm font-medium text-black mb-1 ml-1" htmlFor="email">email address</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email address"
            required
            className="w-full p-2 rounded-2xl bg-white border-none text-black text-base mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:lowercase"
            disabled={isLoading}
          />
          <label className="text-sm font-medium text-black mb-1 ml-1" htmlFor="password">Password</label>
          <div className="relative w-full mb-2">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              minLength="6"
              maxLength="15"
              required
              className="w-full p-2 rounded-2xl bg-white border-none text-black text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(v => !v)}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.021 2.021A9.956 9.956 0 0022 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 1.657.336 3.234.938 4.675M9.879 9.879A3 3 0 0115 12m-6 0a3 3 0 016 0m-6 0a3 3 0 006 0" /></svg>
              )}
            </span>
          </div>
          <Link to="/password-reset" className="text-xs text-[#1895F0] hover:underline mb-2 ml-1">Forgot password?</Link>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 bg-[#1895F0] text-white border-none rounded-2xl font-bold cursor-pointer text-base hover:bg-blue-600 mb-2 mt-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
          <div className="flex items-center justify-between w-full text-xs text-gray-700 mt-1 mb-2">
            <span>do you need an account?</span>
            <Link to="/signup" className="text-[#1895F0] hover:underline ml-1">sign up Now</Link>
          </div>
          <div className="flex items-center my-3 text-xs text-gray-500 w-full">
            <div className="flex-1 h-px bg-gray-400 mx-2.5"></div>
            <span className="mx-2">or continue with</span>
            <div className="flex-1 h-px bg-gray-400 mx-2.5"></div>
          </div>
          <div className="flex justify-center gap-8 w-full mt-2 pb-8">
            <button
              type="button"
              className="px-8 py-2 border-none rounded-xl font-bold cursor-pointer flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 text-gray-700 shadow hover:bg-gray-100"
              onClick={handleGoogleButtonClick}
              disabled={isLoading}
            >
              <img src={googleIcon} alt="Google" className="w-5 h-5" />
              Google
            </button>
            <button
              type="button"
              className="px-8 py-2 border-none rounded-xl font-bold cursor-pointer flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 text-gray-700 shadow hover:bg-gray-100"
              disabled={isLoading}
            >
              <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
              Facebook
            </button>
          </div>
        </form>
      </div>
      {/* Footer */}
      <footer className="absolute bottom-4 left-0 w-full text-center text-xs text-gray-300">
        2025 © Dronova &nbsp; Privacy Policy Terms of Use FAQ DJI Support Site Map
      </footer>
    </div>
  );
};

export default LoginForm;