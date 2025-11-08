import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

type NotificationPreference = {
  notification_type: string;
  is_enabled: boolean;
};

const NOTIFICATION_TYPES = [
  { id: 'new_order', label: 'New Orders' },
  { id: 'new_review', label: 'New Reviews' },
  { id: 'new_message', label: 'New Messages' },
  { id: 'new_reply', label: 'New Replies to your Topics' },
  { id: 'new_like', label: 'New Likes on your Insights' },
  { id: 'new_event', label: 'New Community Events' },
];

const NotificationSettingsPage = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPreference[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPreferences();
    }
  }, [user]);

  const fetchPreferences = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('user_notification_preferences')
      .select('notification_type, is_enabled')
      .eq('user_id', user.id);

    if (error) {
      toast.error('Failed to fetch notification preferences.');
      console.error('Error fetching preferences:', error);
    } else {
      setPreferences(data);
    }
    setLoading(false);
  };

  const handlePreferenceChange = async (type: string, is_enabled: boolean) => {
    if (!user) return;

    setLoading(true);
    const { error } = await supabase
      .from('user_notification_preferences')
      .upsert({ user_id: user.id, notification_type: type, is_enabled }, { onConflict: 'user_id, notification_type' });

    if (error) {
      toast.error(`Failed to update preference for ${type}.`);
      console.error('Error updating preference:', error);
    } else {
      toast.success(`Notification preference for ${type} updated successfully.`);
      setPreferences((prev) => {
        const existingPref = prev.find((p) => p.notification_type === type);
        if (existingPref) {
          return prev.map((p) =>
            p.notification_type === type ? { ...p, is_enabled } : p
          );
        } else {
          return [...prev, { notification_type: type, is_enabled }];
        }
      });
    }
    setLoading(false);
  };

  const getPreferenceValue = (type: string) => {
    const preference = preferences.find((p) => p.notification_type === type);
    return preference ? preference.is_enabled : true; // Default to true if not set
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {NOTIFICATION_TYPES.map(({ id, label }) => (
            <div key={id} className="flex items-center justify-between">
              <Label htmlFor={`notification-${id}`}>{label}</Label>
              <Switch
                id={`notification-${id}`}
                checked={getPreferenceValue(id)}
                onCheckedChange={(checked) => handlePreferenceChange(id, checked)}
                disabled={loading}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettingsPage;
