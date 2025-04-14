import { Sparkles } from "lucide-react"; // Icon from lucide-react for visual flair
import { Badge } from "@/components/ui/badge"; // Custom styled badge component

// These should be correctly imported for animation to work
import { MotionDiv } from "@/components/common/motion-wrapper";
import { itemVariants } from "@/utils/constants";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      {/* === Animated Badge indicating AI Feature === */}
      <MotionDiv
        variants={itemVariants}
        className="relative p-[1px] overflow-hidden rounded-full bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group"
      >
        {/* Badge UI with Sparkles icon */}
        <Badge
          variant="secondary"
          className="relative flex items-center rounded-full bg-white px-6 py-2 text-base font-medium transition-colors group-hover:bg-gray-50"
        >
          {/* Icon with animation */}
          <Sparkles className="mr-2 h-6 w-6 text-rose-600 animate-pulse" />
          <p className="text-base">AI-Powered Content Creation</p>
        </Badge>
      </MotionDiv>

      {/* === Main Heading for Upload Section === */}
      <MotionDiv
        variants={itemVariants}
        className="text-3xl font-bold tracking-tight text-gray-900 capitalize sm:text-4xl"
      >
        Start Uploading {/* Highlighted animated span with background effect */}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">Your PDFs</span>
          <span
            aria-hidden="true"
            className="absolute inset-0 -rotate-2 -skew-y-1 rounded-lg bg-rose-200/50"
          ></span>
        </span>
      </MotionDiv>

      {/* === Subtext giving context to the feature === */}
      <MotionDiv
        variants={itemVariants}
        className="mt-2 max-w-2xl text-lg leading-8 text-gray-600"
      >
        Upload your PDF and let our AI do the magic! ✨
      </MotionDiv>
    </div>
  );
}
