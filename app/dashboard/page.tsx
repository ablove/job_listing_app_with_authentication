import Link from "next/link";
import { jobData } from "@/data/job-data";
import { ChevronDown } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
            <p className="text-gray-500">Showing {jobData.length} results</p>
          </div>

          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Sort by:</span>
            <button className="flex items-center text-gray-900 font-medium">
              Most relevant
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {jobData.map((job, index) => (
            <Link key={index} href={`/job/${job.id}`} className="block">
              <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
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
          ))}
        </div>
      </div>
    </div>
  );
}
