"use client";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
  Zoom,
} from "swiper/modules";
import { useDiscoverMovies } from "@/hooks/useDiscoverMovies";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { MovieType } from "@/types/types";
import { EffectCoverflow } from "swiper/modules";
import Image from "next/image";
import { Button } from "../ui/button";
import { SignedIn, SignInButton } from "@clerk/nextjs";
import { Spinner } from "../ui/spinner";
import { Badge } from "../ui/badge";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
const LandingCarousel = () => {
  const { data: movies, isPending } = useDiscoverMovies();
  const { user } = useUser();

  if (isPending)
    return (
      <div className="h-screen grid place-items-center">
        <Spinner className="size-12 animate-spin text-primary" />
      </div>
    );
  return (
    <div className="h-[80vh]">
      <Swiper
        // install Swiper modules
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Autoplay,
          EffectCoverflow,
        ]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        className="h-full"
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
        }}
      >
        {movies?.map((movie: MovieType) => (
          <SwiperSlide key={movie.id} className="relative group">
            <div className="slide-image-wrapper">
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                fill
                className="object-cover zoomed-slide"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_0%,rgba(0,0,0,0.3)_40%,rgba(0,0,0,0.7)_100%)]" />
            <div className="absolute bottom-0 from-[var(--background)] to-transparent h-20 w-full bg-gradient-to-t" />

            <div className="absolute md:top-40 md:left-40 top-30 left-10 transform flex justify-center flex-col gap-3 items-start">
              <h2 className="text-[clamp(2rem,5vw,5rem)] font-bold text-white">
                {movie.title}
              </h2>
              <p className="text-md md:text-lg text-white max-w-[250px] md:max-w-2xl">
                {movie.overview.slice(0, 150) + "..."}
              </p>
              <div className="flex flex-wrap gap-4">
                {movie.genres && (
                  <div className="flex gap-2">
                    {movie.genres.map((genre: string) => (
                      <Badge key={genre}>{genre}</Badge>
                    ))}
                  </div>
                )}
                <Badge variant={"secondary"} className="font-bold">
                  {new Date(movie.release_date).getFullYear()}
                </Badge>
                <p
                  style={
                    movie.vote_average >= 8
                      ? { backgroundColor: "green" }
                      : movie.vote_average >= 5
                      ? { backgroundColor: "yellow" }
                      : { backgroundColor: "red" }
                  }
                  className="text-card font-bold py-1 px-3 rounded-2xl"
                >
                  {movie.vote_average.toFixed(1)}
                </p>
              </div>

              <div className="flex gap-2 mt-5">
                {user ? (
                  <Link href={`/movie/${movie.id}`}>
                    <Button className="mt-4 text-lg md:px-5 md:py-6 p-4 rounded-full">
                      Watch Now
                    </Button>
                  </Link>
                ) : (
                  <SignInButton mode="modal">
                    <Button className="mt-4 text-lg md:px-5 md:py-6 p-4 rounded-full">
                      Watch Now
                    </Button>
                  </SignInButton>
                )}

                <Button
                  className="mt-4 text-lg md:px-5 md:py-6 p-4 rounded-full"
                  variant={"secondary"}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LandingCarousel;
