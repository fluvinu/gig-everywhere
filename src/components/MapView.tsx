import { Gig, gigs } from "@/data/gigs";

interface MapViewProps {
  filteredGigs?: Gig[];
  height?: string;
}

const MapView = ({ filteredGigs, height = "h-[60vh]" }: MapViewProps) => {
  const displayGigs = filteredGigs || gigs;
  
  // Use the center of all gigs, or default to Delhi
  const centerLat = displayGigs.length > 0
    ? displayGigs.reduce((sum, g) => sum + g.lat, 0) / displayGigs.length
    : 28.6139;
  const centerLng = displayGigs.length > 0
    ? displayGigs.reduce((sum, g) => sum + g.lng, 0) / displayGigs.length
    : 77.209;

  // Build markers query for OpenStreetMap embed
  const zoom = displayGigs.length === 1 ? 16 : 14;
  
  // Use OpenStreetMap iframe embed
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${centerLng - 0.05},${centerLat - 0.03},${centerLng + 0.05},${centerLat + 0.03}&layer=mapnik&marker=${centerLat},${centerLng}`;

  return (
    <div className={`${height} w-full rounded-2xl overflow-hidden border border-border shadow-lg`}>
      <iframe
        title="Map"
        src={mapUrl}
        style={{ width: "100%", height: "100%", border: "none" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapView;
