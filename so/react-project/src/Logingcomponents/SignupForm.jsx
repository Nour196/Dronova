import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    // Validate form data
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!! Try again");
      setIsLoading(false);
      return;
    }

    try {
      // Make API call to backend for registration
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect based on role
        if (response.data.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/user');
        }
      } else {
        setError('Registration successful but no token received');
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else if (err.request) {
        // The request was made but no response was received
        setError('Unable to connect to the server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" 
         style={{ backgroundImage: "url('/src/assets/9a0553986999e55c6328537dd762ecf28ed94b90.jpg')" }}>
      <div className="bg-white/30 backdrop-blur-xl border border-white/40 p-8 rounded-2xl max-w-xs shadow-2xl">
        <img src="src\assets\Vector.png" alt="Dronova Logo" className="w-8 mb-2 mx-auto" />
        <h2 className="text-sm font-bold mb-2">Create Your Dronova Account</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-1.5 my-2.5 border border-gray-300 rounded-xl text-sm bg-white"
            disabled={isLoading}
          />

          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone"
            minLength="9"
            maxLength="10"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-1.5 my-2.5 border border-gray-300 rounded-xl text-sm bg-white"
            disabled={isLoading}
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-1.5 my-2.5 border border-gray-300 rounded-xl text-sm bg-white"
            disabled={isLoading}
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            minLength="6"
            maxLength="15"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-1.5 my-2.5 border border-gray-300 rounded-xl text-sm bg-white"
            disabled={isLoading}
          />

          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            minLength="6"
            maxLength="15"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-1.5 my-2.5 border border-gray-300 rounded-xl text-sm bg-white"
            disabled={isLoading}
          />

          <p className="text-xs mb-6">
            By creating account, you confirm that you agree to Dronova's
            <a href="#" className="text-blue-500 no-underline"> Privacy Policy</a> and 
            <a href="#" className="text-blue-500 no-underline"> Terms of Use</a>
          </p>

          <div className="space-y-2.5">
            <button 
              type="submit"
              className={`w-full p-2.5 bg-blue-500 text-white border-none rounded-xl font-bold cursor-pointer text-xs hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register Now!'}
            </button>

            <p className="text-xs">
              Already have an account? 
              <Link to="/login" className="text-blue-500 no-underline"> Login here</Link>
            </p>

            <div className="flex items-center my-5 text-xs text-gray-500">
              <div className="flex-1 h-px bg-gray-500 mx-2.5"></div>
              <span>Or sign up with</span>
              <div className="flex-1 h-px bg-gray-500 mx-2.5"></div>
            </div>

            <div className="flex gap-7 mt-2.5">
              <button 
                type="button"
                className="p-2.5 border-none rounded-xl font-bold cursor-pointer flex items-center justify-center gap-2 text-sm bg-transparent flex-1"
                disabled={isLoading}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Google
              </button>
              <button 
                type="button"
                className="p-2.5 border-none rounded-xl font-bold cursor-pointer flex items-center justify-center gap-2 text-sm bg-transparent flex-1"
                disabled={isLoading}
              >
                <img src="https://www.svgrepo.com/show/512120/facebook-176.svg" alt="Facebook" className="w-7 h-7" />
                Facebook
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;