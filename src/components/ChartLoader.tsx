import React, { Suspense } from 'react';
import useVisibility from '../hooks/useVisibility';

const ChartLoader = React.lazy(() => import('recharts'));

const LazyChart = (props) => {
  const isVisible = useVisibility();

  return (
    <>  
      {isVisible && (
        <Suspense fallback={<div>Loading...</div>}>
          <ChartLoader {...props} />
        </Suspense>
      )}
    </>
  );
};

export default LazyChart;