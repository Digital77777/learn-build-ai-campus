import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingScreen } from '@/components/LoadingScreen';

const FoundationPath = React.lazy(() => import('@/pages/course/FoundationPath'));
const TechnicalDeveloper = React.lazy(() => import('@/pages/course/TechnicalDeveloper'));
const BusinessCareers = React.lazy(() => import('@/pages/course/BusinessCareers'));

export default function CourseRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}> 
      <Routes>
        <Route path="/" element={<div className="p-6">Courses Home</div>} />
        <Route path="foundation" element={<FoundationPath />} />
        <Route path="technical-developer" element={<TechnicalDeveloper />} />
        <Route path="business-careers" element={<BusinessCareers />} />
      </Routes>
    </Suspense>
  );
}