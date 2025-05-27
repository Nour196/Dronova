import React from 'react'
import Navbar from './Navbar'
const Header = () => {
  return (
    <div className='min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden ' style={{backgroundImage:"url('src/components/photo.png')"}} id='Header'>
        <Navbar></Navbar>
        <div className='container texte-center mx-auto py-4 px-6 md:px-20 lg:px-32  text-black '>
           
            <h2 className='tex-5xl sm:text-6xl md:text-[82px] inline-block
            max-w-3xl font-semibold'>  
            explore homes fit your dreams </h2>
        <div className='space-x-6 mt-16'>
            <a href="#Projects" className='border bordor-white px-8 py-3 rounded'>projects</a>
            <a href="#Contact" className='bg-blue-500 px-8 py-3 rounded'>contact us</a>
        </div>
        </div>
    </div>
  )
}

export default Header