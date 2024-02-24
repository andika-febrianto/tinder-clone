import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import ChatContainer from '../components/ChatContainer'

// source code react tinder card
// https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Simple.js

const Dashboard = () => {
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
    <div className='dashboard'>
      <ChatContainer />
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
  )
}

export default Dashboard