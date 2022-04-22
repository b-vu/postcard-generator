import React from 'react'

function ReadOnlyRow( { recipient, editRecipient, handleDelete }) {
  //() => editRecipient(recipient)
    return (
    <tr className="text-left border-b border-black">
        <td className="py-3">{recipient.first_name}</td>
        <td className="py-3">{recipient.last_name}</td>
        <td className="py-3">
            <button className={'underline hover:text-sky-600 px-1'} onClick={(e) => editRecipient(e, recipient)}>Edit</button>
            <button className={'underline hover:text-red-500 px-1'} onClick={(e) => handleDelete(e, recipient.id)} >Delete</button>
        </td>
    </tr>
  )
}

export default ReadOnlyRow