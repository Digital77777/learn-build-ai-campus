import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
  sender_profile?: {
    user_id: string;
    full_name?: string;
    email?: string;
    avatar_url?: string;
  };
  receiver_profile?: {
    user_id: string;
    full_name?: string;
    email?: string;
    avatar_url?: string;
  };
}

export interface Conversation {
  user_id: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
}

export const useMessages = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get all conversations for the current user
  const useConversations = () => {
    return useQuery({
      queryKey: ['conversations'],
      queryFn: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        // Get all messages where user is sender or receiver
        const { data: messages, error } = await supabase
          .from('messages')
          .select(`
            id,
            sender_id,
            receiver_id,
            content,
            is_read,
            created_at
          `)
          .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Group messages by conversation partner
        const conversationsMap = new Map<string, Conversation>();

        for (const msg of messages || []) {
          const partnerId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
          
          if (!conversationsMap.has(partnerId)) {
            // Fetch partner profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('user_id, full_name, email, avatar_url')
              .eq('user_id', partnerId)
              .single();

            conversationsMap.set(partnerId, {
              user_id: partnerId,
              full_name: profile?.full_name,
              email: profile?.email,
              avatar_url: profile?.avatar_url,
              last_message: msg.content,
              last_message_time: msg.created_at,
              unread_count: 0,
            });
          }

          // Count unread messages from this partner
          if (msg.receiver_id === user.id && !msg.is_read) {
            const conv = conversationsMap.get(partnerId)!;
            conv.unread_count += 1;
          }
        }

        return Array.from(conversationsMap.values());
      },
    });
  };

  // Get messages for a specific conversation
  const useConversationMessages = (partnerId?: string) => {
    return useQuery({
      queryKey: ['messages', partnerId],
      queryFn: async () => {
        if (!partnerId) return [];

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data, error } = await supabase
          .from('messages')
          .select(`
            id,
            sender_id,
            receiver_id,
            content,
            is_read,
            created_at
          `)
          .or(`and(sender_id.eq.${user.id},receiver_id.eq.${partnerId}),and(sender_id.eq.${partnerId},receiver_id.eq.${user.id})`)
          .order('created_at', { ascending: true });

        if (error) throw error;

        // Mark messages as read
        const unreadIds = data?.filter(m => m.receiver_id === user.id && !m.is_read).map(m => m.id) || [];
        if (unreadIds.length > 0) {
          await supabase
            .from('messages')
            .update({ is_read: true })
            .in('id', unreadIds);
        }

        return data || [];
      },
      enabled: !!partnerId,
    });
  };

  // Send a message
  const sendMessage = useMutation({
    mutationFn: async ({ receiverId, content }: { receiverId: string; content: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('messages').insert({
        sender_id: user.id,
        receiver_id: receiverId,
        content,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive',
      });
    },
  });

  return {
    useConversations,
    useConversationMessages,
    sendMessage,
  };
};
