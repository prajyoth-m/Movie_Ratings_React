import React, { lazy, Suspense } from 'react';

const LazyMovies = lazy(() => import('./Movies'));

const Movies = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMovies {...props} />
  </Suspense>
);

export default Movies;
