import React from 'react'
import { useNavigate } from 'react-router-dom'

function Select() {
    let navigate = useNavigate()

    function handleRedirect(e) {
        e.target.value === "user" ? navigate("/login") : navigate("/org/login")
    }

  return (
    <div>
        <div className='bg-white h-screen flex flex-col justify-center items-center'>
          <h2 className='lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-black mb-14 font-serif'>
            Are you a single user or an organization?
          </h2>

          <button className='font-serif text-center py-6 px-10 bg-stone-200 rounded-full text-3xl hover:bg-stone-400 transition duration-300 ease-in-out flex items-center animate-bounce"' value="user" onClick={handleRedirect}>User</button>
          <br/>
          <button className='font-serif text-center py-6 px-10 bg-stone-200 rounded-full text-3xl hover:bg-stone-400 transition duration-300 ease-in-out flex items-center animate-bounce"' value="organization" onClick={handleRedirect}>Organization</button>

        </div>
        
    </div>
  )
}

export default Select