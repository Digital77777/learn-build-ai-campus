import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const notificationTypes = [
  { id: 'new_reply', label: 'New replies to my topics' },
  { id: 'new_like', label: 'New likes on my insights' },
  { id: 'new_event', label: 'New events in my community' },
  { id: 'new_order', label: 'New orders for my listings' },
  { id: 'new_review', label: 'New reviews on my listings' },
  { id: 'new_message', label: 'New messages about my listings' },
  { id: 'course_completion', label: 'Course completions' },
];

const NotificationSettingsPage = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPreferences();
    }
  }, [user]);

  const fetchPreferences = async () => {
    setLoading(true);
    const { data, error } = await supabase.rpc('get_user_notification_preferences', { p_user_id: user.id });
    if (error) {
      console.error('Error fetching preferences:', error);
    } else {
      const prefs = data.reduce((acc: Record<string, boolean>, pref: { notification_type: string, is_enabled: boolean }) => {
        acc[pref.notification_type] = pref.is_enabled;
        return acc;
      }, {});
      setPreferences(prefs);
    }
    setLoading(false);
  };

  const handlePreferenceChange = (notificationType: string, isEnabled: boolean) => {
    setPreferences((prev) => ({ ...prev, [notificationType]: isEnabled }));
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    const updates = Object.entries(preferences).map(([notification_type, is_enabled]) => ({
      user_id: user.id,
      notification_type,
      is_enabled,
    }));

    const { error } = await supabase.from('user_notification_preferences').upsert(updates);
    if (error) {
      toast({
        title: 'Error saving preferences',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Preferences saved',
        description: 'Your notification settings have been updated.',
      });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between">
                <Label htmlFor={type.id}>{type.label}</Label>
                <Switch
                  id={type.id}
                  checked={preferences[type.id] ?? true}
                  onCheckedChange={(checked) => handlePreferenceChange(type.id, checked)}
                  disabled={loading}
                />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button onClick={handleSaveChanges} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettingsPage;
