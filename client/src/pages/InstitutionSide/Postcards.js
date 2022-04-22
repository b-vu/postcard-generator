import React, { useState, useEffect } from 'react';
import PostcardCard from './components/PostcardCard';

function Postcards() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    fetch("/inst")
    .then(res => res.json())
    .then(data => setRecipients(data.recipients));
  }, []);

  return (
    <div>
      <h1 className="font-serif mb-6 text-xl md:text-4xl uppercase font-bold flex justify-center">From our community to yours</h1>
      {
        recipients.map(recipient => {
          return <div key={recipient.id}>
            <h1 className="font-serif text-xl md:text-2xl uppercase font-bold flex items-center justify-center">To: {recipient.first_name} {recipient.last_name}</h1>
            <PostcardCard postcards={recipient.postcards}></PostcardCard>
          </div>
        })
      }
    </div>
  )
}

export default Postcards