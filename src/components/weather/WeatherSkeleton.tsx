import { Skeleton } from "@/components/ui/skeleton";

export const WeatherSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Current Weather Skeleton */}
      <div className="glass-card rounded-3xl p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1 space-y-4">
            <div>
              <Skeleton className="h-8 w-40 mb-2" />
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex items-center gap-6">
              <Skeleton className="h-24 w-40" />
              <Skeleton className="h-20 w-20 rounded-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-28 rounded-xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Forecast Skeleton */}
      <div>
        <Skeleton className="h-7 w-32 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
};