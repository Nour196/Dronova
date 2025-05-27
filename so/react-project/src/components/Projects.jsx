import React from 'react'

const projects = () => {
  return (
    <div className='container mx-auto py-4 pt-20 px-6 md:px-20
    lg:px-32 my-20 w-full overflow-hidden  ' id='Projects'>
        <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>projects <span className='underline underline-offset-4 decoration-1 under font-light'>completed</span></h1>
        <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>hbebfhbej efbhefbjbjhbf hefbjjeebjb efjhfehfehj hefgfhgjg efhefgehgj </p>
        {/* slider buttons  */}
        <div className='flex justify-end items-center mb-8'>
            <button className='p-3 bg-gray-200 rounded mr-2' aria-label='Previous Projects'>
                <img src="" alt="Previous" />

            </button>
            <button className='p-3 bg-gray-200 rounded mr-2' aria-label='Next Projects'>
                <img src="" alt="Next" />

            </button>
        </div>
        {/* projects slider container  */}
        <div>
            <div>
                
            </div>
        </div>
    </div>
  )
}

export default projects