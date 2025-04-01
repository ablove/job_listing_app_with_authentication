"use client";

import type React from "react";
import { useMemo } from "react";
import { useGetOpportunitiesQuery } from "@/features/api/apiSlice";
import { OpportunityCard } from "./OpportunityCard";
import { Spinner } from "@/components/Spinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ChevronDown } from "lucide-react";
import classnames from "classnames";

export const OpportunitiesList: React.FC = () => {
  const {
    data: opportunities = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetOpportunitiesQuery();

  // Sort opportunities by date posted (newest first)
  const sortedOpportunities = useMemo(() => {
    const sorted = [...opportunities];
    sorted.sort(
      (a, b) =>
        new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
    );
    return sorted;
  }, [opportunities]);

  let content: React.ReactNode;

  if (isLoading) {
    content = <Spinner text="Loading opportunities..." />;
  } else if (isError) {
    content = (
      <ErrorMessage
        message={
          error instanceof Error
            ? error.message
            : "Failed to load opportunities"
        }
        onRetry={refetch}
      />
    );
  } else if (isSuccess) {
    const containerClassname = classnames("space-y-4", {
      "opacity-60": isFetching,
    });

    content = (
      <div className={containerClassname}>
        {sortedOpportunities.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700">
              No opportunities found
            </h3>
            <p className="text-gray-500 mt-2">
              Check back later for new opportunities
            </p>
          </div>
        ) : (
          sortedOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))
        )}
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
          <p className="text-gray-500">
            {isSuccess
              ? `Showing ${opportunities.length} results`
              : "Finding opportunities..."}
          </p>
        </div>

        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Sort by:</span>
          <button className="flex items-center text-gray-900 font-medium">
            Most recent
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>

      {content}

      {isFetching && !isLoading && (
        <div className="flex justify-center mt-4">
          <Spinner size="sm" text="Refreshing..." />
        </div>
      )}
    </section>
  );
};
