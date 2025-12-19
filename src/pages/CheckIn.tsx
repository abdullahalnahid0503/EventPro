import { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Search, CheckCircle, XCircle, Users, Clock, AlertCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { mockEvents } from "@/data/events";
import { toast } from "sonner";

interface CheckInRecord {
  id: string;
  ticketId: string;
  holderName: string;
  ticketType: string;
  checkedInAt: string;
  status: "success" | "already_used" | "invalid";
}

const mockCheckIns: CheckInRecord[] = [
  {
    id: "1",
    ticketId: "TKT-001-2024",
    holderName: "John Doe",
    ticketType: "VIP Pass",
    checkedInAt: "2024-03-15 09:15 AM",
    status: "success",
  },
  {
    id: "2",
    ticketId: "TKT-002-2024",
    holderName: "Jane Smith",
    ticketType: "General Admission",
    checkedInAt: "2024-03-15 09:18 AM",
    status: "success",
  },
  {
    id: "3",
    ticketId: "TKT-003-2024",
    holderName: "Mike Johnson",
    ticketType: "VIP Pass",
    checkedInAt: "2024-03-15 09:22 AM",
    status: "success",
  },
];

const CheckIn = () => {
  const [ticketCode, setTicketCode] = useState("");
  const [checkIns, setCheckIns] = useState<CheckInRecord[]>(mockCheckIns);
  const [isScanning, setIsScanning] = useState(false);
  const [lastResult, setLastResult] = useState<CheckInRecord | null>(null);

  const selectedEvent = mockEvents[0]; // Demo: using first event

  const stats = {
    totalCapacity: selectedEvent.capacity,
    checkedIn: checkIns.filter((c) => c.status === "success").length,
    pending: selectedEvent.attendees - checkIns.filter((c) => c.status === "success").length,
  };

  const handleManualCheckIn = () => {
    if (!ticketCode.trim()) {
      toast.error("Please enter a ticket code");
      return;
    }

    // Simulate check-in
    const isValid = ticketCode.startsWith("TKT-");
    const isAlreadyUsed = checkIns.some((c) => c.ticketId === ticketCode);

    const newRecord: CheckInRecord = {
      id: String(checkIns.length + 1),
      ticketId: ticketCode,
      holderName: "Guest Attendee",
      ticketType: "General Admission",
      checkedInAt: new Date().toLocaleString(),
      status: isAlreadyUsed ? "already_used" : isValid ? "success" : "invalid",
    };

    setLastResult(newRecord);

    if (newRecord.status === "success") {
      setCheckIns([newRecord, ...checkIns]);
      toast.success(`✓ ${newRecord.holderName} checked in successfully!`);
    } else if (newRecord.status === "already_used") {
      toast.error("This ticket has already been used");
    } else {
      toast.error("Invalid ticket code");
    }

    setTicketCode("");
  };

  const simulateScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const mockTicketId = `TKT-00${Math.floor(Math.random() * 9) + 1}-2024`;
      setTicketCode(mockTicketId);
      setIsScanning(false);
      
      // Auto check-in after scan
      setTimeout(() => {
        handleManualCheckIn();
      }, 500);
    }, 2000);
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
              Check-In <span className="gradient-text">Scanner</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Scan QR codes or enter ticket IDs to check in attendees
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stats.checkedIn}</p>
                  <p className="text-sm text-muted-foreground">Checked In</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-amber-500" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stats.pending}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-border">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stats.totalCapacity}</p>
                  <p className="text-sm text-muted-foreground">Total Capacity</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scanner Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-primary" />
                    Scan Ticket
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* QR Scanner Placeholder */}
                  <div 
                    className={`aspect-square max-w-sm mx-auto rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300 ${
                      isScanning 
                        ? "border-primary bg-primary/5" 
                        : "border-border bg-muted/30"
                    }`}
                  >
                    {isScanning ? (
                      <div className="text-center">
                        <div className="relative">
                          <Camera className="w-16 h-16 text-primary animate-pulse mx-auto" />
                          <div className="absolute inset-0 border-2 border-primary rounded-lg animate-ping" />
                        </div>
                        <p className="text-sm text-primary mt-4">Scanning...</p>
                      </div>
                    ) : (
                      <>
                        <QrCode className="w-16 h-16 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground text-center px-4">
                          Click the button below to simulate scanning
                        </p>
                      </>
                    )}
                  </div>

                  <Button 
                    variant="hero" 
                    className="w-full" 
                    onClick={simulateScan}
                    disabled={isScanning}
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    {isScanning ? "Scanning..." : "Simulate QR Scan"}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or enter manually
                      </span>
                    </div>
                  </div>

                  {/* Manual Entry */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter ticket ID (e.g., TKT-001-2024)"
                        value={ticketCode}
                        onChange={(e) => setTicketCode(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleManualCheckIn()}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="hero" onClick={handleManualCheckIn}>
                      Check In
                    </Button>
                  </div>

                  {/* Last Result */}
                  {lastResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-4 rounded-xl ${
                        lastResult.status === "success"
                          ? "bg-green-500/10 border border-green-500/20"
                          : lastResult.status === "already_used"
                          ? "bg-amber-500/10 border border-amber-500/20"
                          : "bg-destructive/10 border border-destructive/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {lastResult.status === "success" ? (
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        ) : lastResult.status === "already_used" ? (
                          <AlertCircle className="w-8 h-8 text-amber-500" />
                        ) : (
                          <XCircle className="w-8 h-8 text-destructive" />
                        )}
                        <div>
                          <p className="font-medium text-foreground">
                            {lastResult.status === "success"
                              ? "Check-in Successful!"
                              : lastResult.status === "already_used"
                              ? "Already Checked In"
                              : "Invalid Ticket"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {lastResult.ticketId}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Check-ins */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Recent Check-ins
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {checkIns.map((record, index) => (
                      <motion.div
                        key={record.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/30"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            record.status === "success"
                              ? "bg-green-500/10"
                              : "bg-destructive/10"
                          }`}
                        >
                          {record.status === "success" ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-destructive" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {record.holderName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {record.ticketType} • {record.ticketId}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            {record.checkedInAt.split(" ").slice(1).join(" ")}
                          </p>
                        </div>
                      </motion.div>
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

export default CheckIn;
