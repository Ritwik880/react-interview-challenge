// Conditional Rendering Puzzle: Build a React component that renders "Hello, World!" initially. After 5 seconds, change the text to "Goodbye, World!" without using any external state management libraries or timers.

import React, {useState, useEffect} from 'react'
import { BodyWrapper } from '../styles/StyledComponent';
import { Typography } from '@mui/material';

const MiniChallenge2 = () => {
    const [message, setMessage] = useState('Hello, World!');
    
    useEffect(() => {
      const timer = setTimeout(()=>{
        setMessage('Goodbye, World!')
      }, 5000)
    
      return () => {
        clearTimeout(timer);
      }
    }, [])
    
  return (
    <BodyWrapper>
        <Typography variant='h4'>Message: {message}</Typography>
    </BodyWrapper>
  )
}

export default MiniChallenge2
