// Sample media data for marketplace listings
export const sampleImages = {
  tech: [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&auto=format&fit=crop'
  ],
  ai: [
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&auto=format&fit=crop'
  ]
};

export const sampleVideos = [
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
];

export const addSampleMediaToListing = (listing: Record<string, unknown>) => {
  const images = Array.isArray(listing.images) && listing.images.length > 0 ? listing.images : sampleImages.tech;
  const videos = Array.isArray(listing.videos) && listing.videos.length > 0 ? listing.videos : [sampleVideos[0]];
  
  return {
    ...listing,
    images,
    videos
  };
};