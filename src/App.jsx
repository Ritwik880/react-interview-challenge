import React, { lazy, Suspense } from 'react';
import Challenge1 from './challenge1/Challenge1';
import IndividualPost from './challenge1/IndividualPost';
import {
  Box,
  CircularProgress,
} from '@mui/material';
import { Routes, Route } from 'react-router-dom';

//css
import './App.css';
const Challenge17 = lazy(() => import('./challenge17/Challenge17'));
const Challenge16 = lazy(() => import('./challenge16/Challenge16'));
const Challenge15 = lazy(() => import('./challenge15/Challenge15'));
const Challenge14 = lazy(() => import('./challenge14/Challenge14'));
const Challenge13 = lazy(() => import('./challenge13/Challenge13'));
const Challenge12 = lazy(() => import('./challenge12/Challenge12'));
const Challenge11 = lazy(() => import('./challenge11/Challenge11'));
const Challenge10 = lazy(() => import('./challenge10/Challenge10'));
const Challenge9 = lazy(() => import('./challenge9/Challenge9'));
const Challenge8 = lazy(() => import('./challenge8/Challenge8'));
const Challenge7 = lazy(() => import('./challenge7/Challenge7'));
const Challenge6 = lazy(() => import('./challenge6/Challenge6'));
const Challenge5 = lazy(() => import('./challenge5/Challenge5'));
const Challenge4 = lazy(() => import('./challenge4/Challenge4'));
const Challenge3 = lazy(() => import('./challenge3/Challenge3'));
const Challenge2 = lazy(() => import('./challenge2/Challeng2'));
const PostPage = lazy(() => import('./challenge2/PostPage'));
const CreatePost = lazy(() => import('./challenge1/CreatePost'));


const App = () => {

  return (
    <Suspense fallback={<Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress />
    </Box>}>
      <Routes>
        <Route exact path="/" element={<Challenge1 />} />
        <Route exact path="/newPost" element={<CreatePost />} />
        <Route exact path="/:id" element={<IndividualPost />} />
        <Route exact path="/postPage" element={<PostPage />} />
        <Route exact path="/challenge2" element={<Challenge2 />} />
        <Route exact path="/challenge3" element={<Challenge3 />} />
        <Route exact path="/challenge4" element={<Challenge4 />} />
        <Route exact path="/challenge5" element={<Challenge5 />} />
        <Route exact path="/challenge6" element={<Challenge6 />} />
        <Route exact path="/challenge7" element={<Challenge7 />} />
        <Route exact path="/challenge8" element={<Challenge8 />} />
        <Route exact path="/challenge9" element={<Challenge9 />} />
        <Route exact path="/challenge10" element={<Challenge10 />} />
        <Route exact path="/challenge11" element={<Challenge11 />} />
        <Route exact path="/challenge12" element={<Challenge12 />} />
        <Route exact path="/challenge13" element={<Challenge13 />} />
        <Route exact path="/challenge14" element={<Challenge14 />} />
        <Route exact path="/challenge15" element={<Challenge15 />} />
        <Route exact path="/challenge16" element={<Challenge16 />} />
        <Route exact path="/challenge17" element={<Challenge17 />} />
      </Routes>
    </Suspense>
  )
}

export default App