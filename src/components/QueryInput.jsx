import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  submitQuery,
  processQuery,
  querySuccess,
} from "../redux/actions/queryActions";
import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const QueryInput = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const generateQuerySpecificResults = (query) => {
    // Helper function to generate random numbers in a range
    const randomInRange = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    // Default result structure
    let result = {
      query: query,
      result: "",
      timestamp: new Date().toISOString(),
      confidence: "High",
      insights: [],
      suggestedActions: [],
    };

    let chartData = {
      labels: [],
      datasets: [
        {
          label: "Data",
          data: [],
          backgroundColor: "rgba(79, 70, 229, 0.6)",
        },
      ],
    };

    // Generate different results based on query keywords
    if (query.toLowerCase().includes("sales")) {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      const salesData = months.map(() => randomInRange(1000, 5000));

      result.result = `Sales analysis:\n• Total sales: $${salesData
        .reduce((a, b) => a + b)
        .toLocaleString()}\n• Average monthly sales: $${Math.round(
        salesData.reduce((a, b) => a + b) / salesData.length
      ).toLocaleString()}\n• Best month: ${
        months[salesData.indexOf(Math.max(...salesData))]
      }`;
      result.insights = [
        `Seasonal peak in ${months[randomInRange(2, 5)]}`,
        `${randomInRange(20, 40)}% of sales from top 3 products`,
      ];
      result.suggestedActions = [
        {
          title: "Break down by product category",
          description: "See which products are driving sales",
        },
      ];

      chartData.labels = months;
      chartData.datasets[0].data = salesData;
      chartData.datasets[0].label = "Monthly Sales";
    } else if (query.toLowerCase().includes("customer")) {
      const segments = ["New", "Returning", "Loyal", "Inactive"];
      const customerData = segments.map(() => randomInRange(100, 1000));

      result.result = `Customer analysis:\n• Total customers: ${customerData
        .reduce((a, b) => a + b)
        .toLocaleString()}\n• Retention rate: ${randomInRange(
        60,
        85
      )}%\n• Largest segment: ${
        segments[customerData.indexOf(Math.max(...customerData))]
      }`;
      result.insights = [
        `Customer acquisition cost: $${randomInRange(50, 200)}`,
        `${randomInRange(5, 15)}% month-over-month growth`,
      ];
      result.suggestedActions = [
        {
          title: "View customer lifetime value",
          description: "Analyze long-term customer value",
        },
      ];

      chartData.labels = segments;
      chartData.datasets[0].data = customerData;
      chartData.datasets[0].label = "Customer Segments";
    } else if (query.toLowerCase().includes("inventory")) {
      const products = ["Product A", "Product B", "Product C", "Product D"];
      const inventoryData = products.map(() => randomInRange(50, 500));

      result.result = `Inventory analysis:\n• Total items: ${inventoryData
        .reduce((a, b) => a + b)
        .toLocaleString()}\n• Stock coverage: ${randomInRange(
        30,
        90
      )} days\n• Lowest stock: ${
        products[inventoryData.indexOf(Math.min(...inventoryData))]
      }`;
      result.insights = [
        `${randomInRange(5, 20)}% of inventory is obsolete`,
        `Turnover rate: ${randomInRange(2, 8)}x annually`,
      ];
      result.suggestedActions = [
        {
          title: "Generate restock report",
          description: "Identify items needing replenishment",
        },
      ];

      chartData.labels = products;
      chartData.datasets[0].data = inventoryData;
      chartData.datasets[0].label = "Inventory Levels";
    } else {
      // Default generic response
      const categories = [
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
      ];
      const genericData = categories.map(() => randomInRange(10, 100));

      result.result = `Analysis for "${query}":\n• Found ${randomInRange(
        5,
        50
      )} relevant records\n• Average value: $${randomInRange(
        100,
        5000
      )}\n• Trend: ${
        ["Increasing", "Decreasing", "Stable"][randomInRange(0, 2)]
      } ${randomInRange(5, 25)}%`;
      result.insights = [
        `Key factor: ${
          ["seasonality", "marketing", "pricing", "competition"][
            randomInRange(0, 3)
          ]
        }`,
        `${randomInRange(60, 90)}% confidence in this analysis`,
      ];
      result.suggestedActions = [
        {
          title: "Compare with previous period",
          description: "View trend over time",
        },
      ];

      chartData.labels = categories;
      chartData.datasets[0].data = genericData;
      chartData.datasets[0].label = "Data Distribution";
    }

    return { data: result, chartData };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Dispatch the query submission
      dispatch(submitQuery(query));
      dispatch(processQuery());

      // Generate query-specific results
      setTimeout(() => {
        const results = generateQuerySpecificResults(query);
        dispatch(querySuccess(results));
      }, 1500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg overflow-hidden"
    >
      <div className="flex items-center px-4 py-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask any business question in natural language..."
          className="ml-3 flex-1 border-0 focus:ring-0 focus:outline-none text-gray-700 placeholder-gray-400"
        />
        <button
          type="submit"
          className="ml-2 bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default QueryInput;
