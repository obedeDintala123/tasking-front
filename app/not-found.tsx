import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#f8f8f8" }}
    >
      <div className="text-center max-w-md w-full">
        {/* Decorative elements */}
        <div className="relative mb-8">
          <div
            className="absolute -top-4 -left-4 w-16 h-16 rounded-full opacity-20 blur-xl"
            style={{ backgroundColor: "#8098f0" }}
          />
          <div
            className="absolute -top-8 -right-8 w-20 h-20 rounded-full opacity-20 blur-xl"
            style={{ backgroundColor: "#f090f1" }}
          />
          <div
            className="absolute top-12 left-8 w-12 h-12 rounded-full opacity-20 blur-xl"
            style={{ backgroundColor: "#ffd251" }}
          />

          {/* Icon */}
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-lg mb-6">
            <FileQuestion className="w-12 h-12" style={{ color: "#8098f0" }} />
          </div>
        </div>

        {/* 404 Number */}
        <h1
          className="text-7xl font-bold mb-4 tracking-tight"
          style={{ color: "#323339" }}
        >
          404
        </h1>

        {/* Page Not Found Title */}
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ color: "#323339" }}
        >
          Page Not Found
        </h2>

        {/* Description */}
        <p
          className="text-base mb-8 leading-relaxed"
          style={{ color: "#323339", opacity: 0.7 }}
        >
          The page you are looking for does not exist or has been removed.
        </p>

        {/* Button with gradient */}
        <Link href="/dashboard">
          <Button
            size="lg"
            className="font-medium text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border-0"
            style={{
              background: `linear-gradient(135deg, #8098f0 0%, #f090f1 100%)`,
            }}
          >
            Back to Dashboard
          </Button>
        </Link>

        {/* Decorative accents at bottom */}
        <div className="flex justify-center gap-3 mt-12">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#8098f0" }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#ffd251" }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#f090f1" }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#ff9f69" }}
          />
        </div>
      </div>
    </div>
  );
}
