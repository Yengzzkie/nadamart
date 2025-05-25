"use client";

const GoogleMap = ({ location }) => {
  return (
    <div>
      <h1 className="font-bold text-[var(--color-base-content)] text-xl mt-4 mb-2">Location</h1>
      <iframe
        className="w-full h-[25vh] lg:h-[400px]"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBZs6sZ3lFvNP5ogJPE8D3eOICTnBjaDZI&q=${location?.street ? location.street : "" },${location.city},${location.country},l1j5r3`}
      ></iframe>
    </div>
  );
};

export default GoogleMap;
