import { Pizza } from "lucide-react";
import { MotionH3, MotionDiv } from "@/components/common/motion-wrapper"; // Assuming these exist
import { SummaryViewer } from "@/components/summaries/summary-viewer";

export default function DemoSection() {
  const DEMO_SUMMARY = ""; // change this through logic
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        {/* Background Gradient with Clip Path */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 lg:-top-40"
        >
          <div
            className="relative left-[calc(50%-3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.16% 44.1%, 100% 61.6%, 97.58% 26.9%, 85.5% 80.7%, 2% 72.5%, 32.5% 60.2%, 62.4% 52.4%, 68.18% 47.5%, 58.3% 45.2%, 34.5% 27.5%, 76.7% 0.19%, 64.9% 17%, 100% 27.69%, 76.8% 76.1%, 97.7% 74.1%, 44.1%)",
            }}
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Icon Container */}
          <div className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
              <Pizza className="mx-auto h-6 w-6 text-rose-500" />{" "}
              {/* Corrected icon size */}
            </div>

            {/* Heading */}
            <div className="text-center mb-16">
              <MotionH3
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
              >
                Watch how Sommaire transforms{" "}
                <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                  this Next.js course PDF
                </span>{" "}
                into an easy-to-read summary!
              </MotionH3>
            </div>
          </div>
        </div>

        {/* Centering Additional Content */}
        <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
          {/* Summary Viewer */}
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SummaryViewer summary={DEMO_SUMMARY} />
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
