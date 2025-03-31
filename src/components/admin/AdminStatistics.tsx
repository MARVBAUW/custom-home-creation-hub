
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

// Mock data for statistics
const data = [
  {
    name: "Jan",
    total: 2,
  },
  {
    name: "Feb",
    total: 3,
  },
  {
    name: "Mar",
    total: 4,
  },
  {
    name: "Apr",
    total: 2,
  },
  {
    name: "May",
    total: 3,
  },
  {
    name: "Jun",
    total: 5,
  },
];

const AdminStatistics = () => {
  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Bar dataKey="total" fill="#a69770" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-muted-foreground">
              Taux de satisfaction client
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Projets en cours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Documents cette semaine
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStatistics;
