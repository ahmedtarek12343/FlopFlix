import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Link as LinkIcon,
  Clapperboard,
} from "lucide-react";
import Link from "next/link";

interface ActorSocialsProps {
  externalIds: {
    imdb_id: string | null;
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
    tiktok_id: string | null;
    youtube_id: string | null;
  };
  homepage?: string | null;
}

export const ActorSocials = ({ externalIds, homepage }: ActorSocialsProps) => {
  const socials = [
    {
      id: externalIds.imdb_id,
      icon: Clapperboard,
      url: (id: string) => `https://www.imdb.com/name/${id}`,
      label: "IMDb",
    },
    {
      id: externalIds.instagram_id,
      icon: Instagram,
      url: (id: string) => `https://instagram.com/${id}`,
      label: "Instagram",
    },
    {
      id: externalIds.twitter_id,
      icon: Twitter,
      url: (id: string) => `https://twitter.com/${id}`,
      label: "Twitter",
    },
    {
      id: externalIds.facebook_id,
      icon: Facebook,
      url: (id: string) => `https://facebook.com/${id}`,
      label: "Facebook",
    },
    {
      id: externalIds.youtube_id,
      icon: Youtube,
      url: (id: string) => `https://youtube.com/${id}`,
      label: "YouTube",
    },
  ];

  return (
    <div className="flex items-center gap-4 mt-6">
      {socials.map(
        (social) =>
          social.id && (
            <Link
              key={social.label}
              href={social.url(social.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-200"
              title={social.label}
            >
              <social.icon size={24} />
            </Link>
          )
      )}
      {homepage && (
        <Link
          href={homepage}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-200"
          title="Homepage"
        >
          <LinkIcon size={24} />
        </Link>
      )}
    </div>
  );
};
