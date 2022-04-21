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
    <form onSubmit={onSubmit}>
          <label>
            <span> New Recipient's First Name</span>
            <input type="text" name="first_name" value={formData.first_name} onChange={handleFormChange} placeholder="first name"></input>
          </label>
          
          <label>
            <span>New Recipient's Last Name</span>
            <input type="text" name="last_name" value={formData.last_name} onChange={handleFormChange} placeholder="last name"></input>
          </label>

          <button>Add Recipient</button>
        </form>
  )
}

export default RecipientForm