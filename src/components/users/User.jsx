import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'

function User({match}) {

    const {getUser, user} = useContext(GithubContext)
    const params = useParams()

    useEffect(() =>{
        getUser(params.login)
    }, [])

  return (
    <div>
      {user.login}
    </div>
  )
}

export default User
