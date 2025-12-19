import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign } from "lucide-react";

const ticketSalesData = [
  { name: "Mon", tickets: 45 },
  { name: "Tue", tickets: 52 },
  { name: "Wed", tickets: 78 },
  { name: "Thu", tickets: 110 },
  { name: "Fri", tickets: 92 },
  { name: "Sat", tickets: 156 },
  { name: "Sun", tickets: 134 },
];

const revenueData = [
  { name: "Jan", revenue: 4200 },
  { name: "Feb", revenue: 5800 },
  { name: "Mar", revenue: 7200 },
  { name: "Apr", revenue: 6400 },
  { name: "May", revenue: 8900 },
  { name: "Jun", revenue: 11200 },
];

const categoryData = [
  { name: "Technology", value: 35, color: "hsl(24, 95%, 53%)" },
  { name: "Music", value: 25, color: "hsl(32, 98%, 60%)" },
  { name: "Networking", value: 20, color: "hsl(240, 5%, 60%)" },
  { name: "Food & Drink", value: 12, color: "hsl(24, 95%, 70%)" },
  { name: "Other", value: 8, color: "hsl(240, 5%, 45%)" },
];

const attendanceData = [
  { name: "Week 1", expected: 120, actual: 115 },
  { name: "Week 2", expected: 180, actual: 172 },
  { name: "Week 3", expected: 150, actual: 168 },
  { name: "Week 4", expected: 200, actual: 195 },
];

export const TicketSalesChart = () => (
  <Card className="border-border">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-semibold flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        Ticket Sales (This Week)
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={ticketSalesData}>
            <defs>
              <linearGradient id="ticketGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(24, 95%, 53%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Area
              type="monotone"
              dataKey="tickets"
              stroke="hsl(24, 95%, 53%)"
              strokeWidth={2}
              fill="url(#ticketGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export const RevenueChart = () => (
  <Card className="border-border">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-semibold flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-primary" />
        Revenue Trend
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
            />
            <Bar 
              dataKey="revenue" 
              fill="hsl(24, 95%, 53%)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export const CategoryChart = () => (
  <Card className="border-border">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-semibold">Events by Category</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[250px] flex items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
              formatter={(value: number) => [`${value}%`, "Share"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {categoryData.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">{item.name}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const AttendanceChart = () => (
  <Card className="border-border">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-semibold flex items-center gap-2">
        <Users className="w-5 h-5 text-primary" />
        Attendance Tracking
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={attendanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
              }}
            />
            <Bar 
              dataKey="expected" 
              fill="hsl(var(--muted))" 
              radius={[4, 4, 0, 0]}
              name="Expected"
            />
            <Bar 
              dataKey="actual" 
              fill="hsl(24, 95%, 53%)" 
              radius={[4, 4, 0, 0]}
              name="Actual"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);
