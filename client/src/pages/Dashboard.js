import React, { useEffect, useMemo, useState } from 'react'
import TinderCard from 'react-tinder-card'
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'
import { useCookies } from 'react-cookie'
// source code react tinder card
// https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Simple.js

const Dashboard = () => {
  const [user, setUser] = useState()
  const [genderedUsers, setGenderedUsers ] = useState(null)
  const [lastDirection, setLastDirection] = useState()
  const [cookies, setCookies, removeCookie] = useCookies(['user'])

  const userId = cookies.UserId
  
  const getUser = async ()=>{
    try {
      
      const response = await axios.get('http://localhost:8000/user', 
            { params: { userId }})

      setUser(response.data)
    } catch (error) {
      console.log(error)      
    }
  }

  const getGenderedUsers = async ()=>{
    try {

      const response = await axios.get('http://localhost:8000/gendered-users',{
        params: { gender : user?.gender_interest }
      })

      setGenderedUsers(response.data)
      
    } catch (error) {
      console.log(error)
    }
  }
   
  useEffect(()=>{
    getUser()
  },[])
  
  useEffect(()=>{
    if(user)  getGenderedUsers()
  },[user])


  const updateMatches = async (matchedUserId)=>{
    try {
      await axios.put('http://localhost:8000/addmatch',{
      userId, matchedUserId
     }) 
     getUser()
    } catch (error) {
      console.log(error) 
    }
  }

  const swiped = (direction, swipedUserId) => {
    if(direction ==='right'){
      updateMatches(swipedUserId)
    }    
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }


  const matchedUserIds = user?.matches.map(({ user_id })=> user_id).concat(userId)

  const filteredGenderedUsers = genderedUsers?.filter(
    genderedUser => !matchedUserIds.includes(genderedUser.user_id))

  return (
    <>
    { user && 
      <div className='dashboard'>
        <ChatContainer user={user}/>

        <div className='swiper-container'>
          <div className='card-container'>
            {filteredGenderedUsers?.map((genderedUser) =>
              <TinderCard className='swipe' key={genderedUser.first_name} onSwipe={(dir) => swiped(dir, genderedUser.user_id)} onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
                <div style={{ backgroundImage: 'url(' + genderedUser.url + ')' }} className='card'>
                  <h3>{genderedUser.first_name}</h3>
                </div>
              </TinderCard>
            )}
            {lastDirection ? <h2 className='swipe-info'>You swiped {lastDirection}</h2> : <h2 className='swipe-info'/> }
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default Dashboard