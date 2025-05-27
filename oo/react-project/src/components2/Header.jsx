import React from 'react'

const heade = () => {
  return (
    
       
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-xl font-bold">
              <span className="text-white">DRO</span>
              <span className="text-teal-400">NOVA</span>
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-teal-400 transition-colors">Product</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Features</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Pricing</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Support</a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-1 border border-gray-600 rounded-md hover:bg-gray-800 transition-colors">
              Login
            </button>
            <button className="px-4 py-1 bg-teal-600 rounded-md hover:bg-teal-700 transition-colors">
              Register Now!
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Unlock the <span className="italic">power</span> of <br />
              The <span className="text-white">Drones</span> with <br />
              <span className="text-white">DRO</span>
              <span className="text-teal-400">NOVA</span>!
            </h1>

            <p className="text-gray-300 text-lg">
              A smart platform that offers drone services for agriculture, security, and industry. Users can easily book
              a service, monitor operations, and get fast, accurate results with advanced drone technology.
            </p>

            <button className="px-6 py-3 bg-teal-600 rounded-md hover:bg-teal-700 transition-colors flex items-center space-x-2">
              <span>Get started</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="relative">
            <div className="relative z-10">
              {/* Replace with your actual drone image */}
              <img 
                src="https://images.unsplash.com/photo-1579829366248-204fe8413f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                alt="Drone" 
                className="object-contain w-full h-auto rounded-lg" 
              />
            </div>

            {/* Floating tags */}
            <div className="absolute top-5 right-5 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-teal-500/30">
              <span className="text-sm">
                The Future of <span className="text-teal-400 font-semibold">Aerial Intelligence</span>
              </span>
            </div>

            <div className="absolute bottom-20 left-0 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-teal-500/30">
              <span className="text-sm">
                Precision , Efficiency , <span className="text-teal-400 font-semibold">Innovation</span>
              </span>
            </div>

            <div className="absolute bottom-5 right-10 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-teal-500/30">
              <span className="text-sm">
                Precision from <span className="text-teal-400 font-semibold">Above</span>
              </span>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 bg-teal-500/20 blur-3xl rounded-full -z-10"></div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our <span className="text-teal-400">Features</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Precision Agriculture",
              description: "Optimize crop health with our advanced drone imaging and data analysis.",
              icon: "🌱"
            },
            {
              title: "Security Surveillance",
              description: "24/7 monitoring with high-resolution cameras and real-time alerts.",
              icon: "🛡️"
            },
            {
              title: "Industrial Inspection",
              description: "Safe and efficient inspection of hard-to-reach infrastructure.",
              icon: "🏗️"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-xl font-bold">
                <span className="text-white">DRO</span>
                <span className="text-teal-400">NOVA</span>
              </span>
              <p className="text-gray-400 mt-2">The future of drone technology</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Contact</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Dronova. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
 
    
  )
}

export default heade