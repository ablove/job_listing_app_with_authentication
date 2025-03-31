import Link from "next/link";
import type { JobType } from "@/types/job";

interface JobCardProps {
  job: JobType;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/job/${job.id}`} className="block">
      <div className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-yellow-50 flex items-center justify-center">
            <img
              src={job.image || "/placeholder.svg?height=64&width=64"}
              alt={`${job.company} logo`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {job.title}
            </h2>
            <p className="text-gray-500 text-sm mb-3">
              {job.company} • {job.about.location}
            </p>

            <p className="text-gray-700 mb-4 text-sm line-clamp-3">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                In Person
              </span>
              {job.about.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium"
                >
                  {category}
                </span>
              ))}
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium">
                IT
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
