import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Send, Search, MoreVertical, Check, X, Mic, StopCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMessages } from '@/hooks/useMessages';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useConnections } from '@/hooks/useConnections';
import { Separator } from '@/components/ui/separator';
import VoiceNotePlayer from '@/components/media/VoiceNotePlayer';

const InboxPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [messageText, setMessageText] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(
    searchParams.get('userId') || undefined
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { useConversations, useConversationMessages, sendMessage } = useMessages();
  const { data: conversations, isLoading: conversationsLoading } = useConversations();
  const { data: messages, isLoading: messagesLoading } = useConversationMessages(selectedUserId);
  
  const { usePendingRequests, acceptConnectionRequest, ignoreConnectionRequest } = useConnections();
  const { data: pendingRequests = [] } = usePendingRequests();

  const selectedConversation = conversations?.find((c) => c.user_id === selectedUserId);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update URL when conversation is selected
  useEffect(() => {
    if (selectedUserId) {
      setSearchParams({ userId: selectedUserId });
    } else {
      setSearchParams({});
    }
  }, [selectedUserId, setSearchParams]);

  const handleToggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorderRef.current?.stop();
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      setIsRecording(false);
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const audioChunks: BlobPart[] = [];
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType });
          setAudioBlob(audioBlob);
          // Stop all audio tracks to release the microphone
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
        setRecordingTime(0);
        recordingIntervalRef.current = setInterval(() => {
          setRecordingTime((prevTime) => prevTime + 1);
        }, 1000);
      } catch (error) {
        console.error('Error accessing microphone:', error);
        toast({
          title: 'Microphone access denied',
          description: 'Please allow microphone access in your browser settings.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleCancelRecording = () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
    setIsRecording(false);
    setAudioBlob(null);
    setRecordingTime(0);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) return;

    if (audioBlob) {
        const fileExtension = audioBlob.type.split('/')[1];
        await sendMessage.mutateAsync({
            receiverId: selectedUserId,
            voiceNote: new File([audioBlob], `voice-note.${fileExtension}`),
        });
        setAudioBlob(null);
    } else if (messageText.trim()) {
        if (messageText.trim().length > 2000) {
            toast({
              title: 'Message too long',
              description: 'Message must be less than 2000 characters',
              variant: 'destructive',
            });
            return;
        }
        await sendMessage.mutateAsync({
            receiverId: selectedUserId,
            content: messageText.trim(),
        });
        setMessageText('');
    }
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const filteredConversations = conversations?.filter((conv) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      conv.full_name?.toLowerCase().includes(searchLower) ||
      conv.email?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden border-b border-border bg-card p-4 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/community')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Messages</h1>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div
          className={`${
            selectedUserId ? 'hidden md:flex' : 'flex'
          } flex-col w-full md:w-80 lg:w-96 border-r border-border bg-card`}
        >
          {/* Desktop Header */}
          <div className="hidden md:flex items-center gap-3 p-4 border-b border-border">
            <Button variant="ghost" size="icon" onClick={() => navigate('/community')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Messages</h1>
          </div>

          {/* Search */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* Connection Requests */}
          {pendingRequests.length > 0 && (
            <div className="p-3 bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">Connection Requests</p>
                <Badge variant="secondary" className="text-xs">
                  {pendingRequests.length}
                </Badge>
              </div>
              <ScrollArea className="max-h-60">
                <div className="space-y-2">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-2 rounded-lg bg-card border border-border space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {getInitials(request.requester?.full_name, request.requester?.email)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {request.requester?.full_name || request.requester?.email || 'Unknown User'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            wants to connect
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90"
                          onClick={() => acceptConnectionRequest.mutate(request.id)}
                          disabled={acceptConnectionRequest.isPending}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 h-8 text-xs"
                          onClick={() => ignoreConnectionRequest.mutate(request.id)}
                          disabled={ignoreConnectionRequest.isPending}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Ignore
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Separator className="mt-3" />
            </div>
          )}

          {/* Conversations */}
          <ScrollArea className="flex-1">
            {conversationsLoading ? (
              <div className="p-3 space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredConversations && filteredConversations.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredConversations.map((conv) => (
                  <button
                    key={conv.user_id}
                    onClick={() => setSelectedUserId(conv.user_id)}
                    className={`w-full flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors ${
                      selectedUserId === conv.user_id ? 'bg-accent' : ''
                    }`}
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={conv.avatar_url} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(conv.full_name, conv.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <p 
                          className="font-semibold text-sm truncate hover:text-primary cursor-pointer transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${conv.user_id}`);
                          }}
                        >
                          {conv.full_name || conv.email || 'Unknown User'}
                        </p>
                        {conv.last_message_time && (
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(conv.last_message_time), {
                              addSuffix: false,
                            })}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-muted-foreground truncate">
                          {conv.last_message || 'No messages yet'}
                        </p>
                        {conv.unread_count > 0 && (
                          <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0 h-5 min-w-5 rounded-full">
                            {conv.unread_count}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <p className="text-muted-foreground mb-2">No conversations yet</p>
                <p className="text-sm text-muted-foreground">
                  Start a conversation with community members!
                </p>
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        {selectedUserId ? (
          <div className="flex-1 flex flex-col bg-background">
            {/* Chat Header */}
            <div className="flex items-center gap-3 p-4 border-b border-border bg-card">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSelectedUserId(undefined)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar className="w-10 h-10">
                <AvatarImage src={selectedConversation?.avatar_url} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(selectedConversation?.full_name, selectedConversation?.email)}
                </AvatarFallback>
              </Avatar>
              <div 
                className="flex-1 min-w-0 cursor-pointer hover:text-primary transition-colors"
                onClick={() => navigate(`/profile/${selectedUserId}`)}
              >
                <p className="font-semibold text-sm truncate">
                  {selectedConversation?.full_name ||
                    selectedConversation?.email ||
                    'Unknown User'}
                </p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              {messagesLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : ''}`}>
                      <Skeleton className="h-16 w-64 rounded-lg" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {messages?.map((msg) => {
                    const isSender = msg.sender_id === user?.id;
                    return (
                      <div key={msg.id} className={`flex ${isSender ? 'justify-end' : ''}`}>
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            isSender
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          {msg.voice_note_url ? (
                            <VoiceNotePlayer audioUrl={msg.voice_note_url} />
                          ) : (
                            <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                          )}
                          <p
                            className={`text-xs mt-1 ${
                              isSender ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}
                          >
                            {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </ScrollArea>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border bg-card">
              <div className="space-y-2">
                {isRecording || audioBlob ? (
                  <div className="flex items-center gap-2">
                    {isRecording && (
                      <div className="flex items-center gap-2 text-sm text-destructive animate-pulse">
                        <StopCircle className="h-5 w-5" />
                        <span>{new Date(recordingTime * 1000).toISOString().substr(14, 5)}</span>
                      </div>
                    )}
                    {audioBlob && !isRecording && (
                        <div className="flex items-center gap-2 w-full">
                            <VoiceNotePlayer audioUrl={URL.createObjectURL(audioBlob)} />
                        </div>
                    )}
                    <div className="flex items-center gap-2 ml-auto">
                        <Button type="button" variant="ghost" size="icon" onClick={handleCancelRecording} className="text-muted-foreground">
                            <Trash2 className="h-5 w-5" />
                        </Button>
                        <Button type="submit" size="icon">
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1"
                      maxLength={2000}
                    />
                    <Button type="button" size="icon" variant="ghost" onClick={handleToggleRecording}>
                      <Mic className="h-5 w-5" />
                    </Button>
                    <Button type="submit" size="icon" disabled={!messageText.trim()}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                )}
                {!isRecording && !audioBlob && (
                    <div className="flex justify-end">
                        <span className={`text-xs ${messageText.length > 1900 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {messageText.length}/2000
                        </span>
                    </div>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-background">
            <div className="text-center">
              <p className="text-lg font-semibold mb-2">Select a conversation</p>
              <p className="text-muted-foreground">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;
