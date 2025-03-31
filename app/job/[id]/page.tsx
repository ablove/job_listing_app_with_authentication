import { jobData } from "@/data/job-data";
import { notFound } from "next/navigation";
// import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const jobId = parseInt(params.id);
  const job = jobData.find((job) => job.id === jobId);

  if (!job) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <header className="p-4 border-b border-gray-700">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-sm font-light">
            Applicant Dashboard / Description
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <div className="bg-white text-gray-800 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Job Details */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Description
              </h2>
              <p className="text-gray-700 mb-8">{job.description}</p>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Responsibilities
              </h2>
              <ul className="space-y-4 mb-8">
                {job.responsibilities.map((responsibility: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                      ✓
                    </div>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Ideal Candidate we want
              </h2>
              <ul className="list-disc list-inside space-y-4 mb-8 text-gray-700 pl-4">
                <li>
                  <span className="font-semibold">
                    Young({job.ideal_candidate.age}){" "}
                    {job.ideal_candidate.gender} {job.title}
                  </span>
                </li>
                {job.ideal_candidate.traits.map((trait: string, index: number) => (
                  <li key={index} className="ml-4">
                    <span className="font-semibold">
                      {trait.split(":")[0]}:
                    </span>{" "}
                    {trait.split(":")[1] || trait}
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                When & Where
              </h2>
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                <span>{job.when_where}</span>
              </div>
            </div>

            {/* Right Column - About */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">About</h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Posted On</p>
                    <p className="font-medium">{job.about.posted_on}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Deadline</p>
                    <p className="font-medium">{job.about.deadline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Location</p>
                    <p className="font-medium">{job.about.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Start Date</p>
                    <p className="font-medium">{job.about.start_date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">End Date</p>
                    <p className="font-medium">{job.about.end_date}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.about.categories.map((category: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.about.required_skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
