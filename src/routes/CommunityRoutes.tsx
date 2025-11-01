import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingScreen } from '@/components/LoadingScreen';

const CommunityPage = React.lazy(() => import('@/pages/CommunityPage'));
const FindMembersPage = React.lazy(() => import('@/pages/community/FindMembersPage'));
const InboxPage = React.lazy(() => import('@/pages/community/InboxPage'));

export default function CommunityRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}> 
      <Routes>
        <Route path="/" element={<CommunityPage />} />
        <Route path="find" element={<FindMembersPage />} />
        <Route path="inbox" element={<InboxPage />} />
      </Routes>
    </Suspense>
  );
}