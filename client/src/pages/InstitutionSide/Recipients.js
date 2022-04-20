import React, { useState } from 'react'
import RecipientForm from './components/RecipientForm'

function Recipients( { user } ) {




  return (
    <RecipientForm user={user} />
  )
}

export default Recipients