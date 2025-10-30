import type { CommunityTopic, CommunityInsight } from "@/types/community";

interface UserPreferences {
  categories: Record<string, number>; // category -> interaction count
  tags: Record<string, number>; // tag -> interaction count
  lastInteractions: string[]; // recent content IDs to avoid repetition
}

// Get user preferences from localStorage
const getUserPreferences = (): UserPreferences => {
  const stored = localStorage.getItem("community_preferences");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return { categories: {}, tags: {}, lastInteractions: [] };
    }
  }
  return { categories: {}, tags: {}, lastInteractions: [] };
};

// Save user preferences to localStorage
export const saveUserPreferences = (preferences: UserPreferences) => {
  localStorage.setItem("community_preferences", JSON.stringify(preferences));
};

// Track user interaction (view, like, reply)
export const trackInteraction = (
  contentId: string,
  category?: string,
  tags?: string[]
) => {
  const prefs = getUserPreferences();
  
  // Track category preference
  if (category) {
    prefs.categories[category] = (prefs.categories[category] || 0) + 1;
  }
  
  // Track tag preferences
  if (tags) {
    tags.forEach(tag => {
      prefs.tags[tag] = (prefs.tags[tag] || 0) + 1;
    });
  }
  
  // Add to recent interactions (keep last 50)
  prefs.lastInteractions = [contentId, ...prefs.lastInteractions].slice(0, 50);
  
  saveUserPreferences(prefs);
};

// Calculate time decay factor (newer content gets higher score)
const calculateTimeFactor = (createdAt: string): number => {
  const now = Date.now();
  const created = new Date(createdAt).getTime();
  const hoursSinceCreation = (now - created) / (1000 * 60 * 60);
  
  // Exponential decay: content loses relevance over time
  // Fresh content (< 1 hour): 1.0
  // 6 hours old: ~0.5
  // 24 hours old: ~0.2
  // 7 days old: ~0.01
  return Math.exp(-hoursSinceCreation / 12);
};

// Calculate engagement rate score
const calculateEngagementScore = (
  likes: number,
  replies: number,
  views: number
): number => {
  // Avoid division by zero
  const totalViews = Math.max(views, 1);
  
  // Engagement rate: (likes + replies * 2) / views
  // Replies are worth more as they indicate deeper engagement
  const engagementRate = (likes + replies * 2) / totalViews;
  
  // Normalize to 0-1 range with logarithmic scale
  return Math.min(1, Math.log10(engagementRate * 100 + 1) / 2);
};

// Calculate user preference score
const calculatePreferenceScore = (
  category?: string,
  tags?: string[]
): number => {
  const prefs = getUserPreferences();
  let score = 0;
  let totalPrefs = 0;
  
  // Check category match
  if (category && prefs.categories[category]) {
    score += prefs.categories[category];
    totalPrefs += prefs.categories[category];
  }
  
  // Check tag matches
  if (tags) {
    tags.forEach(tag => {
      if (prefs.tags[tag]) {
        score += prefs.tags[tag];
        totalPrefs += prefs.tags[tag];
      }
    });
  }
  
  // Normalize: if no preferences exist, return neutral score
  if (totalPrefs === 0) return 0.5;
  
  // Return normalized score (0-1 range)
  return Math.min(1, score / (totalPrefs * 2));
};

// Calculate diversity penalty (reduce score if recently seen)
const calculateDiversityScore = (contentId: string): number => {
  const prefs = getUserPreferences();
  const recentIndex = prefs.lastInteractions.indexOf(contentId);
  
  // Not recently seen: full score
  if (recentIndex === -1) return 1.0;
  
  // Apply penalty based on how recently it was seen
  // More recent = higher penalty
  return Math.max(0.1, 1 - (recentIndex / 50));
};

// Calculate trending coefficient
const calculateTrendingScore = (
  likes: number,
  replies: number,
  createdAt: string
): number => {
  const hoursSinceCreation = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
  
  // Avoid very old content from trending
  if (hoursSinceCreation > 72) return 0;
  
  // Trending = (likes + replies * 2) / hours^1.5
  // This favors content with high engagement in short time
  const trendingScore = (likes + replies * 2) / Math.pow(hoursSinceCreation + 1, 1.5);
  
  return Math.min(1, Math.log10(trendingScore + 1) / 2);
};

// Main scoring function for topics
export const scoreTopics = (topics: CommunityTopic[]): CommunityTopic[] => {
  const scoredTopics = topics.map(topic => {
    const timeFactor = calculateTimeFactor(topic.created_at);
    const engagementScore = calculateEngagementScore(
      0, // topics don't have likes
      topic.replies_count || 0,
      topic.views || 1
    );
    const preferenceScore = calculatePreferenceScore(undefined, topic.tags);
    const diversityScore = calculateDiversityScore(topic.id);
    const trendingScore = calculateTrendingScore(
      0,
      topic.replies_count || 0,
      topic.created_at
    );
    
    // Weighted average of all factors
    const finalScore = (
      timeFactor * 0.25 +
      engagementScore * 0.25 +
      preferenceScore * 0.20 +
      diversityScore * 0.15 +
      trendingScore * 0.15
    );
    
    return { ...topic, recommendationScore: finalScore };
  });
  
  // Sort by score descending
  return scoredTopics.sort((a, b) => 
    (b.recommendationScore || 0) - (a.recommendationScore || 0)
  );
};

// Main scoring function for insights
export const scoreInsights = (insights: CommunityInsight[]): CommunityInsight[] => {
  const scoredInsights = insights.map(insight => {
    const timeFactor = calculateTimeFactor(insight.created_at);
    const engagementScore = calculateEngagementScore(
      insight.likes_count || 0,
      0, // insights don't have replies
      insight.views_count || 1
    );
    const preferenceScore = calculatePreferenceScore(insight.category, undefined);
    const diversityScore = calculateDiversityScore(insight.id);
    const trendingScore = calculateTrendingScore(
      insight.likes_count || 0,
      0,
      insight.created_at
    );
    
    // Weighted average of all factors
    const finalScore = (
      timeFactor * 0.25 +
      engagementScore * 0.25 +
      preferenceScore * 0.20 +
      diversityScore * 0.15 +
      trendingScore * 0.15
    );
    
    return { ...insight, recommendationScore: finalScore };
  });
  
  // Sort by score descending
  return scoredInsights.sort((a, b) => 
    (b.recommendationScore || 0) - (a.recommendationScore || 0)
  );
};

// Update views when user views content
export const trackContentView = async (
  contentId: string,
  contentType: 'topic' | 'insight',
  category?: string,
  tags?: string[]
) => {
  // Track in user preferences
  trackInteraction(contentId, category, tags);
  
  // You can also update view count in database here if needed
  // This would require a database call to increment the view count
};
