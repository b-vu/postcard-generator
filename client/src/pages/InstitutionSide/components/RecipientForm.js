import React, { useState } from 'react'


function RecipientForm( { user, handleAddRecipient } ) {
    const [formData, setFormData] = useState({
        first_name: "", 
        last_name: ""
    });

    function onSubmit (e) {
        e.preventDefault();
        let recipient = {...formData, institution_id: user.id }
        fetch("/new_recipient", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(recipient)
          })
          .then(res => res.json())
          .then(recipient => handleAddRecipient(recipient));
        setFormData({
          first_name: "", 
          last_name: ""
      })
    }

    function handleFormChange (e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
          });
    }


  return (
    <div className='w-1/2 bg-white rounded-lg  shadow-default my-8'>
      <form onSubmit={onSubmit}>
        <label>
          <div className={`font-serif text-xl`}> New Recipient's First Name</div>
          <input className={`font-serif w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`} type="text" name="first_name" value={formData.first_name} onChange={handleFormChange} placeholder="First Name"></input>
        </label>
        
        <label>
          <div className={`font-serif text-xl`}>New Recipient's Last Name</div>
          <input className={`font-serif w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`} type="text" name="last_name" value={formData.last_name} onChange={handleFormChange} placeholder="Last Name"></input>
        </label>

        <button className={`font-serif text-center py-2 px-4 bg-stone-200 rounded-full text-base hover:bg-stone-400 transition duration-300 ease-in-out flex items-center animate-bounce"`} >Add Recipient</button>
      </form>
    </div>
  )
}

export default RecipientForm