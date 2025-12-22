import React, { useContext } from "react";
import { AuthContext } from "../../../../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../../../../components/LoadingComponent/LoadingComponent";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const BarChartAsset = () => {
  const { user } = useContext(AuthContext);
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  const { data = [], isLoading } = useQuery({
    queryKey: ["assetBarChart", user],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:2031/analytics/top-assets?hrEmail=${user.email}`,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const result = await res.json();
      if (Array.isArray(result)) {
        return result;
      }
      
    },
  });

  // console.log(data)

  return (
    <div>
      {isLoading ? (
        <LoadingComponent></LoadingComponent>
      ) : (
        <div className="h-80 w-full border border-base-content/10 rounded-xl pb-12 p-5">
          <h3 className="font-semibold mb-4">Top 5 Requested Assets</h3>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="_id" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="requests" radius={[6, 6, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BarChartAsset;
