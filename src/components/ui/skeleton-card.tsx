import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex items-start space-x-3">
      <Skeleton className="h-[78px] w-[78px] rounded-xl bg-gray-200" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px] bg-gray-200" />
        <Skeleton className="h-4 w-[160px] bg-gray-200" />
      </div>
    </div>
  );
}
