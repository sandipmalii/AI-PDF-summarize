import { getSummaryById } from "@/lib/summaries";
import { notFound } from "next/navigation";
import BgGradient from "@/components/common/bg-gradient"; // ✅ Make sure path is correct

export default async function SummaryPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const summary = await getSummaryById(id);

  if (!summary) {
    notFound();
  }

  const { title, summary_text, file_name } = summary;

  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container mx-auto flex flex-col gap-4 px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{title}</h1>
          {file_name && <p className="text-gray-500">{file_name}</p>}
          {summary_text && <p className="mt-4 text-lg">{summary_text}</p>}
        </div>
      </div>
    </div>
  );
}
