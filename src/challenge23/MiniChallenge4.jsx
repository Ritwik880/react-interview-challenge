import React from 'react';
import ThemedButton from './MiniChallenge3';
import { useTheme } from '../context/ThemeContext';

function MiniChallenge4() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <h1>Themed App</h1>
      <ThemedButton />
    </div>
  );
}

export default MiniChallenge4 ;
