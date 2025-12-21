import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../../../provider/AuthProvider";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";

const PieChartAsset = () => {
  
  const { user } = useContext(AuthContext);
  const COLORS = ["#3b82f6", "#f97316"];

  const { data = [], isLoading } = useQuery({
    queryKey: ["assetPieChart", user],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:2031/analytics/asset-types?hrEmail=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const result = await res.json();
      return result;
    },
  });

  // console.log(data);

  return (
    <div>
      {isLoading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <div className="h-80 w-full border border-base-content/10 rounded-xl p-5 pb-12">
          <h3 className="font-semibold mb-4">Asset Type Distribution</h3>

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default PieChartAsset;
