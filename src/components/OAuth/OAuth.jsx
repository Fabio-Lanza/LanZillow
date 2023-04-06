import React from 'react'
import {FcGoogle} from 'react-icons/fc'
import './OAuth.css'

export default function Oauth() {
  return (
    <button className='oauth-btn'>
       <FcGoogle className='icon'/> Continue with Google
    </button>
  )
}
