"use client";
import { useParams } from "next/navigation";
import { useGetOpportunityByIdQuery } from "@/features/api/apiSlice";
import { Spinner } from "@/components/Spinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Calendar, MapPin, Users, Briefcase, Clock, Globe } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { AuthGuard } from "@/components/AuthGuard";

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const opportunityId = Array.isArray(id) ? id[0] : (id as string);

  const {
    data: opportunity,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetOpportunityByIdQuery(opportunityId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Spinner text="Loading opportunity details..." />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              &larr; Back to opportunities
            </Link>
          </div>
          <ErrorMessage
            message={
              error instanceof Error
                ? error.message
                : "Failed to load opportunity details"
            }
            onRetry={refetch}
          />
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              &larr; Back to opportunities
            </Link>
          </div>
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">
              Opportunity not found
            </h3>
            <p className="text-gray-500 mt-2">
              The opportunity you're looking for doesn't exist or has been
              removed
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Wrap the content with AuthGuard
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              &larr; Back to opportunities
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-yellow-50 flex items-center justify-center">
                  {opportunity.logoUrl ? (
                    <img
                      src={opportunity.logoUrl || "/placeholder.svg"}
                      alt={`${opportunity.orgName} logo`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-2xl font-bold text-yellow-500">
                      {opportunity.orgName.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {opportunity.title}
                  </h1>
                  <p className="text-gray-600">{opportunity.orgName}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        opportunity.opType === "inPerson"
                          ? "bg-green-50 text-green-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {opportunity.opType === "inPerson"
                        ? "In Person"
                        : "Virtual"}
                    </span>

                    {opportunity.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Description
                  </h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {opportunity.description}
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Responsibilities
                  </h2>
                  <ul className="space-y-2">
                    {opportunity.responsibilities
                      .split("\n")
                      .filter((item) => item.trim())
                      .map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-100 text-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                            ✓
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Requirements
                  </h2>
                  <ul className="space-y-2">
                    {opportunity.requirements
                      .split("\n")
                      .filter((item) => item.trim())
                      .map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                            •
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Ideal Candidate
                  </h2>
                  <ul className="space-y-2">
                    {opportunity.idealCandidate
                      .split("\n")
                      .filter((item) => item.trim())
                      .map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-yellow-100 text-yellow-500 flex items-center justify-center flex-shrink-0 mt-1">
                            ★
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    When & Where
                  </h2>
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                    <span>{opportunity.whenAndWhere}</span>
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Overview
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Posted On</p>
                        <p className="font-medium text-sm">
                          {formatDate(opportunity.datePosted)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Deadline</p>
                        <p className="font-medium text-sm">
                          {formatDate(opportunity.deadline)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="font-medium text-sm">
                          {opportunity.location.join(", ")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="font-medium text-sm">
                          {formatDate(opportunity.startDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">End Date</p>
                        <p className="font-medium text-sm">
                          {formatDate(opportunity.endDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Applicants</p>
                        <p className="font-medium text-sm">
                          {opportunity.applicantsCount} people applied
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.requiredSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Organization
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Organization</p>
                        <p className="font-medium text-sm">
                          {opportunity.orgName}
                        </p>
                      </div>
                    </div>

                    {opportunity.orgEmail && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="font-medium text-sm">
                            {opportunity.orgEmail}
                          </p>
                        </div>
                      </div>
                    )}

                    {opportunity.orgPrimaryPhone && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Phone</p>
                          <p className="font-medium text-sm">
                            {opportunity.orgPrimaryPhone}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
