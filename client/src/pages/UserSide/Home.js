import React from 'react'

function Home({ user }) {
  console.log(user)

  return (
    <>
      <header className="bg-header container flex items-center justify-center h-screen mx-auto">
        <div className="font-serif mx-4 p-4 text-center md:p-8">
          <h1 className="text-8xl uppercase font-bold">
            POSTCARD GENERATOR
          </h1>
        </div>
      </header>

      <div className="font-serif leading-normal mx-auto py-12 px-4 max-w-lg">
        <p className="mb-6 text-xl md:text-4xl uppercase font-bold">WHO WE ARE</p>
        <p className="mb-4 text-xl">Postcard Generator is a free service dedicated to providing individuals in hospitals or assisted-living facilities with uplifting cards from caring individuals across the globe. </p>
        <p className="mb-4 text-xl">In difficult times, a small postcard can have a big impact. </p>
      </div>

      <div className="bg-quote container flex items-center justify-center h-screen mx-auto">
        <blockquote className="bg-black font-serif mx-4 p-4 text-center text-white md:p-8">
          <p className="font-bold italic text-3xl">
            &ldquo;Providing friendship, one postcard at a time.&rdquo;
          </p>
        </blockquote>
      </div>

      <div className="font-serif leading-normal mx-auto py-12 px-4 max-w-lg">
        <p className="mb-6 text-xl md:text-4xl uppercase font-bold">HOW TO GET STARTED</p>
        <p className="mb-4 text-xl">Providing friendship through a postcard is simple. After signing up, you can use our in-browser editor to create something that is unique that only you can make. Upload images, draw pictures, write messages; the possibilities to make an inspiring postcard are endless.</p>
        <p className="mb-4 text-xl">After you submit your card, it will be sent to the manager of the organization you choose, and they will hand-deliver it!</p>
      </div>

      <div className="bg-footer container flex items-center justify-center h-screen mx-auto">
      </div>

      <div className="font-serif leading-normal mx-auto py-12 px-4 max-w-lg">
        <p className="mb-6 text-xl md:text-4xl uppercase font-bold">ORGANIZATION ADMINSTRATORS</p>
        <p className="mb-4 text-xl">If you are an organization wishing to get postcards in the hands of your patients, you can easily add recipients to our database through our user-friendly interface. Changes to your list are painless so that you can spend less time on our site and more time with those who depend on you.</p>
        <p className="mb-4 text-xl">In addition to adding recipients, you will also be able to view, save, and print postcards sent to your patients in a few clicks.</p>
        <p className="mb-4 text-xl">Have questions? Email us at admin@pg.com</p>
      </div>

      {/* <div className='text-5xl'>Home</div> */}
      {/* {
        user ? 
        user.postcards.map(postcard => {
          return <img src={postcard.image.url} alt="Postcard"></img>
        })
        :
        null
      } */}
    </>
  )
}

export default Home