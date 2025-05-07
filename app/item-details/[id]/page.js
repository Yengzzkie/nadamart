import Carousel from "@/components/Carousel";

export default function ItemDetailsPage() {
  return (
    <div className="min-h-screen flex flex-col lg:px-40">
      <h1 className="text-2xl lg:text-4xl font-bold mb-4">Item Details</h1>
      <Carousel />
      <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Item Title</h2>
          <p className="text-gray-600">
            This is a detailed description of the item. It provides information
            about the items features, specifications, and any other relevant
            details.
          </p>
        </div>
      </div>
    </div>
  );
}
