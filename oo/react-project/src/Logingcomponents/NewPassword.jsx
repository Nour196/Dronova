import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authService } from '../services/api';
import bgImg from '../assets/b165cd987144dbabd57e10a8e0732f3ec8f119b1.jpg';
import logo from '../assets/Vector.png';

const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { token } = useParams();

    useEffect(() => {
        // Validate token on component mount
        if (!token) {
            setError('Invalid reset link. Please request a new password reset.');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.resetPassword(token, password, confirmPassword);
            if (response.status === 'success') {
                // Clear any stored reset email
                localStorage.removeItem('resetEmail');
                // Navigate to login with success message
                navigate('/login', { 
                    state: { message: 'Password has been reset successfully. Please login with your new password.' }
                });
            } else {
                setError(response.message || 'Failed to reset password');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate('/login');
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
                    <h2 className="text-3xl font-bold text-black mb-2 mt-2 ml-0">Reset Password</h2>

                    {/* Description */}
                    <p className="text-base text-gray-700 mb-6 w-full pl-0">
                        Please enter your new password below.
                    </p>

                    {error && (
                        <div className="w-full p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="mb-2">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New Password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm New Password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-[#1895F0] hover:bg-blue-600 text-white font-semibold py-3 rounded-2xl text-lg transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
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

export default NewPassword; 