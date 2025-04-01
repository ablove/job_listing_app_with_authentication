import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API response types based on the provided data structure
export interface Opportunity {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: "inPerson" | "virtual";
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  orgID: string;
  datePosted: string;
  status: string;
  applicantsCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: any;
  perksAndBenefits: any;
  createdAt: string;
  updatedAt: string;
  orgPrimaryPhone: string;
  orgEmail: string;
  orgWebsite?: string;
  average_rating: number;
  total_reviews: number;
}

interface OpportunitiesResponse {
  success: boolean;
  message: string;
  data: Opportunity[];
  errors: any;
  count: number;
}

interface OpportunityResponse {
  success: boolean;
  message: string;
  data: Opportunity;
  errors: any;
  count: number;
}

// Create the API slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://akil-backend.onrender.com" }),
  tagTypes: ["Opportunity"],
  endpoints: (builder) => ({
    // Get all opportunities
    getOpportunities: builder.query<Opportunity[], void>({
      query: () => "/opportunities/search",
      // Transform the response to extract just the data array
      transformResponse: (response: OpportunitiesResponse) => {
        // Check if the request was successful
        if (!response.success) {
          throw new Error(response.message || "Failed to fetch opportunities");
        }
        return response.data;
      },
      // Handle errors
      transformErrorResponse: (response: { status: number; data: any }) => {
        return (
          response.data?.message ||
          "An error occurred while fetching opportunities"
        );
      },
      providesTags: ["Opportunity"],
    }),

    // Get a single opportunity by ID
    getOpportunityById: builder.query<Opportunity, string>({
      query: (id) => `/opportunities/${id}`,
      // Transform the response to extract just the data object
      transformResponse: (response: OpportunityResponse) => {
        // Check if the request was successful
        if (!response.success) {
          throw new Error(response.message || "Failed to fetch opportunity");
        }
        return response.data;
      },
      // Handle errors
      transformErrorResponse: (response: { status: number; data: any }) => {
        return (
          response.data?.message ||
          "An error occurred while fetching the opportunity"
        );
      },
      providesTags: (result, error, id) => [{ type: "Opportunity", id }],
    }),
  }),
});

// Export the auto-generated hooks
export const { useGetOpportunitiesQuery, useGetOpportunityByIdQuery } =
  apiSlice;
