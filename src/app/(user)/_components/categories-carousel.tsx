"use client";

import { useState, useEffect } from "react";
import {
  Car,
  Hammer,
  Wrench,
  ShoppingCart,
  Scissors,
  Heart,
  Coffee,
  PawPrint,
  Gamepad2,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function CategoriesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { name: "Automotive", icon: Car },
    { name: "Trades & Services", icon: Hammer },
    { name: "Services", icon: Wrench },
    { name: "Retail", icon: ShoppingCart },
    { name: "Beauty", icon: Scissors },
    { name: "Health & Fitness", icon: Heart },
    { name: "Food & Beverages", icon: Coffee },
    { name: "Pets", icon: PawPrint },
    { name: "Recreation", icon: Gamepad2 },
    { name: "Affiliates", icon: Users },
    { name: "Cosmetics", icon: Sparkles },
  ];

  const slides = [
    {
      id: 1,
      title: "Gee Up",
      description: "CODE: Hopkins+ FOR 10% OFF",
      image: "/img/hopkins_img.png?height=400&width=800",
      color: "bg-cyan-400",
    },
    {
      id: 2,
      title: "Summer Sale",
      description: "Up to 50% off selected items",
      image: "/placeholder.svg?height=400&width=800",
      color: "bg-pink-400",
    },
    {
      id: 3,
      title: "New Arrivals",
      description: "Check out our latest products",
      image: "/placeholder.svg?height=400&width=800",
      color: "bg-purple-400",
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Categories sidebar */}
        <div className="rounded-lg bg-white p-4 shadow">
          <ul className="space-y-3">
            {categories.map((category, index) => (
              <li key={index}>
                <button className="flex w-full items-center rounded-md p-2 transition-colors hover:bg-gray-50">
                  <category.icon className="mr-3 h-5 w-5 text-gray-600" />
                  <span className="font-medium">{category.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Carousel */}
        <div className="relative h-[400px] overflow-hidden rounded-lg md:col-span-3">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className={`h-full w-full flex-shrink-0 ${slide.color} relative`}
              >
                <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
                  <h2 className="font-cursive mb-4 text-5xl font-bold">
                    {slide.title}
                  </h2>
                  <p className="inline-block rounded-full bg-white px-4 py-2 text-xl font-bold text-cyan-500">
                    {slide.description}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute right-10 top-10 h-24 w-24 rounded-full bg-pink-300 opacity-50"></div>
                <div className="absolute bottom-20 left-20 h-16 w-16 rounded-full bg-white opacity-20"></div>
                <div className="absolute left-40 top-40 h-12 w-12 rounded-full bg-white opacity-30"></div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-2 backdrop-blur-sm transition-colors hover:bg-white/50"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-2 backdrop-blur-sm transition-colors hover:bg-white/50"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentSlide === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
