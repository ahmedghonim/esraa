"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  loading?: "eager" | "lazy";
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 80,
  fill = false,
  objectFit = "cover",
  loading = "lazy",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        "overflow-hidden relative",
        isLoading ? "animate-pulse bg-gray-200" : "",
        fill ? "w-full h-full" : "",
        className
      )}
      style={!fill ? { width, height } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          objectFit === "contain" ? "object-contain" : "",
          objectFit === "cover" ? "object-cover" : "",
          objectFit === "fill" ? "object-fill" : "",
          objectFit === "none" ? "object-none" : "",
          objectFit === "scale-down" ? "object-scale-down" : ""
        )}
        priority={priority}
        sizes={sizes}
        quality={quality}
        fill={fill}
        loading={loading}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  );
}
