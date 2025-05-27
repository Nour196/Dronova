import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-800 px-4 md:px-16 lg:px-28 py-8'>
   <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
    <div>
        <h2 className='text-lg font-bold mb-4 text-white'>
            about us
        </h2>
        <p className='text-gray-300'> we are a team dedicated to providing the best productsz and services to our coustemers</p>
    </div>
    <div>
    <h2 className='text-lg font-bold mb-4 text-white'>
             links 
        </h2>
        <ul>
            <li><a href="#Header" className='hover:underline text-gray-300'>Home</a></li>
            <li><a href="#About" className='hover:underline text-gray-300'>About</a></li>
            <li><a href="#slides" className='hover:underline text-gray-300'>Slides</a></li>
            <li><a href="#Drones" className='hover:underline text-gray-300'>Drones</a></li>
        </ul>
    </div>
    <div>
    <h2 className='text-lg font-bold mb-4 text-white'>
            follow  us
        </h2>
        <ul className='flex space-x-4'>
            <li> <a href="" className='hover:underline text-gray-300'>home</a></li>
            <li><a href="" className='hover:underline text-gray-300'>service</a></li>
            <li><a href="" className='hover:underline text-gray-300'>contact</a></li>
           
        </ul>
    </div>

   </div>
   <div className='border-t border-gray-600 pt-6 text-gray-300  text-center  mt-6'>
    <p> 2025 code efeefg</p>
   </div>
    </footer>
  )
}

export default Footer