import React, { useState } from 'react'
import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'

const Home = () => {
  const outhToken = false
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)

  const handleClick =()=>{
    console.log('clicked')
    setShowModal(true)
    setIsSignUp(true)
  }

  return (
    <div className='overlay'>
      <Nav minimal={false} 
           authToken={outhToken} 
           setShowModal={setShowModal} 
           showModal={showModal}
           setIsSignUp ={setIsSignUp}/>

      <div className='home'>
        <h1 className='primary-title'>Swipe Right®</h1>
        <button className='primary-button' onClick={handleClick}>
          {outhToken ? 'SignOut': 'Create Account'}
        </button> 

        {showModal && <AuthModal  setShowModal={setShowModal}
                                  isSignUp={isSignUp} />}
      </div>
    </div>
  )
}

export default Home