// Community data types
export interface CommunityTopic {
  id: string;
  title: string;
  content: string;
  created_at: string;
  replies_count: number;
  tags?: string[];
  topic_replies?: TopicReply[];
  profiles?: UserProfile;
}

export interface TopicReply {
  id: string;
  topic_id?: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: UserProfile;
}

export interface CommunityEvent {
  id: string;
  title: string;
  event_type: string;
  event_date: string;
  event_time: string;
  is_online: boolean;
  status: string;
  attendees_count: number;
  event_attendees?: EventAttendee[];
}

export interface EventAttendee {
  id: string;
  event_id?: string;
  user_id: string;
  joined_at?: string;
}

export interface CommunityInsight {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  likes_count: number;
  views_count: number;
  cover_image?: string | null;
  read_time?: string | null;
  insight_likes?: InsightLike[];
}

export interface InsightLike {
  id: string;
  insight_id?: string;
  user_id: string;
  created_at?: string;
}

export interface UserProfile {
  user_id: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
}
