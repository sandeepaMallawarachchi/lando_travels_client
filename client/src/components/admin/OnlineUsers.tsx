import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  title: string;
  value: number;
  showGraph?: boolean;
  graphData?: { time: string; value: number }[];
}

const OnlineUsers: React.FC<Props> = ({ title, value, showGraph = false, graphData }) => {
  return (
    <div className="mt-10 bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-xl p-4 hover:shadow-xl transition-all duration-300">
      <div className="mb-2 text-left">
        <h3 className="text-sm text-gray-600">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      {showGraph && graphData && (
        <div className="w-full h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData}>
              <XAxis dataKey="time" hide />
              <YAxis hide />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default OnlineUsers;
