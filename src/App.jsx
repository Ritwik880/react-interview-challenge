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
const Challenge22 = lazy(() => import('./challenge22/Challenge22'));
const OptimiseChallenge21 = lazy(() => import('./challenge21/OptimiseChallenge21'));
const Challenge21 = lazy(() => import('./challenge21/Challenge21'));
const OptimiseChallenge20 = lazy(() => import('./challenge20/OptimiseChallenge20'));
const Challenge20 = lazy(() => import('./challenge20/Challenge20'));
const Challenge19 = lazy(() => import('./challenge19/Challenge19'));
const Challenge18 = lazy(() => import('./challenge18/Challenge18'));
const OptimiseChallenge18 = lazy(() => import('./challenge18/OptimiseChallenge18'));
const OptimiseChallenge17 = lazy(() => import('./challenge17/OptimiseChallenge17'));
const Challenge17 = lazy(() => import('./challenge17/Challenge17'));
const Challenge16 = lazy(() => import('./challenge16/Challenge16'));
const Challenge15 = lazy(() => import('./challenge15/Challenge15'));
const OptimiseChallenge14 = lazy(() => import('./challenge14/OptimiseChallenge14'));
const Challenge14 = lazy(() => import('./challenge14/Challenge14'));
const Challenge13 = lazy(() => import('./challenge13/Challenge13'));
const OptimiseChallenge12 = lazy(() => import('./challenge12/OptimiseChallenge12'));
const Challenge12 = lazy(() => import('./challenge12/Challenge12'));
const Challenge11 = lazy(() => import('./challenge11/Challenge11'));
const OptimiseChallenge10 = lazy(() => import('./challenge10/OptimiseChallenge10'));
const Challenge10 = lazy(() => import('./challenge10/Challenge10'));
const Challenge9 = lazy(() => import('./challenge9/Challenge9'));
const Challenge8 = lazy(() => import('./challenge8/Challenge8'));
const Challenge7 = lazy(() => import('./challenge7/Challenge7'));
const OptimiseChallenge6 = lazy(() => import('./challenge6/OptimiseChallenge6'));
const Challenge6 = lazy(() => import('./challenge6/Challenge6'));
const Challenge5 = lazy(() => import('./challenge5/Challenge5'));
const Challenge4 = lazy(() => import('./challenge4/Challenge4'));
const Challenge3 = lazy(() => import('./challenge3/Challenge3'));
const Challenge2 = lazy(() => import('./challenge2/Challenge2'));
const PostPage = lazy(() => import('./challenge2/PostPage'));
const CreatePost = lazy(() => import('./challenge1/CreatePost'));
const NotFound = lazy(()=> import('./NotFound'));


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
        <Route path="/" element={<Challenge1 />} />
        <Route path="/newPost" element={<CreatePost />} />
        <Route path="/:id" element={<IndividualPost />} />
        <Route path="/postPage" element={<PostPage />} />
        <Route path="/challenge2" element={<Challenge2 />} />
        <Route path="/challenge3" element={<Challenge3 />} />
        <Route path="/challenge4" element={<Challenge4 />} />
        <Route path="/challenge5" element={<Challenge5 />} />
        <Route path="/challenge6" element={<Challenge6 />} />
        <Route path="/optimiseChallenge6" element={<OptimiseChallenge6 />} />
        <Route path="/challenge7" element={<Challenge7 />} />
        <Route path="/challenge8" element={<Challenge8 />} />
        <Route path="/challenge9" element={<Challenge9 />} />
        <Route path="/challenge10" element={<Challenge10 />} />
        <Route path="/optimiseChallenge10" element={<OptimiseChallenge10 />} />
        <Route path="/challenge11" element={<Challenge11 />} />
        <Route path="/challenge12" element={<Challenge12 />} />
        <Route path="/optimiseChallenge12" element={<OptimiseChallenge12 />} />
        <Route path="/challenge13" element={<Challenge13 />} />
        <Route path="/challenge14" element={<Challenge14 />} />
        <Route path="/optimiseChallenge14" element={<OptimiseChallenge14 />} />
        <Route path="/challenge15" element={<Challenge15 />} />
        <Route path="/challenge16" element={<Challenge16 />} />
        <Route path="/challenge17" element={<Challenge17 />} />
        <Route path="/optimiseChallenge17" element={<OptimiseChallenge17 />} />
        <Route path="/challenge18" element={<Challenge18 />} />
        <Route path="/optimiseChallenge18" element={<OptimiseChallenge18 />} />
        <Route path="/challenge19" element={<Challenge19 />} />
        <Route path="/challenge20" element={<Challenge20 />} />
        <Route path="/optimiseChallenge20" element={<OptimiseChallenge20 />} />
        <Route path="/challenge21" element={<Challenge21 />} />
        <Route path="/optimiseChallenge21" element={<OptimiseChallenge21 />} />
        <Route path="/challenge22" element={<Challenge22 />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  )
}

export default App