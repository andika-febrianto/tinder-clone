import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const MatchesDisplay = ({ matches, setClickUser }) => {
  const matchesUserIds = matches.map(({user_id})=>user_id)
  const [matchedProfiles, setMatchedProfiles] = useState()
  const [cookies, setCookies, removeCookie] = useCookies(['user'])

  const userId = cookies.UserId
 

  const getMatches = async()=>{
    
    try {
      const response =  await axios.get('http://localhost:8000/users',{
        params: {userIds: JSON.stringify(matchesUserIds)}
      })

      setMatchedProfiles(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getMatches()
  },[matches])


  // const filteredMatchedProfiles = matchedProfiles?.filter(
  //   (matchedProfile) => 
  //   matchedProfile.matches.filter(profile => profile.user_id === userId).length > 0
  // )

  const filteredMatchedProfiles = matchedProfiles?.filter(
    (matchedProfile) =>
      matchedProfile.matches.filter((profile) => profile.user_id === userId)
        .length > 0
  );

  console.log('filteredMatched', filteredMatchedProfiles)
  console.log('matchedProfiles', matchedProfiles)

  return (
    <div className='matches-display'>
      {
        matchedProfiles?.map(match=>( 
          <div key={match.user_id} className='match-card' onClick={() => setClickUser(match)}>
            <div className='img-container'>
                <img src={match?.url} alt={match?.first_name + ' profile'}/>
            </div>
            <h3>{match?.first_name}</h3>
          </div>
          )
        )
      }
    </div>
  )
}

export default MatchesDisplay