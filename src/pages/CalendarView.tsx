import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { mockEvents } from "@/data/events";
import { Link } from "react-router-dom";

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthYear = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    setSelectedDate(null);
  };

  const getEventsForDate = (day: number) => {
    const dateStr = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    ).toISOString().split("T")[0];
    return mockEvents.filter((event) => event.date === dateStr);
  };

  const selectedDateEvents = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = selectedDate.toISOString().split("T")[0];
    return mockEvents.filter((event) => event.date === dateStr);
  }, [selectedDate]);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Event <span className="gradient-text">Calendar</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse events by date and plan your schedule
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <Card className="border-border">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <Button variant="ghost" size="icon" onClick={prevMonth}>
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <h2 className="text-xl font-semibold text-foreground">{monthYear}</h2>
                    <Button variant="ghost" size="icon" onClick={nextMonth}>
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Week Days */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map((day) => (
                      <div
                        key={day}
                        className="text-center text-sm font-medium text-muted-foreground py-2"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Days Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for days before the first of the month */}
                    {Array.from({ length: firstDayOfMonth }, (_, i) => (
                      <div key={`empty-${i}`} className="aspect-square" />
                    ))}

                    {/* Days */}
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const day = i + 1;
                      const events = getEventsForDate(day);
                      const hasEvents = events.length > 0;
                      const isSelected =
                        selectedDate?.getDate() === day &&
                        selectedDate?.getMonth() === currentDate.getMonth();
                      const isToday =
                        new Date().getDate() === day &&
                        new Date().getMonth() === currentDate.getMonth() &&
                        new Date().getFullYear() === currentDate.getFullYear();

                      return (
                        <button
                          key={day}
                          onClick={() =>
                            setSelectedDate(
                              new Date(
                                currentDate.getFullYear(),
                                currentDate.getMonth(),
                                day
                              )
                            )
                          }
                          className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-200 relative ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : isToday
                              ? "bg-primary/20 text-primary font-semibold"
                              : hasEvents
                              ? "bg-accent/20 hover:bg-accent/30 text-foreground"
                              : "hover:bg-muted text-foreground"
                          }`}
                        >
                          <span className="text-sm">{day}</span>
                          {hasEvents && !isSelected && (
                            <div className="flex gap-0.5 mt-1">
                              {events.slice(0, 3).map((_, idx) => (
                                <span
                                  key={idx}
                                  className={`w-1 h-1 rounded-full ${
                                    isToday ? "bg-primary" : "bg-accent"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-3 h-3 rounded-full bg-primary/20" />
                      Today
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-3 h-3 rounded-full bg-accent/20" />
                      Has Events
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-3 h-3 rounded-full bg-primary" />
                      Selected
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Events for Selected Date */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-border sticky top-28">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-foreground">
                      {selectedDate
                        ? selectedDate.toLocaleDateString("default", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })
                        : "Select a date"}
                    </h3>
                  </div>

                  {selectedDate ? (
                    selectedDateEvents.length > 0 ? (
                      <div className="space-y-4">
                        {selectedDateEvents.map((event) => (
                          <Link
                            key={event.id}
                            to={`/events/${event.id}`}
                            className="block p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                          >
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {event.title}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <MapPin className="w-3 h-3" />
                              <span className="truncate">{event.location}</span>
                            </div>
                            <div className="mt-3 text-sm font-medium text-primary">
                              {event.price === 0 ? "Free" : `$${event.price}`}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">
                          No events on this date
                        </p>
                        <Button variant="outline" className="mt-4" asChild>
                          <Link to="/events">Browse All Events</Link>
                        </Button>
                      </div>
                    )
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">
                        Click a date to see events
                      </p>
                    </div>
                  )}
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

export default CalendarView;
