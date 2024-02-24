import React, { useState } from 'react'
import Nav from '../components/Nav'

const OnBoarding = () => {
  const [formData, setFormData] = useState({
    user_id:'',
    first_name:'',
    dob_day:'',
    dob_month:'',
    dob_year:'',
    show_gender: false,
    gender_identity: 'man',
    gender_interest: 'women',
    email:'',
    url:'',
    about:'',
    matches:[]
  })

  const handleSubmit =()=>{
    
  }

  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    setFormData((prevState)=>({ ...prevState,
      [name]:value}))
  
  }

  console.log(formData);

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
              value={formData.first_name}
              onChange={handleChange}
            />
            
            <label>Birthday</label>
            <div className='multiple-input-container'>
              <input  id='dob_day'
                type='number'
                name='dob_day'
                placeholder='DD'
                required={true}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input  id='dob_month'
                type='number'
                name='dob_month'
                placeholder='MM'
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input  id='dob_year'
                type='number'
                name='dob_year'
                placeholder='YYYY'
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>
            
            <label>Gender</label>
            <div className='multiple-input-container'>
              <input  id='man-gender-identity'
                type='radio'
                name='gender_identity'
                required={true}
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity ==='man'}
              />
              <label htmlFor='man-gender-identity'>Man</label>
              
              <input  id='woman-gender-identity'
                  type='radio'
                  name='gender_identity'
                  required={true}
                  value="woman"
                  onChange={handleChange}
                  checked={formData.gender_identity === 'women'}
              />
              <label htmlFor='woman-gender-identity'>Woman</label>
              
              <input id='more-gender-identity'
                  type='radio'
                  name='gender_identity'
                  required={true}
                  value="more"
                  onChange={handleChange}
                  checked={formData.gender_identity === 'more'}
              />
              <label htmlFor='more-gender-identity'>More</label>
            </div>

              <label htmlFor='show-gender'>Show gender on my profile</label>
              <input id='show-gender'
                  type='checkbox'
                  name='show_gender'
                  required={true}
                  onChange={handleChange}
                  checked={formData.show_gender}
              />

              <label>Show me</label>
              <div className='multiple-input-container'>
                <input  id='man-gender-interest'
                  type='radio'
                  name='gender_interest'
                  required={true}
                  value="man"
                  onChange={handleChange}
                  checked={formData.gender_interest ==='man'}
                />
                <label htmlFor='man-gender-interest'>Man</label>
                <input  id='woman-gender-interest'
                    type='radio'
                    name='gender_interest'
                    required={true}
                    value="woman"
                    onChange={handleChange}
                    checked={formData.gender_interest ==='women'}
                />
                <label htmlFor='woman-gender-interest'>Woman</label>
                
                <input id='everyone-gender-interest'
                    type='radio'
                    name='gender_interest'
                    required={true}
                    value="everyone"
                    onChange={handleChange}
                    checked={formData.gender_interest === 'everyone'}
                />
                <label htmlFor='everyone-gender-interest'>Everyone</label>
              </div>
            <label htmlFor='about'>About me</label>
            <input id='about'
              type='text'
              name='about'
              required={true}
              placeholder='I like long walks'
              value={formData.about}
              onChange={handleChange}
            />
            <input type='submit'/>
          </section>

          <section>
            <label htmlFor='picture'>Profile picture</label>
            <input
                type='url'
                name='url'
                id='url'
                onChange={handleChange}
                required={true}
            />
            <div className='photo-container'>
              <img src={formData.url} alt='fdsa'/>
            </div>
          </section>
        </form>
      </div>
    </>
  )
}

export default OnBoarding