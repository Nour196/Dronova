import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [showmobilemenu, setshowmobilemenu] =useState(false)
    useEffect(()=>{if(showmobilemenu){
        document.body.style.overflow='hidden'
    }else{
         document.body.style.overflow='auto'
    }
    return()=>{
        document.body.style.overflow='auto'
    }
},[showmobilemenu])
  return (
    <div className='absolute top-0 left-0 w-full z-10'>
        <div>
            <div className='container mx-auto flex  justify-between items-center py-4 px-6 md:px20 lg:px-32 bg-transparent'>

            <div>
            <img src="src/components/logo.webp" alt=""  className='w-12 h-12 object-cover rounded-md  '/>
                dronova</div>
            <ul className=' md:flex gap-7 text-black'>
                <a href="#Header" className='cursor-pointer hover:text-gray-400'>home</a>
                <a href="#About" className='cursor-pointer hover:text-gray-400'>about</a>
                <a href="#slides" className='cursor-pointer hover:text-gray-400'>projects</a>
                <a href="#Drones" className='cursor-pointer hover:text-gray-400'>Drones</a>



            </ul>
            <button className=' md:block bg-white px-8 py-2 rounded-full '>sign up</button>
            {/*  <img onCklick={()=> setshowmobilemenu(true)} src={} className='md:hidden w-7' alt="" cursor-pointer /> */}
            </div>
        </div>
        {/* ----mobile menu------ */}
        <div className={`md:hidden ${showmobilemenu? 'fixed w-full':'h-0  w-0' } right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}>
            <div className='flex justify-end p-6 cursor-pointer'>
             {/* <img onCklick={()=> setshowmobilemenu(false)} src="" alt="" /> */}
            </div>
            <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>

                <a onCklick={()=> setshowmobilemenu(false)} href="#Header" className='px-4 py-2 rounded-full inline-block'>home</a>
                <a onCklick={()=> setshowmobilemenu(false)} href="#About" className='px-4 py-2 rounded-full inline-block'>about</a>
                <a onCklick={()=> setshowmobilemenu(false)} href="#Projects" className='px-4 py-2 rounded-full inline-block'>projects</a>
                <a onCklick={()=> setshowmobilemenu(false)} href="#Testimonials" className='px-4 py-2 rounded-full inline-block'>Testimonials</a>
            </ul>
        </div>
  </div>
  )
}

export default Navbar