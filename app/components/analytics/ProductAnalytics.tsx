"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AnalyticsPage = ({product} : Record<string, any>) => {
  // Mock AI response
  const productAnalytics = product;
  console.log(product)
//   {
//     productName: "Organic Herbal Tea",
//     score: 72,
//     explanation: "Moderate transparency. Missing sourcing details for 2 ingredients.",
//     suggestions: [
//       "Add sourcing details for green tea leaves.",
//       "Include certification ID for 'organic' claim.",
//       "Clarify packaging recyclability.",
//     ],
//     flags: ["Incomplete sourcing", "Unverified organic claim"],
//   };

  return (
    <div className="p-6 text-gray-100">
			<span className="h-2 w-20 bg-gray-50"> </span>
			<h1 className="text-2xl font-bold mb-6">Product Analytics</h1>
			<span className="h-1 w-20 bg-gray-50"> </span>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-700 rounded-lg shadow p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">
            Transparency Score - {productAnalytics.productName}
          </h2>
          <div className="w-40 h-40">
            <CircularProgressbar
              value={productAnalytics.score}
              text={`${productAnalytics.score}%`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor:
                  productAnalytics.score > 70
                    ? "#22c55e"
                    : productAnalytics.score > 40
                    ? "#eab308"
                    : "#ef4444",
                trailColor: "#1e293b",
              })}
            />
          </div>
          <p className="text-sm mt-4 text-gray-400">
            {productAnalytics.explanation}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">AI Suggestions</h2>
          <ul className="list-disc list-inside space-y-2">
            {productAnalytics.suggestions?.map((s : any, i : number) => (
              <li key={i} className="text-gray-300">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Ingredients</h2>
        <div className="flex flex-wrap gap-2">
          {productAnalytics.ingredients?.map((f : any, i : number) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-sm bg-green-500 text-black"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Risk Flags</h2>
        <div className="flex flex-wrap gap-2">
          {productAnalytics.flags?.map((f : any, i : number) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-sm bg-red-500 text-black"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
