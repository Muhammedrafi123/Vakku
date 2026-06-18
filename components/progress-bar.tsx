import type { Status } from "@/lib/types";
import { statusBorder } from "@/lib/utils";

export function ProgressBar({ progress, status }: { progress: number; status: Status }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#e8e3d8]" aria-label={`${progress}% progress`}>
      <div
        className="h-full rounded-full"
        style={{ width: `${Math.max(0, Math.min(100, progress))}%`, backgroundColor: statusBorder(status) }}
      />
    </div>
  );
}
