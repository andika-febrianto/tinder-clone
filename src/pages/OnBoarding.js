import React from 'react'
import Nav from '../components/Nav'

const OnBoarding = () => {

  const handleSubmit =()=>{

  }

  return (
    <>
     <Nav minimal={true} 
           setShowModal={()=>{}} 
           setIsSignUp ={false}/>
      
      <div className='onboarding'>
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label>First Name</label>
            
          </section>
        </form>
      </div>
    </>
  )
}

export default OnBoarding