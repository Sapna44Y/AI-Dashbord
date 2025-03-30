import { ClockIcon } from "@heroicons/react/24/outline";

const QueryHistory = ({ history, onItemClick }) => {
  return (
    <div>
      {history.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No queries in history yet.</p>
          <p className="text-sm text-gray-400 mt-2">
            Your search history will appear here
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {history.map((item, index) => (
            <li key={index} className="py-3">
              <button
                onClick={() =>
                  onItemClick(typeof item === "string" ? item : item.query)
                }
                className="text-left w-full hover:text-indigo-600 flex items-start group"
              >
                <ClockIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0 group-hover:text-indigo-500" />
                <span className="flex-1 text-left">
                  {typeof item === "string" ? item : item.query}
                  {item.timestamp && (
                    <span className="block text-xs text-gray-400 mt-1">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueryHistory;
