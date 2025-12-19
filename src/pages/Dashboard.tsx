import { motion } from "framer-motion";
import { 
  Calendar, 
  Users, 
  Ticket, 
  TrendingUp, 
  Plus,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  QrCode
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { TicketSalesChart, RevenueChart, CategoryChart, AttendanceChart } from "@/components/DashboardCharts";
import { mockEvents } from "@/data/events";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Events",
      value: "12",
      change: "+2 this month",
      icon: Calendar,
      trend: "up"
    },
    {
      title: "Total Attendees",
      value: "1,234",
      change: "+18% from last month",
      icon: Users,
      trend: "up"
    },
    {
      title: "Tickets Sold",
      value: "856",
      change: "+24% from last month",
      icon: Ticket,
      trend: "up"
    },
    {
      title: "Revenue",
      value: "$24,500",
      change: "+32% from last month",
      icon: TrendingUp,
      trend: "up"
    }
  ];

  const recentEvents = mockEvents.slice(0, 4);

  const upcomingTasks = [
    { title: "Send reminder emails for Tech Summit", status: "pending", time: "Due in 2 days" },
    { title: "Finalize catering for Jazz Night", status: "completed", time: "Completed" },
    { title: "Review ticket sales report", status: "pending", time: "Due tomorrow" },
    { title: "Update event page photos", status: "pending", time: "Due in 3 days" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your events today.
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline" asChild>
                <Link to="/check-in">
                  <QrCode className="w-5 h-5 mr-2" />
                  Check-In
                </Link>
              </Button>
              <Button variant="hero">
                <Plus className="w-5 h-5 mr-2" />
                Create Event
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-border hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <TicketSalesChart />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <RevenueChart />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <CategoryChart />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="lg:col-span-2"
            >
              <AttendanceChart />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="lg:col-span-2"
            >
              <Card className="border-border h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Recent Events</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/events">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentEvents.map((event, index) => (
                      <Link
                        key={event.id}
                        to={`/events/${event.id}`}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                      >
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                            {event.title}
                          </h4>
                          <p className="text-sm text-muted-foreground truncate">
                            {event.location}
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {event.attendees} attending
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-foreground">
                            {event.price === 0 ? "Free" : `$${event.price}`}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tasks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Card className="border-border h-full">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Upcoming Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTasks.map((task, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-xl bg-muted/30"
                      >
                        {task.status === "completed" ? (
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            task.status === "completed" 
                              ? "text-muted-foreground line-through" 
                              : "text-foreground"
                          }`}>
                            {task.title}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {task.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
