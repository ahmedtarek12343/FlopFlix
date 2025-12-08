"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { ImageProps } from "next/image";

const LazyImage = ({ ...props }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Skeleton className="w-full h-full" />}
      <Image
        {...props}
        width={100}
        height={100}
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full"
      />
    </>
  );
};

export default LazyImage;
