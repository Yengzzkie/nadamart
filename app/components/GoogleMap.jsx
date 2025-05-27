"use client";
import { useMemo } from "react";

const GoogleMap = ({ location }) => {
  const query = useMemo(() => {
    const { city = "", country = "", postal_code = "" } = location || {};
    return encodeURIComponent(`${city}, ${country}, ${postal_code}`);
  }, [location]);

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBZs6sZ3lFvNP5ogJPE8D3eOICTnBjaDZI&q=${query}`;

  return (
    <div>
      <h1 className="font-bold text-[var(--color-base-content)] text-xl mt-2 mb-2">Location</h1>
      <iframe
        key={mapSrc} // Force re-render on map URL change
        className="w-full h-[25vh] lg:h-[400px]"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapSrc}
      />
    </div>
  );
};

export default GoogleMap;
