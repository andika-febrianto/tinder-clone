import React from 'react'
import whiteLogo from '../images/tinder-logo-white.png'
import colorLogo from '../images/Tinder-Logo-red.png'


const Nav = ({minimal, authToken}) => {

  return (
    <nav>
      <div className='logo-container'>
        <img className='logo' src={minimal ? colorLogo : whiteLogo} alt='' />
      </div>
      {!authToken && !minimal && <button className='nav-button'>Log in</button>}
    </nav>
  )
}

export default Nav