import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SuccessfullPage = () => {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate("/")
          }, "3000");
    },[])
  return (
    <div>
      SuccessfullPage
    </div>
  )
}

export default SuccessfullPage
