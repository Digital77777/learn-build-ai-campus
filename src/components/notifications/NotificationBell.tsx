import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';

interface Actor {
  id: string;
  username: string;
}

interface Notification {
  id: number;
  user_id: string;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
  actors: Actor[] | null;
  metadata: Record<string, any>;
}

const renderNotificationMessage = (notification: Notification) => {
  if (!notification.is_read && notification.actors && notification.actors.length > 0) {
    const actorNames = notification.actors.map(a => a.username);
    if (actorNames.length === 1) {
      return `${actorNames[0]} liked your insight.`;
    } else if (actorNames.length === 2) {
      return `${actorNames[0]} and ${actorNames[1]} liked your insight.`;
    } else {
      return `${actorNames[0]} and ${actorNames.length - 1} others liked your insight.`;
    }
  }
  return notification.message;
};

export const NotificationBell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      const subscription = supabase
        .channel('public:notifications')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
          () => {
            fetchNotifications();
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  const fetchNotifications = async () => {
    if (user) {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) {
        console.error('Error fetching notifications:', error);
      } else {
        const notificationsWithActors = (data || []).map(n => ({
          ...n,
          actors: null,
          metadata: n.metadata as Record<string, any>
        }));
        setNotifications(notificationsWithActors);
        setUnreadCount(notificationsWithActors.filter((n: Notification) => !n.is_read).length || 0);
      }
    }
  };

  const getNavigationPath = (notification: Notification): string | null => {
    const { type, metadata } = notification;

    switch (type) {
      case 'insight_like':
      case 'insight_comment':
        if (metadata?.insight_id) {
          return `/community?insight=${metadata.insight_id}`;
        }
        break;
      case 'topic_reply':
      case 'topic_mention':
        if (metadata?.topic_id) {
          return `/community/topic/${metadata.topic_id}`;
        }
        break;
      case 'new_message':
      case 'message':
        return '/community/inbox';
      case 'event_registration':
      case 'event_update':
        if (metadata?.event_id) {
          return `/community/events?event=${metadata.event_id}`;
        }
        break;
      case 'listing_comment':
      case 'listing_purchase':
        if (metadata?.listing_id) {
          return `/marketplace?listing=${metadata.listing_id}`;
        }
        break;
      default:
        return null;
    }
    return null;
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!user) return;

    // Mark as read
    let query = supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .eq('is_read', false)
      .eq('type', notification.type);

    // For aggregated notifications, we mark all related unread notifications as read.
    if (!notification.is_read) {
        if (notification.metadata?.listing_id) {
            query = query.eq('metadata->>listing_id', notification.metadata.listing_id);
        } else if (notification.metadata?.topic_id) {
            query = query.eq('metadata->>topic_id', notification.metadata.topic_id);
        } else if (notification.metadata?.insight_id) {
            query = query.eq('metadata->>insight_id', notification.metadata.insight_id);
        } else {
            // For single notifications that were not aggregated
            query = query.eq('id', notification.id);
        }
    } else {
        // For already read notifications, we only need to match the ID
        query = query.eq('id', notification.id);
    }

    await query;
    fetchNotifications();

    // Navigate to relevant page
    const path = getNavigationPath(notification);
    if (path) {
      navigate(path);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute top-0 right-0 h-4 w-4 p-0 flex items-center justify-center text-xs" variant="destructive">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2 flex justify-between items-center">
          <div className="font-semibold">Notifications</div>
          <Link to="/notification-settings">
            <Button variant="ghost" size="icon" aria-label="Notification settings">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="p-4 text-sm text-muted-foreground text-center">No new notifications</div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem 
              key={notification.id} 
              onSelect={() => handleNotificationClick(notification)}
              className="cursor-pointer focus:outline-none"
            >
              <div className={`p-3 rounded-lg w-full transition-all duration-200 hover:scale-[0.98] active:scale-95 ${
                !notification.is_read 
                  ? 'bg-primary/10 hover:bg-primary/15 border border-primary/20' 
                  : 'hover:bg-muted/50'
              }`}>
                <div className="text-sm font-semibold capitalize">{notification.type.replace(/_/g, ' ')}</div>
                <div className="text-sm mt-1">{renderNotificationMessage(notification)}</div>
                <div className="text-xs text-muted-foreground mt-2">
                  {new Date(notification.created_at).toLocaleString()}
                </div>
                {!notification.is_read && (
                  <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
                )}
              </div>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
