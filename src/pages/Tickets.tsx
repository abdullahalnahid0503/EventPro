import { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Ticket, Download, Share2, Calendar, MapPin, Clock, User, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { mockEvents } from "@/data/events";
import { toast } from "sonner";

interface TicketData {
  id: string;
  eventId: string;
  ticketType: string;
  holderName: string;
  email: string;
  purchaseDate: string;
  status: "valid" | "used" | "cancelled";
}

const mockTickets: TicketData[] = [
  {
    id: "TKT-001-2024",
    eventId: "1",
    ticketType: "VIP Pass",
    holderName: "John Doe",
    email: "john@example.com",
    purchaseDate: "2024-03-01",
    status: "valid",
  },
  {
    id: "TKT-002-2024",
    eventId: "2",
    ticketType: "General Admission",
    holderName: "John Doe",
    email: "john@example.com",
    purchaseDate: "2024-03-05",
    status: "valid",
  },
  {
    id: "TKT-003-2024",
    eventId: "4",
    ticketType: "Workshop Pass",
    holderName: "John Doe",
    email: "john@example.com",
    purchaseDate: "2024-03-10",
    status: "used",
  },
];

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);

  const getEventDetails = (eventId: string) => {
    return mockEvents.find((e) => e.id === eventId);
  };

  const handleDownload = (ticket: TicketData) => {
    toast.success("Downloading ticket as PDF...");
  };

  const handleShare = (ticket: TicketData) => {
    navigator.clipboard.writeText(`https://eventpro.com/ticket/${ticket.id}`);
    toast.success("Ticket link copied to clipboard!");
  };

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
              My <span className="gradient-text">Tickets</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              View and manage your event tickets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tickets List */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-primary" />
                Your Tickets ({mockTickets.length})
              </h2>

              {mockTickets.map((ticket, index) => {
                const event = getEventDetails(ticket.eventId);
                if (!event) return null;

                return (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`border-border cursor-pointer transition-all duration-200 ${
                        selectedTicket?.id === ticket.id
                          ? "ring-2 ring-primary"
                          : "hover:border-primary/30"
                      }`}
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-foreground truncate">
                                  {event.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {ticket.ticketType}
                                </p>
                              </div>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  ticket.status === "valid"
                                    ? "bg-green-500/10 text-green-500"
                                    : ticket.status === "used"
                                    ? "bg-muted text-muted-foreground"
                                    : "bg-destructive/10 text-destructive"
                                }`}
                              >
                                {ticket.status.charAt(0).toUpperCase() +
                                  ticket.status.slice(1)}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(event.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {event.time.split(" - ")[0]}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Ticket Detail / QR Code */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {selectedTicket ? (
                <Card className="border-border sticky top-28 overflow-hidden">
                  {/* Ticket Header */}
                  <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-80">Ticket ID</p>
                        <p className="text-lg font-mono font-bold">
                          {selectedTicket.id}
                        </p>
                      </div>
                      {selectedTicket.status === "valid" && (
                        <CheckCircle className="w-8 h-8" />
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* QR Code */}
                    <div className="flex justify-center mb-6">
                      <div className="p-4 bg-background rounded-2xl border border-border">
                        <QRCodeSVG
                          value={`EVENTPRO-${selectedTicket.id}-${selectedTicket.eventId}`}
                          size={200}
                          level="H"
                          includeMargin
                          className="rounded-lg"
                        />
                      </div>
                    </div>

                    <p className="text-center text-sm text-muted-foreground mb-6">
                      Scan this QR code at the event entrance
                    </p>

                    {/* Event Details */}
                    {(() => {
                      const event = getEventDetails(selectedTicket.eventId);
                      if (!event) return null;

                      return (
                        <div className="space-y-4 border-t border-border pt-6">
                          <h3 className="font-semibold text-foreground">
                            {event.title}
                          </h3>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <Calendar className="w-4 h-4 text-primary" />
                              {new Date(event.date).toLocaleDateString(
                                "default",
                                {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <Clock className="w-4 h-4 text-primary" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <MapPin className="w-4 h-4 text-primary" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                              <User className="w-4 h-4 text-primary" />
                              {selectedTicket.holderName}
                            </div>
                          </div>

                          <div className="p-4 bg-muted/50 rounded-xl">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Ticket Type
                              </span>
                              <span className="font-medium text-foreground">
                                {selectedTicket.ticketType}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="hero"
                        className="flex-1"
                        onClick={() => handleDownload(selectedTicket)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleShare(selectedTicket)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border sticky top-28">
                  <CardContent className="p-12 text-center">
                    <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Select a Ticket
                    </h3>
                    <p className="text-muted-foreground">
                      Click on a ticket to view details and QR code
                    </p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tickets;
