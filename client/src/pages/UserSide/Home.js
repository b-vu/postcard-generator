import React from 'react'

function Home({ user }) {
  console.log(user)

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      {/* <div className='text-5xl'>Home</div> */}
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