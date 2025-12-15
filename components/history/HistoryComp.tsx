"use client";
import { useGetHistory } from "@/hooks/useGetHistory";
import HistoryCard from "./HistoryCard";
import { motion } from "framer-motion";
import LoadingSpinner from "../LoadingSpinner";
import ErrorFallback from "../ErrorFallback";
const HistoryComp = () => {
  const { data, isPending, isError, refetch } = useGetHistory();

  const history = data || [];

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorFallback refetch={refetch} />;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Watch History</h1>
      {history.length === 0 ? (
        <div className="text-center text-muted-foreground py-20">
          <p>You haven't watched anything yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <HistoryCard item={item} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryComp;
