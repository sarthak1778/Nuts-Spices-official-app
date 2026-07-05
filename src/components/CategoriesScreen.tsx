/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Search, 
  Home as HomeIcon, 
  Grid, 
  Bookmark, 
  Receipt, 
  User 
} from "lucide-react";
import { AppScreen, Product, CartItem } from "../types";
import { CATEGORIES } from "../data";

interface CategoriesScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onFilterCategory: (categoryName: string) => void;
  cart: CartItem[];
}

export default function CategoriesScreen({
  onNavigate,
  onFilterCategory,
  cart
}: CategoriesScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredCategories = CATEGORIES.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (categoryName: string) => {
    onFilterCategory(categoryName);
    onNavigate(AppScreen.Home);
  };

  return (
    <div className="bg-[#FAF9F6] text-neutral-800 font-sans min-h-screen pb-28">
      {/* Top Header */}
      <header className="sticky top-0 bg-[#FAF9F6]/90 backdrop-blur-md z-40 border-b border-neutral-200/40">
        <div className="flex justify-between items-center px-6 py-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate(AppScreen.Home)}
              className="p-2 hover:bg-neutral-200/50 transition-colors rounded-full active:scale-95 cursor-pointer text-emerald-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-bold text-xl text-emerald-800 tracking-tight" style={{ fontFamily: "EB Garamond, serif", fontSize: "22px" }}>
              Boutique Categories
            </h1>
          </div>

          <button 
            onClick={() => onNavigate(AppScreen.Payment)}
            className="p-2 hover:bg-neutral-200/50 transition-colors rounded-full relative active:scale-95 cursor-pointer text-emerald-800"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalCartCount > 0 && (
              <span className="absolute top-1 right-1 bg-emerald-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-sm">
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5 group-focus-within:text-emerald-800 transition-colors" />
            <input 
              type="text"
              placeholder="Search for categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white h-14 pl-12 pr-4 rounded-[20px] border-none shadow-[0px_8px_24px_rgba(0,0,0,0.02)] focus:ring-2 focus:ring-emerald-800 outline-none transition-all text-neutral-800 text-sm"
            />
          </div>
        </section>

        {/* Categories Asymmetrical Bento/Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group cursor-pointer active:scale-95 transition-transform duration-200 text-center"
            >
              <div className="aspect-square rounded-[24px] bg-[#efeeeb] overflow-hidden shadow-[0px_10px_30px_rgba(0,0,0,0.04)] group-hover:shadow-[0px_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 relative border border-neutral-200/30">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={cat.image} 
                  alt={cat.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 
                className="mt-4 text-emerald-800 font-bold text-lg select-none hover:text-emerald-950 transition-colors"
                style={{ fontFamily: "EB Garamond, serif", fontSize: "20px" }}
              >
                {cat.name}
              </h3>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="col-span-full text-center py-16 space-y-2">
              <p className="text-neutral-500 font-medium">No boutique category matches "{searchQuery}".</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="text-emerald-800 font-bold underline"
              >
                Show all categories
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
            className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-800 transition-all cursor-pointer"
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-wider mt-1 font-semibold">Home</span>
          </button>
          
          <button 
            onClick={() => onNavigate(AppScreen.Categories)}
            className="flex flex-col items-center justify-center text-emerald-800 transition-all scale-105 cursor-pointer"
          >
            <Grid className="w-5 h-5 fill-emerald-800 text-emerald-800" />
            <span className="text-[10px] uppercase tracking-wider mt-1 font-bold">Categories</span>
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
