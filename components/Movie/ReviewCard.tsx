import React, { useState } from "react";
import { MovieReview } from "@/types/types";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const ReviewCard = ({ review }: { review: MovieReview }) => {
  const [showFullReview, setShowFullReview] = useState<{
    id: number[];
    limit: number;
  }>({
    id: [],
    limit: 400,
  });
  return (
    <div
      key={review.id}
      className="flex flex-col gap-6 bg-background backdrop-blur border border-primary rounded-2xl p-6"
    >
      <div className="overflow-hidden flex gap-2 items-center">
        <Image
          src={
            review.author_details.avatar_path
              ? review.author_details.avatar_path.includes("clerk")
                ? review.author_details.avatar_path
                : `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
              : "/user-icon-placeholder-1.png"
          }
          alt={review.author}
          width={20}
          height={20}
          className="rounded-full object-cover h-12 w-12"
        />
        <div className="hover:text-primary transition-all duration-200">
          <p className="font-medium">{review.author}</p>
          <p className="text-sm text-gray-500">
            {review.author_details.username}
          </p>
        </div>
        <Badge className="flex gap-2 items-center mb-auto mt-1">
          {review.author_details.rating || "??"}/10{" "}
        </Badge>
        <p className="ml-auto text-sm text-gray-500">
          {new Date(review.created_at.trim()).toLocaleDateString()}
        </p>
      </div>
      <p className="text-sm text-gray-500">
        {review.content && review.content.length < 400 ? (
          review.content
        ) : (
          <span>
            {showFullReview.id.includes(review.id)
              ? review.content
              : review.content.slice(0, 400)}
            <Button
              onClick={() =>
                showFullReview.id.includes(review.id)
                  ? setShowFullReview({
                      id: showFullReview.id.filter((id) => id !== review.id),
                      limit: 400,
                    })
                  : setShowFullReview({
                      id: [...showFullReview.id, review.id],
                      limit: review.content.length,
                    })
              }
              variant={"link"}
              className="text-primary"
            >
              {showFullReview.id.includes(review.id) ? "see less" : "see more"}
            </Button>
          </span>
        )}
      </p>
    </div>
  );
};

export default ReviewCard;
