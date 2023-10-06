import React, { useState, useEffect, memo } from 'react';

//mui
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Card, CardContent, Radio, FormControl, RadioGroup, FormControlLabel, FormLabel, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { BodyWrapper } from '../styles/StyledComponent'

const Quiz = memo(({ quiz }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(new Array(quiz.length).fill(''));
    const [answeredQuestion, setAnsweredQuestion] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => {
            clearTimeout(loadingTimer);
        };
    }, []);

    useEffect(() => {
        // Automatically advance to the next question when an option is selected
        if (selectedAnswers[currentQuestionIndex] !== '') {
            setTimeout(() => {
                handleNextQuestion();
            }, 1000);

        }
        return () => {
            clearTimeout();
        };
    }, [selectedAnswers, currentQuestionIndex]);

    const handleNextQuestion = () => {
        // Advance to the next question
        if (currentQuestionIndex < quiz.length - 1) {
            console.log(currentQuestionIndex < quiz.length - 1);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            // setSelectedAnswers('');
        } else {
            // Quiz completed
            setIsSubmitting(true);
        }
    };

    const handleAnswerChange = (value) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[currentQuestionIndex] = value;
        setSelectedAnswers(updatedAnswers);

        const answerQuestion = {
            question: quiz[currentQuestionIndex].question,
            answer: value
        }
        console.log(answerQuestion);
        const oldAnsweredQuestion = [...answeredQuestion, answerQuestion];
        setAnsweredQuestion(oldAnsweredQuestion);
    };
    return (
        <BodyWrapper>
            {
                isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box>
                        {
                            isSubmitting ? (
                                <Box>
                                    <Typography variant='h4' align='center' paddingBottom={3}>You have answered all the questions!</Typography>
                                    {/* Display quiz results or completion message */}
                                </Box>
                            ) : (
                                <Grid container spacing={2}>
                                    <Grid item lg={12} md={12} xs={12}>
                                        <Typography variant='h4' align='center' gutterBottom={true}>Welcome to the Quiz App!</Typography>
                                        <Card variant="outlined" sx={{ marginBottom: '10px' }}>
                                            <CardContent>
                                                <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label">{quiz[currentQuestionIndex].question}</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue={null}
                                                        name="radio-buttons-group"
                                                        value={selectedAnswers[currentQuestionIndex]}
                                                        onChange={(e) => handleAnswerChange(e.target.value)}
                                                    >
                                                        {quiz[currentQuestionIndex].answers.map((option, index) => (
                                                            <FormControlLabel
                                                                key={index}
                                                                value={option}
                                                                control={<Radio />}
                                                                label={option}
                                                            />
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                </Grid>
                            )
                        }
                        {isSubmitting &&
                            answeredQuestion.length > 0 && answeredQuestion.map((item, index) => (
                                <Grid container spacing={2} key={index}>
                                    <Grid item lg={12} md={12} xs={12}>
                                        <Card variant='outlined' sx={{ marginBottom: '10px' }}>
                                            <CardContent>
                                                <FormControl>
                                                    <FormLabel>
                                                        Question: {item.question}
                                                    </FormLabel>
                                                    <FormLabel>
                                                        Answer: {item.answer}
                                                    </FormLabel>
                                                </FormControl>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            ))}

                    </Box>
                )
            }

        </BodyWrapper>
    )
})

export default Quiz