export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  imageUrl: string;
  price: number;
  capacity: number;
  organizer: string;
  longDescription?: string;
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Tech Summit 2024",
    description: "Join industry leaders for a day of innovation, networking, and cutting-edge technology discussions.",
    longDescription: "Experience the future of technology at Tech Summit 2024. This flagship event brings together 500+ tech enthusiasts, startup founders, and industry veterans. Featuring keynote speeches from Fortune 500 CTOs, hands-on workshops on AI/ML, blockchain, and cloud computing, plus unparalleled networking opportunities. Don't miss the startup pitch competition with $50K in prizes!",
    date: "2024-03-15",
    time: "9:00 AM - 6:00 PM",
    location: "San Francisco Convention Center, CA",
    category: "Technology",
    attendees: 342,
    capacity: 500,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    price: 299,
    organizer: "TechEvents Inc."
  },
  {
    id: "2",
    title: "Jazz Night Under Stars",
    description: "An enchanting evening of live jazz performances in the beautiful botanical gardens.",
    longDescription: "Let the smooth sounds of jazz transport you to another world. Set against the backdrop of blooming gardens, this evening features performances by Grammy-nominated artists. Enjoy craft cocktails, gourmet appetizers, and the company of fellow jazz enthusiasts under a canopy of stars.",
    date: "2024-03-20",
    time: "7:00 PM - 11:00 PM",
    location: "Botanical Gardens, Austin, TX",
    category: "Music",
    attendees: 156,
    capacity: 200,
    imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop",
    price: 75,
    organizer: "Jazz Austin"
  },
  {
    id: "3",
    title: "Startup Founders Meetup",
    description: "Monthly networking event for entrepreneurs, investors, and startup enthusiasts.",
    longDescription: "Connect with fellow founders, pitch to angel investors, and learn from successful entrepreneurs. This month's theme: 'Scaling Your Startup in 2024'. Features lightning talks, breakout sessions, and a curated networking hour with local VCs.",
    date: "2024-03-25",
    time: "6:00 PM - 9:00 PM",
    location: "WeWork Downtown, New York",
    category: "Networking",
    attendees: 89,
    capacity: 150,
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop",
    price: 0,
    organizer: "NYC Founders Club"
  },
  {
    id: "4",
    title: "Culinary Masterclass: Italian Cuisine",
    description: "Learn authentic Italian cooking techniques from Michelin-starred chefs.",
    longDescription: "Discover the secrets of Italian cuisine in this hands-on masterclass. Chef Marco Rossi, holder of 2 Michelin stars, guides you through crafting fresh pasta, perfecting risotto, and creating traditional tiramisu. All ingredients and wine pairings included.",
    date: "2024-04-02",
    time: "2:00 PM - 6:00 PM",
    location: "Culinary Institute, Los Angeles",
    category: "Food & Drink",
    attendees: 24,
    capacity: 30,
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&auto=format&fit=crop",
    price: 150,
    organizer: "Gourmet Academy"
  },
  {
    id: "5",
    title: "Yoga & Wellness Retreat",
    description: "A transformative weekend of yoga, meditation, and holistic wellness practices.",
    longDescription: "Escape the hustle and reconnect with yourself at our wellness retreat. Expert instructors lead daily yoga sessions, guided meditations, and breathwork workshops. Includes healthy organic meals, spa access, and beautiful mountain accommodations.",
    date: "2024-04-10",
    time: "All Day Event",
    location: "Mountain Resort, Colorado",
    category: "Health",
    attendees: 45,
    capacity: 60,
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop",
    price: 450,
    organizer: "Zen Living Co."
  },
  {
    id: "6",
    title: "Art Gallery Opening: Modern Visions",
    description: "Exclusive opening night featuring works from emerging contemporary artists.",
    longDescription: "Be among the first to experience 'Modern Visions', featuring 30 emerging artists pushing the boundaries of contemporary art. Opening night includes artist meet-and-greets, champagne reception, and live art demonstrations. Limited tickets available.",
    date: "2024-04-15",
    time: "6:00 PM - 10:00 PM",
    location: "Downtown Art Gallery, Miami",
    category: "Arts",
    attendees: 178,
    capacity: 250,
    imageUrl: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&auto=format&fit=crop",
    price: 35,
    organizer: "Miami Arts Foundation"
  },
];

export const categories = [
  "All",
  "Technology",
  "Music",
  "Networking",
  "Food & Drink",
  "Health",
  "Arts",
  "Sports",
  "Education",
];
