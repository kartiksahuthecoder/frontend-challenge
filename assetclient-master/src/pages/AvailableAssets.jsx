import React from "react";
import Card from "../component/Card";

const AvailableAssets = () => {
  const asset = [
    {
      name: "Dell Laptop",
      category: "Electronics",
      description: "A high-performance laptop for work and gaming.",
      status: "Available",
    },
    {
      name: "Apple iPhone",
      category: "Electronics",
      description: "The latest iPhone with a stunning display.",
      status: "Unavailable",
    },
    {
      name: "Samsung TV",
      category: "Electronics",
      description: "A 4K TV with a crystal-clear display.",
      status: "Available",
    },
    {
      name: "Canon Camera",
      category: "Electronics",
      description: "A professional camera for capturing memories.",
      status: "Available",
    },
    {
      name: "Amazon Echo",
      category: "Electronics",
      description: "A smart speaker that simplifies your life.",
      status: "Unavailable",
    },
    {
      name: "Sony Headphones",
      category: "Electronics",
      description: "Wireless headphones with noise-cancellation.",
      status: "Available",
    },
  ];
  const availableAssets = asset.filter((asset) => asset.status === "Available");
  return (
    <div className="m-2 p-4 flex flex-wrap gap-4">
      {availableAssets.map((asset, index) => {
        return <Card key={index} asset={asset} />;
      })}
    </div>
  );
};

export default AvailableAssets;
