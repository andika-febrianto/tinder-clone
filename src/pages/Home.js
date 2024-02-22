import React from 'react'
import Nav from '../components/Nav'


const Home = () => {
  const outhToken = false

  const handleClick =()=>{
    console.log('clicked')
  }

  return (
    <div className='overlay'>
      <Nav minimal={false} authToken={outhToken}/>
      <div className='home'>
        <h1>Swipe Right@</h1>
        <button className='primary-button' onClick={handleClick}>
          {outhToken ? 'SignOut': 'Create Account'}
        </button>
      </div>
    </div>
  )
}

export default Home