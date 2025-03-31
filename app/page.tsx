import JobCard from "@/components/job-card";
import { jobData } from "@/data/job-data";
import { ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
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
            <JobCard key={index} job={job} />
          ))}
        </div>
      </div>
    </main>
  );
}
