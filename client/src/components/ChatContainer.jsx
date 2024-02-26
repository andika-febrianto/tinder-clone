import React, { useState } from 'react'
import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import ChatDisplay from './ChatDisplay'

const ChatContainer = ({ user }) => {
  const [clickUser, setClickUser] = useState(null)
 
  console.log('clickuser', clickUser)
  
  return (
    <div className='chat-container'>
        <ChatHeader user={ user } />
        
        <div>
          <button className='option' onClick={()=>setClickUser(null)}>Matches</button>
          <button className='option' disabled={!clickUser} >Chat</button>
        </div>

        {!clickUser && <MatchesDisplay matches ={ user.matches } setClickUser={ setClickUser } />}
        {clickUser && <ChatDisplay user={user} clickUser={clickUser} />}
    </div>
  )
}

export default ChatContainer