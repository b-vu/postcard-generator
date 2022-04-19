import React from 'react'

function Home({ user }) {
  console.log(user)

  return (
    <div>
      Home
      {
        user ? 
        user.postcards.map(postcard => {
          return <img src={postcard.image.url} alt="Postcard"></img>
        })
        :
        null
      }
    </div>
  )
}

export default Home