/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  ShoppingBag, 
  Search, 
  Star, 
  Heart, 
  ShoppingCart, 
  Home as HomeIcon, 
  Grid, 
  Bookmark, 
  Receipt, 
  User, 
  ChevronRight,
  Sparkles,
  CheckCircle2,
  X
} from "lucide-react";
import { AppScreen, Product, CartItem } from "../types";
import { PRODUCTS, CATEGORIES, FORMAT_CURRENCY } from "../data";

interface HomeScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onSelectProduct: (product: Product) => void;
  cart: CartItem[];
  onAddToCart: (product: Product, quantity: number, weight: string) => void;
  savedIds: string[];
  onToggleSave: (productId: string) => void;
}

export default function HomeScreen({
  onNavigate,
  onSelectProduct,
  cart,
  onAddToCart,
  savedIds,
  onToggleSave
}: HomeScreenProps) {
  // Counting items in the bag
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Ticking countdown timer for curated deals
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 4, minutes: 22, seconds: 15 }; // Reset
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimerValue = (num: number) => num.toString().padStart(2, "0");

  const [sortBy, setSortBy] = useState<string>("default");

  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    }
    if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    if (sortBy === "popularity") {
      return b.rating - a.rating;
    }
    return 0; // default order
  });

  // Manage individual item "Added to Bag" checkmark indicators
  const [addedIndicator, setAddedIndicator] = useState<{ [key: string]: boolean }>({});

  const handleAddClick = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Avoid triggering card click
    onAddToCart(product, 1, "500g");
    setAddedIndicator((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIndicator((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="bg-[#FAF9F6] text-neutral-800 font-sans min-h-screen pb-28">
      {/* Top Header Navigation */}
      <header className="sticky top-0 bg-[#FAF9F6]/90 backdrop-blur-md z-40 border-b border-neutral-200/40">
        <div className="flex justify-between items-center px-6 py-4 max-w-5xl mx-auto">
          <button 
            onClick={() => onNavigate(AppScreen.Profile)}
            className="p-2 hover:bg-neutral-200/50 transition-colors rounded-full active:scale-95 cursor-pointer"
          >
            <Menu className="text-emerald-800 w-6 h-6" />
          </button>
          
          <h1 
            onClick={() => onNavigate(AppScreen.Home)}
            className="font-bold text-2xl text-emerald-800 italic select-none cursor-pointer"
            style={{ fontFamily: "EB Garamond, serif" }}
          >
            Nuts &amp; Spices
          </h1>

          <button 
            onClick={() => onNavigate(AppScreen.Payment)}
            className="p-2 hover:bg-neutral-200/50 transition-colors rounded-full relative active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="text-emerald-800 w-6 h-6" />
            {totalCartCount > 0 && (
              <span className="absolute top-1 right-1 bg-emerald-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce shadow-sm">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-6 space-y-8">
        {/* Search Bar Section */}
        <section className="relative">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5 group-focus-within:text-emerald-800 transition-colors" />
            <input 
              type="text"
              placeholder="Search our premium collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/75 border border-neutral-200/80 h-14 pl-12 pr-12 rounded-full shadow-[0px_8px_24px_rgba(0,0,0,0.02)] focus:ring-1 focus:ring-emerald-800/30 focus:border-emerald-800 focus:bg-white outline-none transition-all text-neutral-800 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-emerald-800 transition-colors cursor-pointer p-1 rounded-full hover:bg-neutral-100/80"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </section>

        {/* If searching, show nice result heading */}
        {searchQuery ? (
          <div className="px-1">
            <h3 className="text-xl font-bold text-neutral-900">
              Search Results for "{searchQuery}" ({filteredProducts.length})
            </h3>
          </div>
        ) : (
          <>
            {/* Promo Slider Banner Section */}
            <section className="relative overflow-hidden rounded-3xl shadow-sm border border-neutral-200/20">
              <div className="aspect-[16/9] sm:aspect-[21/8] relative overflow-hidden bg-emerald-900 group">
                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/40 to-transparent flex flex-col justify-center px-8 sm:px-12 space-y-2 sm:space-y-3">
                  <span className="text-amber-400 font-bold text-xs tracking-[0.2em] uppercase">
                    Limited Edition
                  </span>
                  <h2 className="text-white text-2xl sm:text-4xl font-semibold tracking-tight max-w-md font-display leading-tight">
                    The Festival Collection
                  </h2>
                  <p className="text-white/80 text-sm sm:text-base max-w-xs pb-2 font-light">
                    Curated luxury gift boxes for moments that matter.
                  </p>
                  <button 
                    onClick={() => onNavigate(AppScreen.Categories)}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-semibold self-start hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                  >
                    Discover Now
                  </button>
                </div>
                {/* Background image */}
                <div 
                  className="absolute inset-0 scale-105 group-hover:scale-100 transition-transform duration-1000 bg-cover bg-center" 
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWXTtJvx6woHfoKMwGA-eJW70Q85ZO2-0t1ft3w5dSFcSqWxzcl2tqbd7f8mAZu9rpUV7W0mpba2fn4WqWovTygTJ0vI_lz-q8fKcTATFejw1MZBq4tTOzNNdz9ujZAOe0DhjJk-9OW9138UrjJFaylKAt-9DnkSh5oEpJeo3TKaoptHsco3do5TAkWSFz-fK-viKKgHjcVJqvBudtbNSFLdnjeE2kn7A-8nMcoBBQ1KCW__n0qybdvUB9o7RbsTV1BNPp9TFX7QlY')`
                  }}
                />
              </div>
            </section>

            {/* Categories Circle Selector */}
            <section className="space-y-3">
              <div className="flex justify-between items-baseline px-1">
                <h3 className="font-bold text-xl text-neutral-900 tracking-tight" style={{ fontFamily: "EB Garamond, serif", fontSize: "22px" }}>
                  Boutique Selection
                </h3>
                <button 
                  onClick={() => onNavigate(AppScreen.Categories)}
                  className="text-emerald-800 font-semibold text-xs uppercase tracking-wider hover:underline cursor-pointer"
                >
                  View All
                </button>
              </div>
              
              <div className="flex gap-6 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-thin scrollbar-thumb-neutral-200">
                {CATEGORIES.map((cat) => (
                  <div 
                    key={cat.id}
                    onClick={() => onNavigate(AppScreen.Categories)}
                    className="flex flex-col items-center gap-2 group cursor-pointer shrink-0"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-neutral-200/60 p-1 transition-all duration-300 group-hover:border-emerald-600/40 shadow-sm bg-white">
                      <div className="w-full h-full rounded-full overflow-hidden grayscale-[0.2] group-hover:grayscale-0 transition-all">
                        <img 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          src={cat.image} 
                          alt={cat.name} 
                        />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-neutral-700 tracking-wide group-hover:text-emerald-800 transition-colors">
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curated Deals / Flash Sale Section */}
            <section className="bg-white border border-amber-200 rounded-3xl p-6 shadow-[0px_10px_30px_rgba(0,0,0,0.02)] relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl" />
              
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Curated Deals</span>
                  </div>
                  <h3 className="font-bold text-xl text-neutral-900" style={{ fontFamily: "EB Garamond, serif", fontSize: "22px" }}>
                    Golden Hours Selection
                  </h3>
                </div>
                
                {/* Interactive Ticking Timer */}
                <div className="bg-amber-100 border border-amber-200 text-amber-800 px-4 py-2 rounded-full font-mono font-bold text-sm self-start sm:self-center shadow-inner">
                  {formatTimerValue(timeLeft.hours)}:{formatTimerValue(timeLeft.minutes)}:{formatTimerValue(timeLeft.seconds)}
                </div>
              </div>

              {/* Deal Cards Container */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                {/* Raisins Card */}
                <div 
                  onClick={() => onNavigate(AppScreen.Categories)}
                  className="bg-neutral-50/70 p-4 rounded-2xl flex flex-col gap-3 items-center border border-amber-500/10 hover:border-amber-500/30 hover:bg-neutral-50 transition-all cursor-pointer group"
                >
                  <div className="w-20 h-20 bg-white rounded-full p-2 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                    <img 
                      className="w-full h-full object-contain" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWzLNFX6isXaJsV2tLbrCLin69rb55JhBg09Ef44cz7SYlb_qQYin91FrS0K0n-WBnJzzjI3oo6bRfieqgbhbpS602wSQZgd2AzIqmaMkdh--qpPipHQW1NgT7ASvaP62GslS6DUgrGSlsBnc5UJM26tO2I2AYwhl3OYFHFVh2cdNgl6ZnrV3Xyap6dr7-C8Te2QEcttPYrvZPBeXjoCFc8HqFTXPQb7O8w1w8LgsivVuMx5iBZvtgZ5w7rK4jHBBDtaW969BzfYDX" 
                      alt="Golden Raisins" 
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-neutral-700 mb-1">Golden Raisins</p>
                    <p className="text-emerald-700 font-extrabold text-xs bg-emerald-100/50 px-2 py-0.5 rounded-full">40% OFF</p>
                  </div>
                </div>

                {/* Apricots Card */}
                <div 
                  onClick={() => onNavigate(AppScreen.Categories)}
                  className="bg-neutral-50/70 p-4 rounded-2xl flex flex-col gap-3 items-center border border-amber-500/10 hover:border-amber-500/30 hover:bg-neutral-50 transition-all cursor-pointer group"
                >
                  <div className="w-20 h-20 bg-white rounded-full p-2 overflow-hidden shadow-sm group-hover:scale-105 transition-transform">
                    <img 
                      className="w-full h-full object-contain" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsveQSbLeRxSNJSMUhiMumsy4m0MerrDCJD4q7A72qwRdk10DoPIdLqCzIvw7aARXvW4LKNJeWhm_CG8xuQ6pfpHwq-Nv6QN99Pj3z92wqVw7rkyqI8PeHzj6y_3E-3e-0X5Y9CQU2DqovV6aM3jGS5yGB2jwVaAXZp1QMqu1YNQmo0gU2LkTcqPCklNodgrH0u3DG8nMgcbIg4fJ13oXBvBvEBORgJiZ1a4dBpeI63z6POK4f9MZ3gHlgkm1bTcDj98iISbqTNzg1" 
                      alt="Dried Apricots" 
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-neutral-700 mb-1">Dried Apricots</p>
                    <p className="text-amber-800 font-extrabold text-xs bg-amber-100 px-2 py-0.5 rounded-full">Buy 1 Get 1</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Featured Products Selection */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
            <h3 className="font-bold text-xl text-neutral-900" style={{ fontFamily: "EB Garamond, serif", fontSize: "22px" }}>
              {searchQuery ? "Matching Premium Items" : "Featured Premium Selection"}
            </h3>
            
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 font-semibold tracking-wide uppercase">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-neutral-200/80 hover:border-neutral-300 hover:bg-neutral-50/50 text-neutral-700 text-xs font-semibold px-4 py-2 pr-8 rounded-full shadow-[0px_4px_12px_rgba(0,0,0,0.01)] focus:outline-none focus:ring-1 focus:ring-emerald-800/30 focus:border-emerald-800 transition-all cursor-pointer h-9"
                >
                  <option value="default">Featured (Default)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popularity">Popularity (Rating)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sortedAndFilteredProducts.map((product) => {
              const isSaved = savedIds.includes(product.id);
              const isAdded = addedIndicator[product.id];
              
              return (
                <div 
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group flex flex-col cursor-pointer"
                >
                  {/* Image Card Container */}
                  <div className="relative bg-white rounded-3xl p-4 mb-3 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border border-neutral-200/40 shadow-sm flex items-center justify-center min-h-[160px] sm:min-h-[200px]">
                    <div className="aspect-square w-full relative flex items-center justify-center">
                      <img 
                        className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-500" 
                        src={product.image} 
                        alt={product.name} 
                      />
                    </div>

                    {/* Saved Heart Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(product.id);
                      }}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm text-neutral-500 hover:text-red-500 hover:scale-105 transition-all cursor-pointer active:scale-90"
                    >
                      <Heart className={`w-4 h-4 transition-colors ${isSaved ? "fill-red-500 text-red-500" : "text-neutral-500"}`} />
                    </button>

                    {/* Category Label Capsule */}
                    {product.organic && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Organic
                        </span>
                      </div>
                    )}
                    {product.bestSeller && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-amber-50 text-amber-800 border border-amber-100 text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Best Seller
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text Details & CTA */}
                  <div className="px-1 flex flex-col items-center text-center space-y-1.5 flex-1 justify-between">
                    <h4 className="font-semibold text-sm leading-tight text-neutral-800 group-hover:text-emerald-800 transition-colors line-clamp-2 h-10 flex items-center">
                      {product.name}
                    </h4>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-800 font-extrabold text-sm sm:text-base">
                        {FORMAT_CURRENCY(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-neutral-400 text-xs line-through">
                          {FORMAT_CURRENCY(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Interactive Add to Bag Button */}
                    <button 
                      onClick={(e) => handleAddClick(e, product)}
                      className={`w-full mt-2 py-2.5 rounded-full text-xs font-semibold hover:opacity-95 transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                        isAdded 
                          ? "bg-emerald-600 text-white shadow-emerald-600/10" 
                          : "bg-emerald-800 text-white hover:bg-emerald-950 shadow-emerald-800/10"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {sortedAndFilteredProducts.length === 0 && (
            <div className="text-center py-16 space-y-3">
              <p className="text-neutral-500 font-medium">No premium items match "{searchQuery}".</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="text-emerald-800 font-bold underline"
              >
                Clear search filter
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Shared Bottom Mobile Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-40 bg-white/90 backdrop-blur-xl border-t border-neutral-200/50 shadow-[0px_-8px_30px_rgba(0,0,0,0.03)] h-20 px-6 pb-2">
        <div className="flex justify-around items-center h-full max-w-lg mx-auto">
          <button 
            onClick={() => onNavigate(AppScreen.Home)}
            className="flex flex-col items-center justify-center text-emerald-800 transition-all scale-105 cursor-pointer"
          >
            <HomeIcon className="w-5 h-5 fill-emerald-800 text-emerald-800" />
            <span className="text-[10px] uppercase tracking-wider mt-1 font-bold">Home</span>
          </button>
          
          <button 
            onClick={() => onNavigate(AppScreen.Categories)}
            className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-800 transition-all cursor-pointer"
          >
            <Grid className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-wider mt-1 font-semibold">Categories</span>
          </button>

          <button 
            onClick={() => onNavigate(AppScreen.Saved)}
            className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-800 transition-all cursor-pointer"
          >
            <Bookmark className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-wider mt-1 font-semibold">Saved</span>
          </button>

          <button 
            onClick={() => onNavigate(AppScreen.Orders)}
            className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-800 transition-all cursor-pointer"
          >
            <Receipt className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-wider mt-1 font-semibold">Orders</span>
          </button>

          <button 
            onClick={() => onNavigate(AppScreen.Profile)}
            className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-800 transition-all cursor-pointer"
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-wider mt-1 font-semibold">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
