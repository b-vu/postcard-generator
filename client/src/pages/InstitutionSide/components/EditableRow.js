import React from 'react'

function EditableRow( { editFormData, handleEditFormChange }) {
  return (
    <tr className="text-left border-b border-black">
        <td className="py-3">
            <input 
                type="text" 
                required="required" 
                placeholder="Enter a first name..." 
                name="first_name" 
                value={editFormData.first_name}
                onChange={handleEditFormChange}
            ></input>
        </td>
        <td className="py-3">
            <input 
                type="text" 
                required="required" 
                placeholder="Enter a last name..." 
                name="last_name" 
                value={editFormData.last_name}
                onChange={handleEditFormChange}
            ></input>
        </td>
        <td className="py-3">
            <button type="submit" className={'underline hover:text-green-500 px-1'}>Save</button>
        </td>

    </tr>
  )
}

export default EditableRow