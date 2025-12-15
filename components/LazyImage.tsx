"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { ImageProps } from "next/image";

const LazyImage = ({ ...props }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full h-full">
      {!isLoaded && <Skeleton className="w-full h-full" />}
      <Image
        {...props}
        width={100}
        height={100}
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full hover:scale-105 transition-all duration-300"
      />
    </div>
  );
};

export default LazyImage;
