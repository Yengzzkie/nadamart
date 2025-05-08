"use client";
import { useParams } from "next/navigation";
import Carousel from "@/components/Carousel";
import items from "@/items.json";
import ExampleWrapper from "@/components/ImageModal";

export default function ItemDetailsPage() {
  const { id } = useParams();

  const itemData = items.find((item) => item.id.toString() === id);
  console.log(itemData);

  return (
    <div className="min-h-screen flex flex-col p-4 lg:px-40 pt-10">
      <h1 className="text-2xl lg:text-4xl font-bold mb-4">{itemData.name}</h1>
      <p className="text-gray-600 mb-4 italic">
        Posted by:{" "}
        <span className="font-bold">{itemData.user}</span>
      </p>
      <Carousel itemData={itemData} />
      <div className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start pt-8">
        <div className="flex flex-col gap-3">
          <h4 className="text-xl font-semibold">Description</h4>
          <p className="text-gray-600">
            {itemData.description}
          </p>
        </div>
      </div>
    </div>
  );
}
