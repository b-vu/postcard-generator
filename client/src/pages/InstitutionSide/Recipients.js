import React, { useState, useEffect } from 'react'
import RecipientForm from './components/RecipientForm'
import RecipientList from './components/RecipientList'

function Recipients( { user } ) {
    const [recipients, setRecipients] = useState([])

    useEffect(() => {
        fetch("/inst-recipients")
        .then(resp => resp.json())
        .then(data => setRecipients(data))
    }, [])

    function handleAddRecipient(recipient) {
        setRecipients([...recipients, recipient])
    }



    return (
        <div>
            <RecipientForm handleAddRecipient={handleAddRecipient} user={user} />
            <RecipientList user={user} recipients={recipients} />
        </div>
    )
}

export default Recipients