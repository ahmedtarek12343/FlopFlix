"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActorBioProps {
  biography: string;
}

export const ActorBio = ({ biography }: ActorBioProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = biography.length > 500;

  if (!biography) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-2xl font-semibold text-white">Biography</h3>
      <div className="relative">
        <p
          className={cn(
            "text-gray-300 leading-relaxed whitespace-pre-line text-lg",
            !isExpanded && shouldTruncate && "line-clamp-6"
          )}
        >
          {biography}
        </p>

        {!isExpanded && shouldTruncate && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent" />
        )}
      </div>

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
        >
          {isExpanded ? (
            <>
              Read Less <ChevronUp size={16} />
            </>
          ) : (
            <>
              Read More <ChevronDown size={16} />
            </>
          )}
        </button>
      )}
    </div>
  );
};
