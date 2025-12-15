import { MovieReview, MovieType, TvWithExtras } from "@/types/types";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import MovieAddReview from "./MovieAddReview";
import ReviewCard from "./ReviewCard";
import { useGetReviews } from "@/hooks/useGetReviews";
import { useFiltersStore } from "@/store/filters.store";
import { motion } from "framer-motion";

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
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6"
        >
          Reviews
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fullMovie?.reviews?.results.length === 0 && (
            <p className="pl-5 font-semibold">No reviews found</p>
          )}
          {fullMovie?.reviews &&
            fullMovie?.reviews.results
              .slice(0, 3)
              .map((review: MovieReview, index: number) => (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={review.id}
                >
                  <ReviewCard review={review} />
                </motion.div>
              ))}
          {DBreviews &&
            DBreviews.map((review: any, index: number) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={review.id}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-7"
        >
          <Button onClick={() => setShowReviewModal(true)}>
            <Plus />
            Add Review
          </Button>
        </motion.div>
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
