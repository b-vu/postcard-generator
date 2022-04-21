import React from 'react'

function ReadOnlyRow( { recipient, editRecipient, handleDelete }) {
  //() => editRecipient(recipient)
    return (
    <tr>
        <td>{recipient.first_name}</td>
        <td>{recipient.last_name}</td>
        <td>
            <button onClick={(e) => editRecipient(e, recipient)}>Edit</button>
            <button onClick={(e) => handleDelete(e, recipient.id)} >Delete</button>
        </td>
    </tr>
  )
}

export default ReadOnlyRow