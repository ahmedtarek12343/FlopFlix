import React from "react";
import Link from "next/link";
import { Actor, MovieType } from "@/types/types";
import { DollarSign, Award, Film, Globe } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

const MovieCast = ({ fullMovie }: { fullMovie: MovieType }) => {
  const [initialCast, setInitialCast] = React.useState(5);
  return (
    <div>
      {" "}
      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Cast & Crew */}
        {fullMovie?.belongs_to_collection && (
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              ease: "easeInOut",
            }}
          >
            this movie is part of the collection
            <Button
              variant="link"
              className="font-bold text-primary cursor-pointer"
              asChild
            >
              <Link
                href={`/collection/${fullMovie?.belongs_to_collection?.id}`}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-primary"
                >
                  {fullMovie?.belongs_to_collection?.name}
                </motion.span>
              </Link>
            </Button>
          </motion.p>
        )}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fullMovie?.Director && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                ease: "easeInOut",
              }}
              className="bg-background backdrop-blur border border-primary rounded-2xl p-6"
            >
              <p className="text-gray-400 text-sm font-medium">Director</p>
              <p className="text-lg mt-1">
                {fullMovie?.Director.split(",").map(
                  (director: string, index: number) => (
                    <Link
                      key={director}
                      href={`https://en.wikipedia.org/wiki/${director}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {director}
                      {index < fullMovie?.Director.split(",").length - 1 && (
                        <span className="text-gray-400">, </span>
                      )}
                    </Link>
                  )
                )}
              </p>
            </motion.div>
          )}
          {fullMovie?.Writer && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                ease: "easeInOut",
              }}
              className="bg-background backdrop-blur border border-primary rounded-2xl p-6"
            >
              <p className="text-gray-400 text-sm font-medium">Writer</p>
              <p className="text-lg mt-1">
                {fullMovie?.Writer !== "N/A"
                  ? fullMovie?.Writer.split(",").map(
                      (writer: string, index: number) => (
                        <Link
                          key={writer}
                          href={`https://en.wikipedia.org/wiki/${writer}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {writer.trim()}
                          {index < fullMovie?.Writer.split(",").length - 1 && (
                            <span className="text-gray-400">, </span>
                          )}
                        </Link>
                      )
                    )
                  : "N/A"}
              </p>
            </motion.div>
          )}
        </section>
        {/* Financials & Awards */}
        <section className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              ease: "easeInOut",
            }}
            className="bg-background backdrop-blur border border-primary rounded-2xl p-6 text-center"
          >
            <DollarSign className="size-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-gray-400">Budget</p>
            <p className="text-2xl font-bold">
              {fullMovie?.budget
                ? `$${fullMovie?.budget.toLocaleString()}`
                : "N/A"}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              ease: "easeInOut",
            }}
            className="bg-background backdrop-blur border border-primary rounded-2xl p-6 text-center"
          >
            <DollarSign className="size-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-gray-400">Revenue</p>
            <p className="text-2xl font-bold  ">
              {fullMovie?.revenue
                ? `$${fullMovie?.revenue.toLocaleString()}`
                : "N/A"}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              ease: "easeInOut",
            }}
            className="bg-background backdrop-blur border border-primary rounded-2xl p-6 text-center"
          >
            <Award className="size-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-gray-400">Box Office</p>
            <p className="text-xl font-bold">{fullMovie?.BoxOffice || "N/A"}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              ease: "easeInOut",
            }}
            className="bg-background backdrop-blur border border-primary rounded-2xl p-6 text-center"
          >
            <Award className="size-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-gray-400">Awards</p>
            <p className="text-xl font-bold">
              {fullMovie?.Awards === "N/A" ? "None" : fullMovie?.Awards}
            </p>
          </motion.div>
        </section>
        {/* Production & Details */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut" }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold">Production Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <div className="flex items-center gap-4">
              <Film className="size-6 text-gray-500" />
              <div>
                <p className="text-gray-500">Production Companies</p>
                <p className="font-medium">
                  {fullMovie?.production_companies
                    ?.map((c: any) => c.name)
                    .join(", ") || "Unknown"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Globe className="size-6 text-gray-500" />
              <div>
                <p className="text-gray-500">Language</p>
                <p className="font-medium">{fullMovie?.Language}</p>
              </div>
            </div>
          </div>
        </motion.section>
        {/* Cast */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeInOut" }}
            className="text-3xl font-bold mb-6"
          >
            Cast
          </motion.h2>
          <motion.div
            transition={{ ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {fullMovie?.credits.cast &&
              fullMovie?.credits.cast
                .slice(0, initialCast)
                .map((actor: Actor, index: number) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-4"
                    key={actor.id}
                  >
                    <Link
                      href={`/actors/${actor.id}`}
                      className="flex items-center gap-4"
                    >
                      <Image
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                            : "/user-icon-placeholder-1.png"
                        }
                        alt={actor.name}
                        width={80}
                        height={80}
                        className="rounded-full object-cover h-24 w-24"
                      />
                      <div className="hover:text-primary transition-all duration-200">
                        <p className="font-medium">{actor.name}</p>
                        <p className="text-sm text-gray-500">
                          {actor.character}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
          </motion.div>{" "}
          <Button
            onClick={() =>
              setInitialCast(
                initialCast < fullMovie?.credits.cast.length
                  ? fullMovie?.credits.cast.length
                  : 5
              )
            }
            variant={"link"}
            className="text-primary mt-7"
          >
            {fullMovie?.credits.cast &&
            initialCast < fullMovie?.credits.cast.length
              ? "Show more"
              : "Show less"}
          </Button>{" "}
        </section>
      </div>{" "}
    </div>
  );
};

export default MovieCast;
