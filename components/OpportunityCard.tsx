import type React from "react";
import Link from "next/link";
import { MapPin, Users, Calendar } from "lucide-react";
import type { Opportunity } from "@/features/api/apiSlice";
import { formatDate } from "@/lib/utils";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
}) => {
  // Format the date to a more readable format
  const formattedDate = formatDate(opportunity.datePosted);

  // Get the first location if available
  const location =
    opportunity.location && opportunity.location.length > 0
      ? opportunity.location[0]
      : "Remote";

  return (
    <Link href={`/opportunity/${opportunity.id}`} className="block">
      <div className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
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

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {opportunity.title}
            </h2>
            <p className="text-gray-500 text-sm mb-3">
              {opportunity.orgName} • {location}
            </p>

            <p className="text-gray-700 mb-4 text-sm line-clamp-3">
              {opportunity.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  opportunity.opType === "inPerson"
                    ? "bg-green-50 text-green-600"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                {opportunity.opType === "inPerson" ? "In Person" : "Virtual"}
              </span>

              {opportunity.categories.slice(0, 2).map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-medium"
                >
                  {category}
                </span>
              ))}

              {opportunity.requiredSkills.slice(0, 1).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>{opportunity.applicantsCount} applicants</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Posted {formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
