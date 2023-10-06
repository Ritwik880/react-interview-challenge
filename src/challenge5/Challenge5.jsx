import React, { memo } from 'react'
import { QUESTIONS as questions } from '../utils/constant'
import Quiz from './Quiz'

const Challenge5 = memo(() => {
    return (<Quiz quiz={questions} />)
})

export default Challenge5