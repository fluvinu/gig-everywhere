import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { gigs, Gig } from "@/data/gigs";
import { Star, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

// Fix leaflet default marker icon
const defaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapViewProps {
  filteredGigs?: Gig[];
  height?: string;
}

const MapView = ({ filteredGigs, height = "h-[60vh]" }: MapViewProps) => {
  const displayGigs = filteredGigs || gigs;

  return (
    <div className={`${height} w-full rounded-2xl overflow-hidden border border-border shadow-lg`}>
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {displayGigs.map((gig) => (
          <Marker key={gig.id} position={[gig.lat, gig.lng]} icon={defaultIcon}>
            <Popup>
              <Link to={`/gig/${gig.id}`} className="block max-w-[200px]">
                <div className="font-heading font-semibold text-sm mb-1">{gig.title}</div>
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs">{gig.provider.name}</span>
                  {gig.provider.verified && <BadgeCheck className="w-3 h-3 text-primary" />}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  <span className="text-xs">{gig.provider.rating}</span>
                  <span className="text-xs ml-auto font-bold">₹{gig.price}</span>
                </div>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
