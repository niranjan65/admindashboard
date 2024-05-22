import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if(!token) {
            navigate("/login")
        }
        console.log("Token", token)
    }, [])
    
  return (
    <div>HomePage</div>
  )
}

export default HomePage