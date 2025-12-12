import { MovieReview, MovieType, TvWithExtras } from "@/types/types";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import MovieAddReview from "./MovieAddReview";
import ReviewCard from "./ReviewCard";
import { useGetReviews } from "@/hooks/useGetReviews";
import { useFiltersStore } from "@/store/filters.store";

const ReviewSection = ({
  fullMovie,
}: {
  fullMovie: MovieType | TvWithExtras;
}) => {
  const { filters } = useFiltersStore();
  const { data: DBreviews } = useGetReviews(fullMovie.id, filters.type);
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <div>
      {/* Some Reviews */}
      <section className="py-10">
        <h2 className="text-3xl font-bold mb-6">Reviews</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(600px,1fr))] gap-8">
          {fullMovie?.reviews?.results.length === 0 && (
            <p className="pl-5 font-semibold">No reviews found</p>
          )}
          {fullMovie?.reviews &&
            fullMovie?.reviews.results
              .slice(0, 3)
              .map((review: MovieReview) => (
                <ReviewCard review={review} key={review.id} />
              ))}
          {DBreviews &&
            DBreviews.map((review: any) => (
              <ReviewCard review={review} key={review.id} />
            ))}
        </div>
        <Button onClick={() => setShowReviewModal(true)} className="mt-7">
          <Plus />
          Add Review
        </Button>
      </section>
      <MovieAddReview
        open={showReviewModal}
        onOpenChange={setShowReviewModal}
        movieId={fullMovie.id}
      />
    </div>
  );
};

export default ReviewSection;
