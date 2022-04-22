import React, { useState, Fragment } from 'react'
import EditableRow from './EditableRow'
import ReadOnlyRow from './ReadOnlyRow'

function RecipientList( { recipients, handleRecipientsEdit }) {
    const [editRecipientId, setEditRecipientId] = useState(null)
    const [editFormData, setEditFormData] = useState({
        first_name: "", 
        last_name: ""
    });

    function editRecipient (e, recipient) {
        e.preventDefault();
        setEditRecipientId(recipient.id)

        const formValues = {
            first_name: recipient.first_name,
            last_name: recipient.last_name,
        }
        setEditFormData(formValues)

    }

    function handleEditFormChange(e) {
        e.preventDefault();
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        })


    }

    function handleEditFormSubmit (e) {
        e.preventDefault();
        const editedRecipient = editFormData
        editedRecipient.id = editRecipientId
        
        const newRecipients = [...recipients]
        const index = recipients.findIndex((r) => r.id === editRecipientId)
        newRecipients[index] = editedRecipient

        fetch(`/recipients/${editRecipientId}`, {
            method: 'PATCH',
            body: JSON.stringify(editFormData),
            headers: {'Content-type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => console.log(data))

        handleRecipientsEdit(newRecipients);
        setEditRecipientId(null)
    }

    function handleDelete (e, id) {
        e.preventDefault();
        console.log(id)
        fetch(`/recipients/${id}`, {
            method: 'DELETE' 
        })
        .then(resp => resp.json())
        .then(r => console.log(r))
        
        const newRecipients = [...recipients]

        const index = recipients.findIndex((r) => r.id === id)
        newRecipients.splice(index, 1)

        handleRecipientsEdit(newRecipients)

    }

    let recipientElements = recipients.map(recipient => {
        return (
            <Fragment>
                {editRecipientId === recipient.id ? (
                    <EditableRow key={recipient.id} editFormData={editFormData} handleEditFormChange={handleEditFormChange} /> 
                ) : (
                    <ReadOnlyRow key={recipient.first_name} recipient={recipient} editRecipient={editRecipient} handleDelete={handleDelete} />)
                }
            </Fragment>
        )
    })
    //m-auto flex justify-center items-center
    return (
        <form onSubmit={handleEditFormSubmit}>
                <table className="text-left mx-auto w-full font-serif text-xl ">
                    <tr className="text-left border-b border-t border-black border-spacing-2 my-8">
                        <th className="py-3">First Name</th>
                        <th className="py-3">Last Name</th>
                        <th className="py-3">Actions</th>
                    </tr>
                    {recipientElements}
                </table>
        </form>
    )
}

export default RecipientList