import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  submitQuery,
  addToHistory,
  querySuccess,
  processQuery,
} from "./redux/actions/queryActions";
import QueryInput from "./components/QueryInput";
import QueryHistory from "./components/QueryHistory";
import ResultsDisplay from "./components/ResultsDisplay";
import LoadingErrorStates from "./components/LoadingErrorStates";

function App() {
  const dispatch = useDispatch();
  const { queryResults, isLoading, error, queryHistory, chartData } =
    useSelector((state) => state.query);
  const [activeTab, setActiveTab] = useState("results");

  const handleQuerySubmit = (query) => {
    dispatch(submitQuery(query));
    dispatch(addToHistory(query));
    dispatch(processQuery());

    // Simulate AI processing
    setTimeout(() => {
      const mockResults = generateMockResults(query);
      dispatch(querySuccess(mockResults));
    }, 1500);
  };

  const generateMockResults = (query) => {
    const dataPoints = Math.floor(Math.random() * 10) + 5;
    const data = Array.from({ length: dataPoints }, (_, i) => ({
      x: `Item ${i + 1}`,
      y: Math.floor(Math.random() * 1000),
    }));

    return {
      data: {
        query,
        result: `This is a simulated result for: "${query}". Found ${dataPoints} relevant data points.`,
        timestamp: new Date().toISOString(),
      },
      chartData: {
        labels: data.map((item) => item.x),
        datasets: [
          {
            label: "Sample Data",
            data: data.map((item) => item.y),
            backgroundColor: "rgba(79, 70, 229, 0.6)",
            borderColor: "rgba(79, 70, 229, 1)",
            borderWidth: 1,
          },
        ],
      },
    };
  };

  const handleHistoryClick = (query) => {
    dispatch(submitQuery(query));
    dispatch(processQuery());

    // Simulate AI processing for history query
    setTimeout(() => {
      const mockResults = generateMockResults(query);
      dispatch(querySuccess(mockResults));
      setActiveTab("results"); // Switch to results tab after loading
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Gen AI Analytics Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <QueryInput onSubmit={handleQuerySubmit} />

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab("results")}
                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                      activeTab === "results"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Results
                  </button>
                  <button
                    onClick={() => setActiveTab("history")}
                    className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${
                      activeTab === "history"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Query History
                  </button>
                </nav>
              </div>

              <div className="p-6">
                <LoadingErrorStates isLoading={isLoading} error={error} />

                {activeTab === "results" && !isLoading && !error && (
                  <ResultsDisplay
                    results={queryResults}
                    chartData={chartData}
                  />
                )}

                {activeTab === "history" && (
                  <QueryHistory
                    history={queryHistory}
                    onItemClick={handleHistoryClick}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Quick Suggestions
              </h2>
              <ul className="space-y-2">
                <li
                  className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  onClick={() =>
                    handleQuerySubmit("Show me sales by region last quarter")
                  }
                >
                  Show me sales by region last quarter
                </li>
                <li
                  className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  onClick={() =>
                    handleQuerySubmit("Compare customer retention rates")
                  }
                >
                  Compare customer retention rates
                </li>
                <li
                  className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  onClick={() =>
                    handleQuerySubmit("What's our top performing product?")
                  }
                >
                  What's our top performing product?
                </li>
                <li
                  className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  onClick={() =>
                    handleQuerySubmit("Break down expenses by department")
                  }
                >
                  Break down expenses by department
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
