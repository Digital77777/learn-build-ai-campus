import { Card, CardContent } from "@/components/ui/card";

interface VideoPlayerProps {
  videoId: string;
  title: string;
}

const VideoPlayer = ({ videoId, title }: VideoPlayerProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-0">
        <div className="aspect-video relative bg-black rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&controls=1`}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              border: 'none',
              outline: 'none'
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;