import Header from "@/components/Header";

export default function OpportunitiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
          <p className="mt-2 text-gray-600">
            Browse available job opportunities
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Placeholder for opportunities */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">
                Software Developer
              </h3>
              <p className="mt-2 text-sm text-gray-600">Full-time • Remote</p>
              <p className="mt-2 text-sm text-gray-500">
                We're looking for a talented software developer to join our team
                and help build amazing products.
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  React
                </span>
                <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  TypeScript
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">UX Designer</h3>
              <p className="mt-2 text-sm text-gray-600">Contract • On-site</p>
              <p className="mt-2 text-sm text-gray-500">
                Join our design team to create beautiful and intuitive user
                experiences for our products.
              </p>
              <div className="mt-4">
                <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                  Figma
                </span>
                <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                  UI/UX
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
