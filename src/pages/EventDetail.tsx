import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Share2, 
  Heart, 
  ArrowLeft,
  Ticket,
  User,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { mockEvents } from "@/data/events";
import { toast } from "sonner";

const EventDetail = () => {
  const { id } = useParams();
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Event Not Found</h1>
          <Button asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(event.date);
  const dateString = formattedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const spotsLeft = event.capacity - event.attendees;
  const percentFull = (event.attendees / event.capacity) * 100;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleBookTicket = () => {
    toast.success("Booking feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Image */}
      <section className="relative pt-16 md:pt-20">
        <div className="absolute inset-0 h-[50vh] md:h-[60vh]">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative pt-[30vh] md:pt-[35vh]">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Button variant="glass" size="sm" asChild className="mb-6">
              <Link to="/events">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground">
                  {event.category}
                </Badge>
                {event.price === 0 && (
                  <Badge variant="secondary">Free Event</Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                {event.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-8">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium text-foreground">{dateString}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium text-foreground">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Organizer</p>
                    <p className="font-medium text-foreground">{event.organizer}</p>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">About This Event</h2>
                <div className="prose prose-muted max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {event.longDescription || event.description}
                  </p>
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Event Access",
                    "Networking Sessions",
                    "Refreshments",
                    "Event Materials",
                    "Certificate of Attendance",
                    "Post-Event Recording"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar - Booking Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 p-6 rounded-2xl bg-card border border-border card-shadow">
                {/* Price */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      {event.price === 0 ? "Free" : `$${event.price}`}
                    </span>
                    {event.price > 0 && (
                      <span className="text-muted-foreground">/ticket</span>
                    )}
                  </div>
                </div>

                {/* Attendance Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {event.attendees} attending
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {spotsLeft} spots left
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${percentFull}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    onClick={handleBookTicket}
                  >
                    <Ticket className="w-5 h-5 mr-2" />
                    Book Tickets
                  </Button>
                  
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1"
                      onClick={() => toast.success("Added to favorites!")}
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1"
                      onClick={handleShare}
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Guarantee */}
                <p className="text-xs text-center text-muted-foreground mt-6">
                  🔒 Secure checkout • Full refund available
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <Footer />
      </section>
    </div>
  );
};

export default EventDetail;
