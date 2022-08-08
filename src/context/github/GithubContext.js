import {useEffect, createContext, useState, useReducer} from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
    
    const initialState = {
        users: [],
        user: {},
        isLoading: false
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // Get search users 
    const searchUsers = async (text) => {
        setLoading()

        const params = new URLSearchParams({
            q: text
        })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`
            }
        }) 

        const {items} = await response.json()

        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    }

    // Get single user
    const getUser = async (login) => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`
            }
        }) 
        
        if (response.status === 404) {
            window.location = '/notfound'
        } else {
            const data = await response.json()
    
            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }

    }


    const setLoading = () => {
        dispatch({
            type: 'SET_LOADING'
        })
    }

    const clearUsers = () => {
        dispatch({
            type: 'CLEAR_USERS'
        })
    }

    return <GithubContext.Provider value={{
        users: state.users,
        isLoading: state.isLoading,
        searchUsers,
        clearUsers,
        getUser,
        user: state.user
    }}>
        {children}
    </GithubContext.Provider>
}

export default GithubContext