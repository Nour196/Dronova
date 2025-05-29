import React from "react";

const bgUrl =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"; // Example drone image

export default function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70" />
      <div className="relative z-10 w-full max-w-md mx-auto rounded-3xl shadow-2xl bg-gray-100 bg-opacity-90 p-10 flex flex-col items-center">
        <div className="flex flex-col items-center mb-6">
          <span className="text-3xl mb-2">🛸</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Log in to Dronova</h2>
        </div>
        <form className="w-full flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">email address</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-4 py-2 rounded-md bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </span>
            </div>
            <div className="text-right mt-1">
              <a href="#" className="text-xs text-blue-500 hover:underline">Forgot password?</a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors mt-2"
          >
            Log in
          </button>
        </form>
        <div className="text-sm text-gray-600 mt-4">
          do you need an account?{' '}
          <a href="#" className="text-blue-500 hover:underline">sign up Now</a>
        </div>
        <div className="flex items-center w-full my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="mx-2 text-gray-400 text-xs">or continue with</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        <div className="flex gap-4 w-full">
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 bg-white hover:bg-gray-50">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 bg-white hover:bg-gray-50">
            <img src="https://www.svgrepo.com/show/512120/facebook-176.svg" alt="Facebook" className="w-5 h-5" />
            Facebook
          </button>
        </div>
        <footer className="mt-8 text-xs text-gray-400 text-center w-full">
          2025 © Dronova &nbsp; <a href="#" className="hover:underline">Privacy Policy</a> &nbsp; <a href="#" className="hover:underline">Terms of Use</a> &nbsp; <a href="#" className="hover:underline">FAQ</a> &nbsp; <a href="#" className="hover:underline">DJI Support</a> &nbsp; <a href="#" className="hover:underline">Site Map</a>
        </footer>
      </div>
    </div>
  );
} 