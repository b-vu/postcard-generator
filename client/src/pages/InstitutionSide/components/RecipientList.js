import React, { useState, useEffect } from 'react'

function RecipientList( { user, recipients }) {
    // const [recipients, setRecipient] = useState([])

    // useEffect(() => {
    //     fetch("/inst-recipients")
    //     .then(resp => resp.json())
    //     .then(data => console.log(data))
    // }, [])
    let recipientElements = recipients.map(recipient => {
        return (
            <tr>
                <th>{recipient.first_name}</th>
                <th>{recipient.last_name}</th>
                <th>
                    <button>Edit</button>
                    <button>Delete</button>
                </th>
            </tr>
        )
    })
  
    return (
        <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
            </tr>
            {recipientElements}
        </table>
    )
}

export default RecipientList