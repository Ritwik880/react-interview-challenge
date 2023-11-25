import React, { useEffect, useRef } from 'react';

const RenderTimeHOC = (WrappedComponent) => {
  return (props) => {
    const startTimeRef = useRef(performance.now());

    useEffect(() => {
      return () => {
        logRenderTime();
      };
    }, []);

    const logRenderTime = () => {
      const endTime = performance.now();
      const renderTime = endTime - startTimeRef.current;
      console.log(`Component "${WrappedComponent.name}" took ${renderTime.toFixed(4)} milliseconds to render.`);
    };

    return <WrappedComponent {...props} />;
  };
};

export default RenderTimeHOC;
