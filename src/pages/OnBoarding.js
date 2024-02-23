import React from 'react'
import Nav from '../components/Nav'

const OnBoarding = () => {

  const handleSubmit =()=>{
    
  }

  const handleChange = ()=>{

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
            <label htmlFor='first_name'>First Name</label>
            <input  id='first_name'
              type='text'
              name='first_name'
              placeholder='First Name'
              required={true}
              value={""}
              onChange={handleChange}
            />
            
            <label>Birthday</label>
            <input  id='dob_day'
              type='text'
              name='dob_day'
              placeholder='DD'
              required={true}
              value={""}
              onChange={handleChange}
            />
          </section>
        </form>
      </div>
    </>
  )
}

export default OnBoarding