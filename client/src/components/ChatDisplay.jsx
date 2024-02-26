
import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import ChatInput from './ChatInput'
import axios from 'axios'

const ChatDisplay = ({user, clickUser, }) => {
  const userId = user?.user_id
  const clickUserId = clickUser?.user_id
  const [usersMessages, setUsersMessages] = useState(null)
  const [clickedUsersMessages, setClickedUsersMessages] = useState(null)

  const getUsersMessages = async()=>{
    try {
      const response = await axios.get('http://localhost:8000/messages',{
        params: {userId: userId, correspondingUserId: clickUserId}
      })
      setUsersMessages(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getClickedUsersMessages = async()=>{
    try {
      const response = await axios.get('http://localhost:8000/messages',{
        params: {userId: clickUserId, correspondingUserId: userId}
      })
      setClickedUsersMessages(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getUsersMessages()
    getClickedUsersMessages()
  },[userId, clickUserId])


  const messages = []
  
  usersMessages?.forEach(message => {
    const formattedMessages = []

    formattedMessages['name'] = user?.first_name
    formattedMessages['img'] = user?.url
    formattedMessages['message'] = message?.message
    formattedMessages['timestamp'] = message?.timestamp

    messages.push(formattedMessages)
  })

  clickedUsersMessages?.forEach(message => {
    const formattedMessages = []

    formattedMessages['name'] = clickUser?.first_name
    formattedMessages['img'] = clickUser?.url
    formattedMessages['message'] = message?.message
    formattedMessages['timestamp'] = message?.timestamp

    messages.push(formattedMessages)
  })

  const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))

  return (
    <div>
      <Chat descendingOrderMessages={descendingOrderMessages} />
      <ChatInput 
          user={user} 
          clickedUser={clickUser} 
          getUserMessages={getUsersMessages} 
          getClickedUsersMessages={getClickedUsersMessages}
      />
    </div>
  )
}

export default ChatDisplay