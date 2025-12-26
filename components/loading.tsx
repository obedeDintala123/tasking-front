import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Loader2 className="animate-spin text-tasking-primary-00" />
      <span className="ml-2 text-tasking-primary-40">Loading...</span>
    </div>
  );
};
