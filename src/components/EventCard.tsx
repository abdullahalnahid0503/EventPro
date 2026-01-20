import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  imageUrl: string;
  price?: number;
  index?: number;
}

const EventCard = ({
  id,
  title,
  description,
  date,
  time,
  location,
  category,
  attendees,
  imageUrl,
  price,
  index = 0,
}: EventCardProps) => {
  const formattedDate = new Date(date);
  const day = formattedDate.getDate();
  const month = formattedDate.toLocaleString("default", { month: "short" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/events/${id}`}
        className="group block bg-card rounded-2xl overflow-hidden border border-border card-shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          
          {/* Date Badge */}
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-xl p-2 text-center min-w-[50px]">
            <span className="block text-2xl font-bold text-foreground leading-none">{day}</span>
            <span className="block text-xs font-medium text-muted-foreground uppercase">{month}</span>
          </div>

          {/* Category Badge */}
          <Badge className="absolute top-4 right-4 bg-primary/90 hover:bg-primary text-primary-foreground">
            {category}
          </Badge>

          {/* Price */}
          {price !== undefined && (
            <div className="absolute bottom-4 right-4 bg-accent/90 backdrop-blur-sm text-accent-foreground font-semibold px-3 py-1 rounded-lg">
              {price === 0 ? "Free" : `$${price}`}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>

          {/* Meta Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border mt-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                <span>{attendees} attending</span>
              </div>
              <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
