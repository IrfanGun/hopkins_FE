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
import { fetchBanner, Banner } from "src/lib/banners";
import axiosInstance from "src/api/axiosInstance";
import { Category, fetchCategories } from "src/lib/categories";
import { ThemeProvider,Spinner } from "flowbite-react";
import customTheme from "src/components/ui/spinner-custom";
import Link from "next/link";


export default function CategoriesCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlider] = useState<Banner[]>([]);
  const filteredSlides = slides.filter((slide) => slide.page === "Dashboard");
  const [category , setcategory] = useState<Category[]>([]);
  const [Isloading, setIsLoading] = useState<Boolean>(false);


  const generateUniqueKey = (slide: Banner, index: number) => {
    const baseKey = `${slide.id || "no-id"}-${slide.title || "no-title"}-${slide.image || "no-img"}`;
    return `${baseKey}-${index}`;
  };
  
  

  
  
  useEffect(() => {
    const loadSlider = async () => {
     try {

      setIsLoading(true);
      const response = await fetchBanner();
      setSlider(response);

     } catch (error) {
        setIsLoading(false);
     } 
  
    };

    loadCategory();
    loadSlider();
  }, []);

  useEffect(() => {
    if (filteredSlides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [filteredSlides.length]);

  const loadCategory = async() => {

    try {
        
        const response = await fetchCategories();
        setcategory(response);

    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }

  };

 
  // Auto-advance carousel
  useEffect(() => {
    if (filteredSlides.length > 0 && currentSlide >= filteredSlides.length) {
      setCurrentSlide(filteredSlides.length - 1);
    }
  
  }, [filteredSlides, currentSlide]);

  const nextSlide = () => {
    if (filteredSlides.length === 0) return; // Jika tidak ada slide, hentikan
    setCurrentSlide((prev) => (prev + 1) % filteredSlides.length);
  };
  
  const prevSlide = () => {
    if (filteredSlides.length === 0) return; // Jika tidak ada slide, hentikan
    setCurrentSlide((prev) => (prev - 1 + filteredSlides.length) % filteredSlides.length);
  };
  

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Categories sidebar */}
        <div className="rounded-lg bg-white p-4 shadow">
          <ul className="">
            {category.map((category, index) => (
              <li key={index}>
                

                <Link href={`/partners/${category?.name?.toLowerCase()}`} className="flex w-full items-center rounded-md p-2 transition-colors hover:bg-gray-50">
                 {/* <category.icon className="mr-3 h-5 w-5 text-gray-600" /> */}
                    <span className="font-medium">{category?.name}</span>
                  </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Carousel */}

        {Isloading ? (
          <div className=" justify-center flex max-w-screen-sm items-center mb-5 mt-5">
            <ThemeProvider theme={customTheme}>
              <Spinner color="base"/>
            </ThemeProvider>
          </div>

        ) : (

        <div className="relative h-[400px] overflow-hidden rounded-lg md:col-span-3">
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {filteredSlides.map((slide, index) => (
              <li key={generateUniqueKey(slide, index)} className="h-full w-full flex-shrink-0 relative">
                <img
                  src={slide.image}
                  alt={slide.title || `Slide ${index + 1}`}
                  className="h-full w-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
                />
              </li>
            ))}
          </div>

          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-2 backdrop-blur-sm transition-colors hover:bg-white/50">
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-2 backdrop-blur-sm transition-colors hover:bg-white/50">
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
            {filteredSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-colors ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        )

      }
       
      </div>
    </div>
  );
}
