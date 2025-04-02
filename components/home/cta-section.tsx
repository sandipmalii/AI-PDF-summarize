import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className='space-y-2'>
            <h2 className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Save Hours of Reading Time?
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
              Transform lengthy documents into clear, actionable insights with
              our AI-powered summarizer.
            </p>
          </div>

          {/* Call-to-action button */}
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Link href="/#pricing" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="link"
                className="w-full min-[400px]:w-auto bg-gradient-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 text-white transition-all duration-300 flex items-center justify-center"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}