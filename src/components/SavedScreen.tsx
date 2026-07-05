/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ShoppingBag, 
  X, 
  ShoppingCart, 
  Home as HomeIcon, 
  Grid, 
  Bookmark, 
  Receipt, 
  User, 
  Trash2,
  HeartCrack
} from "lucide-react";
import { AppScreen, Product, CartItem } from "../types";
import { PRODUCTS, FORMAT_CURRENCY } from "../data";

interface SavedScreenProps {
  onNavigate: (screen: AppScreen) => void;
  savedIds: string[];
  onToggleSave: (productId: string) => void;
  onAddToCart: (product: Product, quantity: number, weight: string) => void;
  cart: CartItem[];
}

export default function SavedScreen({
  onNavigate,
  savedIds,
  onToggleSave,
  onAddToCart,
  cart
}: SavedScreenProps) {
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products that are in the saved list
  const savedProducts = PRODUCTS.filter((p) => savedIds.includes(p.id));

  const handleMoveToBag = (product: Product) => {
    // Add to cart with default specs
    onAddToCart(product, 1, "500g");
    // Optionally remove from saved (as requested by typical 'move to bag' flows)
    onToggleSave(product.id);
  };

  return (
    <div className="bg-[#FAF9F6] text-neutral-800 font-sans min-h-screen pb-28">
      {/* Top App Bar */}
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
              Saved Selections
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

      <main className="max-w-3xl mx-auto px-6 pt-6 space-y-8">
        {/* Wishlist Header Description */}
        <section className="flex justify-between items-end border-b border-neutral-200/30 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700 mb-1 block">
              Curated Favorites
            </span>
            <h2 className="text-3xl font-bold text-neutral-900" style={{ fontFamily: "EB Garamond, serif" }}>
              Saved Items
            </h2>
            <div className="h-1 w-12 bg-amber-400 mt-2 rounded-full" />
          </div>
          <p className="text-sm font-semibold text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
            {savedProducts.length} {savedProducts.length === 1 ? "item" : "items"}
          </p>
        </section>

        {/* Wishlist Cards: Asymmetric List View */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {savedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-2xl p-4 shadow-[0px_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0px_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col sm:flex-row gap-4 relative border border-neutral-200/30"
              >
                {/* Remove button */}
                <button 
                  onClick={() => onToggleSave(product.id)}
                  className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-neutral-100/80 backdrop-blur-sm text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90 duration-200 cursor-pointer"
                  title="Remove from saved"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Product Image */}
                <div className="w-full sm:w-36 aspect-square rounded-xl bg-neutral-100/50 overflow-hidden shrink-0 flex items-center justify-center">
                  <img 
                    className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-500" 
                    src={product.image} 
                    alt={product.name}
                  />
                </div>

                {/* Info & Move to Bag CTA */}
                <div className="flex flex-col justify-between flex-grow">
                  <div className="space-y-1 pr-8">
                    <h3 className="font-bold text-lg text-neutral-900 group-hover:text-emerald-800 transition-colors" style={{ fontFamily: "EB Garamond, serif", fontSize: "20px" }}>
                      {product.name}
                    </h3>
                    <p className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                      Premium Quality • 500g
                    </p>
                    <p className="text-lg font-extrabold text-emerald-800 pt-1">
                      {FORMAT_CURRENCY(product.price)}
                    </p>
                  </div>

                  <button 
                    onClick={() => handleMoveToBag(product)}
                    className="mt-4 sm:mt-0 w-full sm:w-auto bg-emerald-50 hover:bg-emerald-100 text-emerald-800 py-2.5 px-5 rounded-xl text-xs font-bold active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer self-start"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {savedProducts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800">
                <HeartCrack className="w-10 h-10 animate-bounce" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-neutral-800" style={{ fontFamily: "EB Garamond, serif", fontSize: "22px" }}>
                  Your Saved Selections is empty
                </h3>
                <p className="text-sm text-neutral-500 max-w-xs leading-relaxed">
                  Start saving your favorite organic fruits and nuts from our luxury catalog to see them here.
                </p>
              </div>
              <button 
                onClick={() => onNavigate(AppScreen.Home)}
                className="bg-emerald-800 hover:bg-emerald-900 text-white py-3 px-8 rounded-xl text-sm font-semibold transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                Explore Products
              </button>
            </motion.div>
          )}
        </div>
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
            className="flex flex-col items-center justify-center text-neutral-400 hover:text-emerald-800 transition-all cursor-pointer"
          >
            <Grid className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-wider mt-1 font-semibold">Categories</span>
          </button>

          <button 
            onClick={() => onNavigate(AppScreen.Saved)}
            className="flex flex-col items-center justify-center text-emerald-800 transition-all scale-105 cursor-pointer"
          >
            <Bookmark className="w-5 h-5 fill-emerald-800 text-emerald-800" />
            <span className="text-[10px] uppercase tracking-wider mt-1 font-bold">Saved</span>
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
