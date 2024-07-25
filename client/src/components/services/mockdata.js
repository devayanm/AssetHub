export const generateSampleBuySellData = (numProducts) => {
  const categories = ["Real Estate", "Vehicles", "Properties"];
  const products = [];

  for (let i = 1; i <= numProducts; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    let name, description, price, image;

    switch (category) {
      case "Real Estate":
        name = `Real Estate ${i}`;
        description = "Description for property";
        price = Math.floor(Math.random() * 1000000) + 50000;
        image = "path/to/real_estate_image.jpg";
        break;
      case "Vehicles":
        name = `Vehicle ${i}`;
        description = "Description for vehicle";
        price = Math.floor(Math.random() * 100000) + 1000;
        image = "path/to/vehicle_image.jpg";
        break;
      case "Properties":
        name = `Property ${i}`;
        description = "Description for property";
        price = Math.floor(Math.random() * 5000000) + 100000;
        image = "path/to/property_image.jpg";
        break;
      default:
        name = `Product ${i}`;
        description = "Description for product";
        price = Math.floor(Math.random() * 1000) + 50;
        image = "path/to/default_image.jpg";
    }

    products.push({
      id: i,
      name,
      description,
      price,
      category,
      image,
    });
  }

  return products;
};

export const generateSampleRentData = (numAssets) => {
  const categories = ["Vehicle", "Property", "Real Estate"];
  const sampleData = [];

  for (let i = 1; i <= numAssets; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    let name, location, description, pricePerDay, image;

    switch (category) {
      case "Real Estate":
        name = `Real Estate ${i}`;
        location = `Location ${i}`;
        description = "Description for real estate";
        pricePerDay = (Math.random() * 200 + 50).toFixed(2); 
        image = "path/to/real_estate_image.jpg";
        break;
      case "Vehicle":
        name = `Vehicle ${i}`;
        location = `Location ${i}`;
        description = "Description for vehicle";
        pricePerDay = (Math.random() * 50 + 10).toFixed(2);
        image = "path/to/vehicle_image.jpg";
        break;
      case "Property":
        name = `Property ${i}`;
        location = `Location ${i}`;
        description = "Description for property";
        pricePerDay = (Math.random() * 100 + 20).toFixed(2);
        image = "path/to/property_image.jpg";
        break;
      default:
        name = `Asset ${i}`;
        location = `Location ${i}`;
        description = "Description for asset";
        pricePerDay = (Math.random() * 100 + 10).toFixed(2);
        image = "path/to/default_image.jpg";
    }

    sampleData.push({
      id: i,
      name,
      location,
      description,
      pricePerDay,
      image,
      category,
    });
  }

  return sampleData;
};
