"use client";
import { useGetHistory } from "@/hooks/useGetHistory";
import HistoryCard from "./HistoryCard";
import { Loader2Icon } from "lucide-react";
const HistoryComp = () => {
  const { data, isPending } = useGetHistory();

  const history = data || [];

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2Icon className="size-16 animate-spin text-primary mb-4" />
        <p className="text-xl text-white/80">Loading History...</p>
      </div>
    );
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
          {history.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryComp;
