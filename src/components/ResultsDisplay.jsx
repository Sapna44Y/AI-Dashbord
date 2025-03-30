import { useSelector } from "react-redux";
import ChartVisualization from "./ChartVisualization";

const ResultsDisplay = () => {
  const { queryResults, chartData, isLoading, error } = useSelector(
    (state) => state.query
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!queryResults) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Submit a query to see results</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-gray-500 mb-1">
          Your Question
        </h3>
        <p className="text-gray-900">{queryResults.query}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-gray-500 mb-1">AI Analysis</h3>
        <div className="text-gray-900">
          {queryResults.result.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-2">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {chartData && (
        <ChartVisualization chartData={chartData} query={queryResults.query} />
      )}
    </div>
  );
};

export default ResultsDisplay;
