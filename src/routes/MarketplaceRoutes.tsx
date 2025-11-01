import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingScreen } from '@/components/LoadingScreen';

const MarketplacePage = React.lazy(() => import('@/pages/MarketplacePage'));
const BrowseMarketplacePage = React.lazy(() => import('@/pages/BrowseMarketplacePage'));

export default function MarketplaceRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}> 
      <Routes>
        <Route path="/" element={<MarketplacePage />} />
        <Route path="browse" element={<BrowseMarketplacePage />} />
      </Routes>
    </Suspense>
  );
}