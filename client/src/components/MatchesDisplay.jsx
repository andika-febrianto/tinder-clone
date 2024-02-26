import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MatchesDisplay = ({ matches, setClickUser }) => {
  const matchesUserIds = matches.map(({user_id})=>user_id)
  const [matchedProfiles, setMatchedProfiles] = useState()
  
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
  },[])

  console.log(matchedProfiles)

  return (
    <div className='matches-display'>
      {
        matchedProfiles?.map((match,_index)=>( 
          <div key={_index} className='match-card' onClick={() => setClickUser(match)}>
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