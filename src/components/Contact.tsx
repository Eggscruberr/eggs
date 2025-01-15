import { useEffect, useState } from 'react';
import { Youtube } from 'lucide-react';

interface YouTubeData {
  subscriberCount: string;
  latestVideos: Array<{
    id: string;
    title: string;
    thumbnail: string;
    videoUrl: string;
  }>;
}

function Contact() {
  const [isHovered, setIsHovered] = useState(false);
  const [youtubeData, setYoutubeData] = useState<YouTubeData>({
    subscriberCount: '0',
    latestVideos: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Directly include the API key here (not recommended for production)
  const YOUTUBE_API_KEY = 'AIzaSyDaY9LBmexX9T-Iet8S74VJGB0QNqOphog'; // Replace with your actual API key

  useEffect(() => {
    const fetchYouTubeData = async () => {
      try {
        // First search for the channel by name to get the correct channelId
        const searchResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=Eggsino&key=${YOUTUBE_API_KEY}`
        );
        const searchData = await searchResponse.json();
  
        // If no channels found, throw an error
        if (!searchData.items || searchData.items.length === 0) {
          throw new Error('No channels found with the name Eggsino');
        }
  
        const channelId = 'UCcAjkb1R8nG-9QWh2FxW47w'
  
        // Fetch channel statistics using the found channelId
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`
        );
        const channelData = await channelResponse.json();
  
        if (!channelData.items || channelData.items.length === 0) {
          throw new Error('No channel data found');
        }
  
        // Fetch latest videos using the found channelId
        const videosResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=3&order=date&type=video&key=${YOUTUBE_API_KEY}`
        );
        const videosData = await videosResponse.json();
  
        if (!videosData.items || videosData.items.length === 0) {
          throw new Error('No videos found');
        }
  
        const subCount = parseInt(channelData.items[0].statistics.subscriberCount);
        const formattedSubCount = new Intl.NumberFormat('en-US', {
          notation: 'compact',
          maximumFractionDigits: 1,
        }).format(subCount);
  
        const formattedVideos = videosData.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));
  
        setYoutubeData({
          subscriberCount: formattedSubCount,
          latestVideos: formattedVideos,
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching YouTube data:', err);
        setError('Failed to load YouTube data. Please try again later.');
        setLoading(false);
      }
    };
  
    fetchYouTubeData();
  }, [YOUTUBE_API_KEY]);
  
  

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 animated-bg flex items-center justify-center">
        <div className="text-gray-100 text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 animated-bg flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 animated-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
            Join the Egg Community
          </h1>
          <p className="text-xl text-gray-300">
            Subscribe to stay updated with the latest content and deals!
          </p>
        </div>

        {/* YouTube Stats and Subscribe Button */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 mb-12 text-center relative overflow-hidden border border-gray-700">
          <div className="relative z-10">
            <Youtube className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-100 mb-2">@Eggsino</h2>
            <p className="text-gray-300 mb-4">{youtubeData.subscriberCount} Subscribers</p>
            
            <a
              href="https://www.youtube.com/@Eggsino?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className={`
                absolute inset-0 bg-gradient-to-r from-red-500 to-red-700
                rounded-lg transition-all duration-300 filter blur-lg
                ${isHovered ? 'opacity-100 scale-110' : 'opacity-70 scale-100'}
              `}></div>
              <button className={`
                relative px-8 py-3 bg-gradient-to-r from-red-600 to-red-700
                text-white font-bold
              `}>
                SUBSCRIBE
              </button>
            </a>
          </div>
        </div>

        {/* Latest Videos */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Latest Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youtubeData.latestVideos.map((video) => (
              <a
                key={video.id}
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 transition-transform hover:scale-105"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-gray-100 font-semibold line-clamp-2">{video.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Get in Touch</h2>
          <p className="text-gray-300 mb-4">
            Have questions or want to collaborate? Reach out through any of these channels:
          </p>
          <div className="space-y-4">
            <a
              href="https://www.youtube.com/@Eggsino"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-300 hover:text-red-400 transition-colors"
            >
              <Youtube className="w-6 h-6 mr-2" />
              YouTube Channel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
