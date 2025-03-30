import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartVisualization = ({ chartData, query }) => {
  const [chartType, setChartType] = useState("bar");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!chartData) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500">No chart data available for this query.</p>
        <p className="text-sm text-gray-400 mt-2">
          Try asking a question with measurable data.
        </p>
      </div>
    );
  }

  // Common chart options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== undefined) {
              label += new Intl.NumberFormat("en-US").format(context.parsed.y);
            } else if (context.parsed !== undefined) {
              label += new Intl.NumberFormat("en-US").format(context.parsed);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat("en-US").format(value);
          },
        },
      },
    },
  };

  // Chart type specific configurations
  const chartConfigurations = {
    bar: {
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            display: true,
            text: query || "Bar Chart Visualization",
            font: {
              size: 16,
            },
          },
        },
      },
      component: Bar,
    },
    line: {
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            display: true,
            text: query || "Trend Analysis",
            font: {
              size: 16,
            },
          },
        },
        elements: {
          line: {
            tension: 0.4,
            fill: true,
          },
        },
      },
      component: Line,
    },
    pie: {
      options: {
        ...commonOptions,
        plugins: {
          ...commonOptions.plugins,
          title: {
            display: true,
            text: query || "Distribution Analysis",
            font: {
              size: 16,
            },
          },
        },
      },
      component: Pie,
    },
  };

  const CurrentChart = chartConfigurations[chartType].component;
  const currentOptions = chartConfigurations[chartType].options;

  // Enhance chart data with better colors for different chart types
  const enhancedChartData = {
    ...chartData,
    datasets: chartData.datasets.map((dataset, index) => {
      const backgroundColors = [
        "rgba(79, 70, 229, 0.7)", // Indigo
        "rgba(16, 185, 129, 0.7)", // Emerald
        "rgba(245, 158, 11, 0.7)", // Amber
        "rgba(239, 68, 68, 0.7)", // Red
        "rgba(139, 92, 246, 0.7)", // Violet
      ];

      const borderColors = [
        "rgba(79, 70, 229, 1)",
        "rgba(16, 185, 129, 1)",
        "rgba(245, 158, 11, 1)",
        "rgba(239, 68, 68, 1)",
        "rgba(139, 92, 246, 1)",
      ];

      return {
        ...dataset,
        backgroundColor:
          chartType === "pie"
            ? backgroundColors.slice(0, chartData.labels.length)
            : backgroundColors[index % backgroundColors.length],
        borderColor:
          chartType === "pie"
            ? borderColors.slice(0, chartData.labels.length)
            : borderColors[index % borderColors.length],
        borderWidth: 1,
      };
    }),
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Data Visualization
        </h3>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" />
          </button>

          {isDropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu">
                <button
                  onClick={() => {
                    setChartType("bar");
                    setIsDropdownOpen(false);
                  }}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    chartType === "bar"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  role="menuitem"
                >
                  Bar Chart
                </button>
                <button
                  onClick={() => {
                    setChartType("line");
                    setIsDropdownOpen(false);
                  }}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    chartType === "line"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  role="menuitem"
                >
                  Line Chart
                </button>
                <button
                  onClick={() => {
                    setChartType("pie");
                    setIsDropdownOpen(false);
                  }}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    chartType === "pie"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  role="menuitem"
                >
                  Pie Chart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-80">
        <CurrentChart data={enhancedChartData} options={currentOptions} />
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p>
          AI-generated visualization based on your query. Switch chart types to
          explore different perspectives.
        </p>
      </div>
    </div>
  );
};

export default ChartVisualization;
