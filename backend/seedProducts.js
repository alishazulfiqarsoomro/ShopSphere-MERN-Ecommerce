const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Classic Leather Bag",
    description:
      "A timeless premium leather bag designed for everyday style and comfort.",
    price: 89,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
    stock: 25,
    rating: 4.9,
    numReviews: 42,
  },

  {
    name: "Minimal Watch",
    description:
      "A clean and elegant minimalist watch that complements every outfit.",
    price: 129,
    category: "Watches",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
    stock: 18,
    rating: 4.8,
    numReviews: 35,
  },

  {
    name: "Premium Sneakers",
    description:
      "Comfortable premium sneakers built for everyday movement and modern style.",
    price: 99,
    category: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    stock: 30,
    rating: 4.9,
    numReviews: 56,
  },

  {
    name: "Luxury Headphones",
    description:
      "Premium wireless-style headphones with a sleek design and immersive sound.",
    price: 149,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
    stock: 15,
    rating: 4.7,
    numReviews: 29,
  },

  {
    name: "Modern Sunglasses",
    description:
      "Stylish modern sunglasses designed to complete your everyday look.",
    price: 59,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80",
    stock: 40,
    rating: 4.8,
    numReviews: 31,
  },

  {
    name: "Premium Backpack",
    description:
      "A spacious and stylish backpack perfect for work, study and travel.",
    price: 79,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
    stock: 22,
    rating: 4.6,
    numReviews: 24,
  },

  {
    name: "Wireless Speaker",
    description:
      "Compact wireless speaker with a modern design and powerful sound.",
    price: 89,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=80",
    stock: 20,
    rating: 4.7,
    numReviews: 37,
  },

  {
    name: "Elegant Handbag",
    description:
      "Elegant everyday handbag with a sophisticated premium finish.",
    price: 109,
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
    stock: 17,
    rating: 4.9,
    numReviews: 45,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("✅ Products added successfully!");
    console.log(`✅ Total products: ${products.length}`);

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Product seeding failed:");
    console.error(error.message);

    process.exit(1);
  }
};

seedProducts();