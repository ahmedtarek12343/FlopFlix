"use client";
import { useState } from "react";
import Image from "next/image";
import { useGetHistory } from "@/hooks/useGetHistory";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner";
import ErrorFallback from "../ErrorFallback";

const AnalyticsComp = () => {
  const { data: history, isPending, isError, refetch } = useGetHistory();

  const [activeTab, setActiveTab] = useState("movies");

  if (isPending) return <LoadingSpinner />;

  if (isError) return <ErrorFallback refetch={refetch} />;

  // Filter by type
  const movieHistory =
    history?.filter((item: any) => item.type === "Movie") || [];
  const tvHistory = history?.filter((item: any) => item.type === "TV") || [];

  const getGenreData = (list: any[]) => {
    const genreCounts: Record<string, number> = {};
    list.forEach((item: any) => {
      item.genres?.forEach((genre: string) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });
    return Object.entries(genreCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  };
  const movieGenreData = getGenreData(movieHistory);
  const tvGenreData = getGenreData(tvHistory);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
        Analytics Dashboard
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex">
          <TabsTrigger value="movies" className="flex-1">
            Movies
          </TabsTrigger>
          <TabsTrigger value="tv" className="flex-1">
            TV Shows
          </TabsTrigger>
        </TabsList>

        {/* ----- Movies Tab ----- */}
        <TabsContent value="movies">
          <GenreSection title="Top Movie Genres" data={movieGenreData} />
        </TabsContent>

        {/* ----- TV Tab ----- */}
        <TabsContent value="tv">
          <GenreSection title="Top TV Show Genres" data={tvGenreData} />
        </TabsContent>
      </Tabs>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
        Latest Searches
      </h2>
      {history?.slice(0, 3)?.map((item: any) => (
        <div
          key={item.id}
          className="flex justify-between items-center p-4 bg-card border rounded-2xl"
        >
          <div className="flex items-center gap-2 ">
            <Image
              src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
              alt={item.title || ""}
              width={150}
              height={150}
              className="rounded-md"
            />
            <div>
              <h2>{item.title}</h2>
              <p>{item.type}</p>
            </div>
          </div>
          <p>{item.release_date}</p>
        </div>
      ))}
      {history && history?.length > 3 && (
        <p className="text-center text-muted-foreground cursor-pointer hover:text-primary hover:underline transition">
          <Link href="/history">View more</Link>
        </p>
      )}
    </div>
  );
};

export default AnalyticsComp;

// Reusable Genre Chart Section
const GenreSection = ({ title, data }: { title: string; data: any[] }) => (
  <div className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border shadow-sm mt-6">
    <h2 className="text-xl font-semibold mb-6">{title}</h2>

    <div className="h-[300px] w-full">
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
            <YAxis
              dataKey="name"
              type="category"
              width={100}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <Tooltip contentStyle={{ backgroundColor: "var(--background)" }} />
            <Bar
              dataKey="value"
              fill="var(--primary)"
              radius={[0, 4, 4, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-full flex items-center justify-center text-muted-foreground">
          No genre data available
        </div>
      )}
    </div>
  </div>
);
