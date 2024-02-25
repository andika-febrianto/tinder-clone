import React from 'react'
import { useCookies } from 'react-cookie'

const ChatHeader = ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies('user')
  const {url, first_name } = user

  const logout = ()=>{
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)
    window.location.reload()
  }

  return (
    <div className='chat-container-header'>
      <div className='profile'>
        <div className='img-container'>
          {url && <img src={url} alt={'photo of '+ first_name} /> }
        </div>
        <h3>{user.first_name}</h3>
      </div>
      <i className='log-out-icon' onClick={logout}>@</i>
    </div>
  )
}

export default ChatHeader