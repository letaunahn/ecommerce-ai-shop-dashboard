import React from "react";
import { useSelector } from "react-redux";
import { Cell, PieChart, ResponsiveContainer, Pie } from "recharts";

const OrdersChart = () => {
  const { orderStatusCounts } = useSelector((state) => state.admin);

  const statusColors = {
    Processing: "#facc15",
    Shipped: "#3b82f6",
    Delivered: "#22c55e",
    Cancelled: "#ef4444",
  };

  


  const orderStatusData = Object.entries(orderStatusCounts || {}).map(
    ([status, count]) => ({
      status,
      count: parseInt(count),
    })
  );

  const filteredData = orderStatusData.filter(item => item.count > 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold mb-2">Order Status</h3>
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No order data available
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={filteredData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={50}
              label={({ payload }) => `${payload.status}: ${payload.count}`}>
              {filteredData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={statusColors[entry.status] || "#ccc"}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default OrdersChart;
