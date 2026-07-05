/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ChevronDown, 
  Home as HomeIcon, 
  Grid, 
  Bookmark, 
  Receipt, 
  User,
  CheckCircle2
} from "lucide-react";
import { AppScreen, Product, CartItem } from "../types";
import { PRODUCTS, FORMAT_CURRENCY } from "../data";

interface ProductDetailsScreenProps {
  product: Product;
  onNavigate: (screen: AppScreen) => void;
  cart: CartItem[];
  onAddToCart: (product: Product, quantity: number, weight: string) => void;
  savedIds: string[];
  onToggleSave: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductDetailsScreen({
  product,
  onNavigate,
  cart,
  onAddToCart,
  savedIds,
  onToggleSave,
  onSelectProduct
}: ProductDetailsScreenProps) {
  const [selectedWeight, setSelectedWeight] = useState(product.weightOptions[0] || "500g");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description"); // description or nutrition
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>("nutritional");

  // Manage individual item "Added to Bag" checkmark indicators
  const [isAdded, setIsAdded] = useState(false);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isSaved = savedIds.includes(product.id);

  // Recommendations: Other products from the catalog
  const recommendations = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedWeight);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const toggleAccordion = (accordionId: string) => {
    if (expandedAccordion === accordionId) {
      setExpandedAccordion(null);
    } else {
      setExpandedAccordion(accordionId);
    }
  };

  return (
    <div className="bg-[#FAF9F6] text-neutral-800 font-sans min-h-screen pb-32">
      {/* Floating Header Actions */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 pointer-events-none">
        <button 
          onClick={() => onNavigate(AppScreen.Home)}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-emerald-800 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer border border-neutral-200/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          <button 
            onClick={() => onToggleSave(product.id)}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-emerald-800 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer border border-neutral-200/20"
          >
            <Heart className={`w-5 h-5 transition-colors ${isSaved ? "fill-red-500 text-red-500" : "text-neutral-500"}`} />
          </button>
          <button 
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-emerald-800 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer border border-neutral-200/20"
            title="Copy product link"
          >
            <Share2 className="w-5 h-5 text-neutral-500" />
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Product Image Gallery */}
          <div className="w-full md:w-1/2 relative h-[50vh] md:h-[75vh] bg-[#f2f4ed] overflow-hidden rounded-b-[40px] md:rounded-3xl border border-neutral-200/20 shadow-sm flex items-center justify-center">
            <img 
              className="w-4/5 h-4/5 object-contain" 
              src={product.image} 
              alt={product.name} 
            />
            {/* Visual Dot slider indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-800" />
              <div className="w-2 h-2 rounded-full bg-neutral-300" />
              <div className="w-2 h-2 rounded-full bg-neutral-300" />
            </div>
          </div>

          {/* Right Column: Detailed Options */}
          <div className="px-6 md:w-1/2 md:pt-12 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-amber-100 text-amber-900 border border-amber-200/50 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Premium Selection
                </span>
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 leading-tight" style={{ fontFamily: "EB Garamond, serif" }}>
                {product.name}
              </h1>
              
              {/* Ratings */}
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <Star className="w-4 h-4 text-amber-500" />
                </div>
                <span className="text-neutral-500 text-xs font-semibold">({product.rating} • {product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3 border-b border-neutral-200/40 pb-4">
              <span className="text-3xl font-extrabold text-emerald-800">
                {FORMAT_CURRENCY(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-neutral-400 text-sm line-through">
                    {FORMAT_CURRENCY(product.originalPrice)}
                  </span>
                  <span className="text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    20% OFF
                  </span>
                </>
              )}
            </div>

            {/* Weight Picker */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">Select Weight</p>
              <div className="flex gap-3">
                {product.weightOptions.map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      selectedWeight === weight
                        ? "border-emerald-800 bg-emerald-800/5 text-emerald-800 ring-1 ring-emerald-800/20"
                        : "border-neutral-200 hover:border-emerald-800 text-neutral-500"
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Features list bento rows */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#f4f3f1] p-3 rounded-xl flex items-center gap-2 border border-neutral-200/20">
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-neutral-700">100% Organic</span>
              </div>
              <div className="bg-[#f4f3f1] p-3 rounded-xl flex items-center gap-2 border border-neutral-200/20">
                <span className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-neutral-700">Rich in Protein</span>
              </div>
            </div>

            {/* Elegant Description and nutrition tabs */}
            <div className="border-t border-neutral-200/40 pt-4 space-y-4">
              <div className="flex border-b border-neutral-200/30">
                <button 
                  onClick={() => setActiveTab("description")}
                  className={`pb-2 text-xs uppercase tracking-widest font-bold pr-6 cursor-pointer border-b-2 transition-all ${
                    activeTab === "description" ? "border-emerald-800 text-emerald-800" : "border-transparent text-neutral-400"
                  }`}
                >
                  Description
                </button>
                <button 
                  onClick={() => setActiveTab("nutrition")}
                  className={`pb-2 text-xs uppercase tracking-widest font-bold px-6 cursor-pointer border-b-2 transition-all ${
                    activeTab === "nutrition" ? "border-emerald-800 text-emerald-800" : "border-transparent text-neutral-400"
                  }`}
                >
                  Nutrition
                </button>
              </div>

              {activeTab === "description" ? (
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  {product.description}
                </p>
              ) : (
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  Per 100g serving: Energy 579kcal, Protein 21g, Total Fat 50g, Dietary Fiber 12.5g. Rich in Vitamin E, Magnesium, and Riboflavin.
                </p>
              )}
            </div>

            {/* Specs Accordions (Nutritional Info, Origin, Sustainable Packaging) */}
            {product.specs && (
              <div className="pt-4 border-t border-neutral-200/30 space-y-0.5">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="border-b border-neutral-200/20">
                    <button
                      onClick={() => toggleAccordion(spec.label)}
                      className="w-full py-4 flex justify-between items-center text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer group"
                    >
                      <span className="text-xs font-bold uppercase tracking-widest">{spec.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        expandedAccordion === spec.label ? "rotate-180" : ""
                      }`} />
                    </button>
                    {expandedAccordion === spec.label && (
                      <div className="pb-4 text-xs text-neutral-500 leading-relaxed">
                        {spec.value}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* You may also like list section */}
        <section className="mt-16 px-6">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900" style={{ fontFamily: "EB Garamond, serif" }}>
                You Might Also Like
              </h2>
              <p className="text-xs text-neutral-400 mt-1">Complement your pantry with these organic finds</p>
            </div>
            <button 
              onClick={() => onNavigate(AppScreen.Categories)}
              className="text-emerald-800 hover:text-emerald-950 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <span className="text-xs">➔</span>
            </button>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-6 -mx-6 px-6 scrollbar-none">
            {recommendations.map((rec) => (
              <div 
                key={rec.id}
                onClick={() => onSelectProduct(rec)}
                className="min-w-[180px] sm:min-w-[240px] shrink-0 group cursor-pointer"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-[#f2f4ed] border border-neutral-200/30 p-4 flex items-center justify-center shadow-sm">
                  <img 
                    className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-500" 
                    src={rec.image} 
                    alt={rec.name} 
                  />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                    <Plus className="w-4 h-4 text-emerald-800" />
                  </div>
                </div>
                <h3 className="font-semibold text-xs text-neutral-800 group-hover:text-emerald-800 transition-colors line-clamp-1">
                  {rec.name}
                </h3>
                <p className="text-emerald-800 font-extrabold text-sm mt-1">{FORMAT_CURRENCY(rec.price)}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Fixed Bottom Checkout Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-neutral-200/40 p-4 z-40 shadow-[0px_-4px_24px_rgba(0,0,0,0.02)]">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          {/* Quantity Selector Counter */}
          <div className="flex items-center gap-3 bg-[#f4f3f1] rounded-xl px-4 py-3 border border-neutral-200/30">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-emerald-800 hover:bg-emerald-800/10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-sm text-neutral-800 w-6 text-center">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="text-emerald-800 hover:bg-emerald-800/10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={handleAddToCart}
            className={`flex-1 h-14 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
              isAdded 
                ? "bg-emerald-600 text-white shadow-emerald-600/15" 
                : "bg-emerald-800 hover:bg-emerald-950 text-white shadow-emerald-800/15"
            }`}
          >
            {isAdded ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
