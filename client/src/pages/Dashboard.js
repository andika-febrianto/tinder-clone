import React, { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'
import { useCookies } from 'react-cookie'
// source code react tinder card
// https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Simple.js

const Dashboard = () => {
  const [user, setUser] = useState()
  const [cookie, setCookies] = useCookies(['user'])
  const [genderedUsers, setGenderedUsers ] = useState()
  const userId = cookie.UserId
  
  const getUser = async ()=>{
    try {
      
      const response = await axios.get('http://localhost:8888', {params: { userId}})
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

  const characters = [
    {
      name: 'Richard Hendricks',
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg'
    },
    {
      name: 'Erlich Bachman',
      url: 'https://i.imgur.com/pT5639B.jpeg'
    },
    {
      name: 'Monica Hall',
      url: 'https://i.imgur.com/pT5639B.jpeg'
    },
    {
      name: 'Jared Dunn',
      url: 'https://i.imgur.com/pT5639B.jpeg'
    },
    {
      name: 'Dinesh Chugtai',
      url: 'https://as1.ftcdn.net/v2/jpg/02/41/08/94/1000_F_241089462_7Cow5jY0tL18XvpXdZizNWnL3TAGt53r.jpg'
    }
  ]

  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <>
    { user && 
      <div className='dashboard'>
        <ChatContainer user={ user }/>
        <div className='swiper-container'>
          <div className='card-container'>
            {characters.map((character) =>
              <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
                <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                  <h3>{character.name}</h3>
                  {console.log(character.url)}
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