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
        <p className="mb-6 text-xl md:text-4xl uppercase font-bold">WHO WE ARE.</p>
        <p className="mb-4 text-lg">Quae commodi reiciendis dignissimos. Rerum molestiae hic dolores assumenda dolor! Corrupti reiciendis maxime fuga, recusandae obcaecati officia cum temporibus dicta quibusdam praesentium, magni, cumque aperiam iusto sequi illum molestiae non.</p>
        <p className="mb-4 text-lg">In excepturi repellendus eum, qui corrupti rerum perferendis harum adipisci voluptate? Nihil, quidem deleniti libero officia dicta vel asperiores velit molestiae blanditiis, dolore voluptatibus excepturi laudantium at veniam illo. Dolor!</p>
      </div>

      <div className="bg-quote container flex items-center justify-center h-screen mx-auto">
        <blockquote className="bg-black font-serif mx-4 p-4 text-center text-white md:p-8">
          <p className="font-bold italic text-3xl">
            &ldquo;Providing friendships, one postcard at a time.&rdquo;
          </p>
        </blockquote>
      </div>

      <div className="font-serif leading-normal mx-auto py-12 px-4 max-w-lg">
        <p className="mb-6 text-xl md:text-4xl uppercase font-bold">HOW TO GET STARTED.</p>
        <p className="mb-4 text-lg">Quae commodi reiciendis dignissimos. Rerum molestiae hic dolores assumenda dolor! Corrupti reiciendis maxime fuga, recusandae obcaecati officia cum temporibus dicta quibusdam praesentium, magni, cumque aperiam iusto sequi illum molestiae non.</p>
        <p className="mb-4 text-lg">In excepturi repellendus eum, qui corrupti rerum perferendis harum adipisci voluptate? Nihil, quidem deleniti libero officia dicta vel asperiores velit molestiae blanditiis, dolore voluptatibus excepturi laudantium at veniam illo. Dolor!</p>
      </div>

      <div className="bg-footer container flex items-center justify-center h-screen mx-auto">
      </div>

      <div className="font-serif leading-normal mx-auto py-12 px-4 max-w-lg">
        <p className="mb-6 text-xl md:text-4xl uppercase font-bold">ORGANIZATION ADMINSTRATORS.</p>
        <p className="mb-4 text-lg">Quae commodi reiciendis dignissimos. Rerum molestiae hic dolores assumenda dolor! Corrupti reiciendis maxime fuga, recusandae obcaecati officia cum temporibus dicta quibusdam praesentium, magni, cumque aperiam iusto sequi illum molestiae non.</p>
        <p className="mb-4 text-lg">In excepturi repellendus eum, qui corrupti rerum perferendis harum adipisci voluptate? Nihil, quidem deleniti libero officia dicta vel asperiores velit molestiae blanditiis, dolore voluptatibus excepturi laudantium at veniam illo. Dolor!</p>
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