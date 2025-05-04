export default function ItemDetailsPage() {
  return (
    <div className="min-h-screen flex flex-col lg:px-40">
      <h1 className="text-2xl lg:text-4xl font-bold mb-4">Item Details</h1>
      <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-4">
          <img
            src={
              "https://images.unsplash.com/photo-1744190070186-ceeba324c2d6?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Item Image"
            className="w-full h-[300px] object-cover rounded-lg"
          />
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