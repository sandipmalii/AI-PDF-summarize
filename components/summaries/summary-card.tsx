import { Card } from '@/components/ui/card';
import DeleteButton from './delete-button';
import Link from 'next/link';
import { FileText } from 'lucide-react'; // ✅ Corrected: Filetext → FileText
import { cn } from '@/lib/utils';
// import SummaryHeader from './summary-header'; // You can remove this line if you're defining SummaryHeader here
// import StatusBadge from './status-badge'; // You can remove this line if you're defining StatusBadge here

// ✅ SummaryHeader Component
const SummaryHeader =  awit getSummaries()
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-rose-500" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate w-4/5">
          {title}
        </h3>
        <p className="text-sm text-gray-500">{createdAt}</p>
      </div>
    </div>
  );
};

// ✅ StatusBadge Component
const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        'px-3 py-1 text-xs font-medium rounded-full capitalize',
        status === 'completed'
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
      )}
    >
      {status}
    </span>
  );
};

// ✅ Main SummaryCard Component
export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <div className="relative h-full">
      <Card>
        <div className="absolute top-2 right-2">
          <DeleteButton />
        </div>
        <Link href={`/summaries/${summary.id}`} className="block p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              fileUrl={summary.original_file_url}
              title={summary.title}
              createdAt={summary.created_at}
            />
            <p className="text-gray-600 line-clamp-2 text-sm sm:text-base pl-2">
              {summary.summary_text}
            </p>
          </div>
          <div className="flex justify-between items-center mt-2 sm:mt-4">
            <p className="text-sm text-gray-500">
              {new Date(summary.created_at).toLocaleDateString()}
            </p>
            <StatusBadge status={summary.status} />
          </div>
        </Link>
      </Card>
    </div>
  );
}
