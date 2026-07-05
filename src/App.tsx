/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { AppScreen, Product, CartItem, Order } from "./types";
import { PRODUCTS, SAVED_ITEMS_INITIAL, ORDERS_MOCK } from "./data";
import SplashScreen from "./components/SplashScreen";
import OnboardingScreens from "./components/OnboardingScreens";
import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import CategoriesScreen from "./components/CategoriesScreen";
import SavedScreen from "./components/SavedScreen";
import ProfileScreen from "./components/ProfileScreen";
import OrdersScreen from "./components/OrdersScreen";
import PaymentScreen from "./components/PaymentScreen";
import ProductDetailsScreen from "./components/ProductDetailsScreen";
import { HelpCircle, ChevronRight, Layers, Eye, Smartphone } from "lucide-react";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.Splash);
  
  // Shopping Cart state
  const [cart, setCart] = useState<CartItem[]>([]);

  // Wishlist state
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // Historic Orders state
  const [orders, setOrders] = useState<Order[]>([]);

  // User Profile state
  const [profile, setProfile] = useState<any>(null);

  // Active product selection for the detail screen
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);

  // Prototype Controller settings
  const [showController, setShowController] = useState(false);

  // Load user profile and synchronised state from Firestore on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setCart(data.cart || []);
          setSavedIds(data.savedIds || []);
          setOrders(data.orders || []);
          setProfile(data);
        }
      } catch (err) {
        console.error("Error loading profile from database, using fallbacks:", err);
        // Fallbacks for offline or bootstrap stage
        setCart([
          {
            product: PRODUCTS[0],
            quantity: 1,
            selectedWeight: "500g"
          },
          {
            product: PRODUCTS[2],
            quantity: 1,
            selectedWeight: "250g"
          }
        ]);
        setSavedIds(SAVED_ITEMS_INITIAL);
        setOrders(ORDERS_MOCK);
      }
    };
    loadProfile();
  }, []);

  const handleToggleSave = async (productId: string) => {
    const updatedSavedIds = savedIds.includes(productId)
      ? savedIds.filter((id) => id !== productId)
      : [...savedIds, productId];
    
    setSavedIds(updatedSavedIds);
    setProfile((prev: any) => prev ? { ...prev, savedIds: updatedSavedIds } : null);

    try {
      await fetch("/api/profile/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ savedIds: updatedSavedIds })
      });
    } catch (err) {
      console.error("Failed to update saved list on server:", err);
    }
  };

  const handleAddToCart = async (product: Product, quantity: number, weight: string) => {
    let updatedCart: CartItem[] = [];
    const existing = cart.find(
      (item) => item.product.id === product.id && item.selectedWeight === weight
    );
    if (existing) {
      updatedCart = cart.map((item) =>
        item.product.id === product.id && item.selectedWeight === weight
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cart, { product, quantity, selectedWeight: weight }];
    }

    setCart(updatedCart);
    setProfile((prev: any) => prev ? { ...prev, cart: updatedCart } : null);

    try {
      await fetch("/api/profile/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: updatedCart })
      });
    } catch (err) {
      console.error("Failed to update cart on server:", err);
    }
  };

  const handleClearCart = async () => {
    setCart([]);
    setProfile((prev: any) => prev ? { ...prev, cart: [] } : null);
    try {
      await fetch("/api/profile/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: [] })
      });
    } catch (err) {
      console.error("Failed to clear cart on server:", err);
    }
  };

  const handleAddMockOrder = async (
    amount: number, 
    images: string[],
    singleItemName?: string,
    singleItemDetails?: string,
    singleItemImage?: string
  ) => {
    const newOrder: Order = {
      id: "FN-" + Math.floor(10000 + Math.random() * 90000),
      status: "Order Processing",
      date: "Today",
      itemsCount: images.length > 0 ? images.length : 1,
      totalAmount: amount,
      images,
      singleItemName,
      singleItemDetails,
      singleItemImage
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    setCart([]); // Clean cart locally

    try {
      const res = await fetch("/api/profile/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: newOrder })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const finalOrdersList = data.orders || updatedOrders;
          setOrders(finalOrdersList);
          setProfile((prev: any) => prev ? {
            ...prev,
            orders: finalOrdersList,
            rewardsPoints: data.rewardsPoints !== undefined ? data.rewardsPoints : prev.rewardsPoints,
            cart: []
          } : null);
        }
      }
    } catch (err) {
      console.error("Failed to post order to server:", err);
    }
  };

  const handleUpgradeMembership = async () => {
    try {
      const res = await fetch("/api/profile/upgrade", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setProfile((prev: any) => prev ? { ...prev, membershipStatus: data.membershipStatus } : null);
          return true;
        }
      }
    } catch (err) {
      console.error("Failed to upgrade membership on server:", err);
    }
    return false;
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen(AppScreen.ProductDetails);
  };

  // Filter products by category back to the home screen
  const handleFilterCategory = (categoryName: string) => {
    // Category filtered in home screen search queries automatically
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6]">
      {/* ── Active Screens Routing ── */}
      <div className="w-full">
        {currentScreen === AppScreen.Splash && (
          <SplashScreen onComplete={() => setCurrentScreen(AppScreen.Onboarding1)} />
        )}

        {currentScreen === AppScreen.Onboarding1 && (
          <OnboardingScreens 
            onNextScreen={() => setCurrentScreen(AppScreen.Login)}
            onSkip={() => setCurrentScreen(AppScreen.Login)}
          />
        )}

        {/* Prototype routing maps for spec references */}
        {currentScreen === AppScreen.Onboarding2 && (
          <OnboardingScreens 
            onNextScreen={() => setCurrentScreen(AppScreen.Login)}
            onSkip={() => setCurrentScreen(AppScreen.Login)}
          />
        )}

        {currentScreen === AppScreen.Onboarding3 && (
          <OnboardingScreens 
            onNextScreen={() => setCurrentScreen(AppScreen.Login)}
            onSkip={() => setCurrentScreen(AppScreen.Login)}
          />
        )}

        {currentScreen === AppScreen.Login && (
          <LoginScreen onLoginSuccess={() => setCurrentScreen(AppScreen.Home)} />
        )}

        {currentScreen === AppScreen.Home && (
          <HomeScreen 
            onNavigate={setCurrentScreen}
            onSelectProduct={handleSelectProduct}
            cart={cart}
            onAddToCart={handleAddToCart}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {currentScreen === AppScreen.Categories && (
          <CategoriesScreen 
            onNavigate={setCurrentScreen}
            onFilterCategory={handleFilterCategory}
            cart={cart}
          />
        )}

        {currentScreen === AppScreen.Saved && (
          <SavedScreen 
            onNavigate={setCurrentScreen}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onAddToCart={handleAddToCart}
            cart={cart}
          />
        )}

        {currentScreen === AppScreen.Profile && (
          <ProfileScreen 
            onNavigate={setCurrentScreen}
            cart={cart}
            onLogout={() => setCurrentScreen(AppScreen.Login)}
            profile={profile}
            orders={orders}
            onUpgrade={handleUpgradeMembership}
          />
        )}

        {currentScreen === AppScreen.Orders && (
          <OrdersScreen 
            onNavigate={setCurrentScreen}
            cart={cart}
            orders={orders}
          />
        )}

        {currentScreen === AppScreen.Payment && (
          <PaymentScreen 
            onNavigate={setCurrentScreen}
            cart={cart}
            onClearCart={handleClearCart}
            onAddMockOrder={handleAddMockOrder}
          />
        )}

        {currentScreen === AppScreen.ProductDetails && (
          <ProductDetailsScreen 
            product={selectedProduct}
            onNavigate={setCurrentScreen}
            cart={cart}
            onAddToCart={handleAddToCart}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectProduct={handleSelectProduct}
          />
        )}
      </div>

      {/* ── Floating Interactive Prototype Controller ── */}
      <div className="fixed bottom-24 right-4 z-50">
        <div className="relative">
          {/* Main Floating button */}
          <button 
            onClick={() => setShowController(!showController)}
            className="w-12 h-12 bg-amber-500 hover:bg-amber-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-amber-400"
            title="Prototype Navigator"
          >
            <Layers className="w-5 h-5" />
          </button>

          {/* Quick jump list sheet */}
          {showController && (
            <div className="absolute bottom-14 right-0 w-64 bg-white rounded-2xl shadow-2xl p-4 border border-neutral-200/80 space-y-3 z-50 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                <span className="font-extrabold text-neutral-800 flex items-center gap-1">
                  <Smartphone className="w-4 h-4 text-emerald-800" />
                  <span>Interactive Specs</span>
                </span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full uppercase">11 Screens</span>
              </div>

              <div className="space-y-1 max-h-72 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-200">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider py-1">Initial Flows</p>
                
                <button 
                  onClick={() => { setCurrentScreen(AppScreen.Splash); setShowController(false); }}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex justify-between items-center ${currentScreen === AppScreen.Splash ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-neutral-50 text-neutral-600"}`}
                >
                  <span>1. Splash Screen</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider py-1 mt-2">Onboarding Steps</p>

                <button 
                  onClick={() => { setCurrentScreen(AppScreen.Onboarding1); setShowController(false); }}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex justify-between items-center ${currentScreen === AppScreen.Onboarding1 ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-neutral-50 text-neutral-600"}`}
                >
                  <span>5. Onboarding 1 - Branded</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button 
                  onClick={() => { setCurrentScreen(AppScreen.Onboarding2); setShowController(false); }}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex justify-between items-center ${currentScreen === AppScreen.Onboarding2 ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-neutral-50 text-neutral-600"}`}
                >
                  <span>6. Onboarding 2 - Aligned</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button 
                  onClick={() => { setCurrentScreen(AppScreen.Onboarding3); setShowController(false); }}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex justify-between items-center ${currentScreen === AppScreen.Onboarding3 ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-neutral-50 text-neutral-600"}`}
                >
                  <span>7. Onboarding 3 - Aligned</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider py-1 mt-2">Authentication</p>

                <button 
                  onClick={() => { setCurrentScreen(AppScreen.Login); setShowController(false); }}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex justify-between items-center ${currentScreen === AppScreen.Login ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-neutral-50 text-neutral-600"}`}
                >
                  <span>8. Login / Sign Up - Branded</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider py-1 mt-2">Shopping Experience</p>

                <button 
                  onClick={() => { setCurrentScreen(AppScreen.Home); setShowController(false); }}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex justify-between items-center ${currentScreen === AppScreen.Home ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-neutral-50 text-neutral-600"}`}
                >
                  <span>2. Customer Home - Luxury</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button 
                  onClick={() => { setCurrentScreen(AppScreen.Categories); setShowController(false); }}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex justify-between items-center ${currentScreen === AppScreen.Categories ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-neutral-50 text-neutral-600"}`}
                >
                  <span>3. Categories Grid</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button 
                  onClick={() => { setCurrentScreen(AppScreen.Saved); setShowController(false); }}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex justify-between items-center ${currentScreen === AppScreen.Saved ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-neutral-50 text-neutral-600"}`}
                >
                  <span>4. Saved Items</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button 
                  onClick={() => { setCurrentScreen(AppScreen.ProductDetails); setShowController(false); }}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex justify-between items-center ${currentScreen === AppScreen.ProductDetails ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-neutral-50 text-neutral-600"}`}
                >
                  <span>Bonus: Product Details</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider py-1 mt-2">Account &amp; History</p>

                <button 
                  onClick={() => { setCurrentScreen(AppScreen.Profile); setShowController(false); }}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex justify-between items-center ${currentScreen === AppScreen.Profile ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-neutral-50 text-neutral-600"}`}
                >
                  <span>9. User Profile</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button 
                  onClick={() => { setCurrentScreen(AppScreen.Orders); setShowController(false); }}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex justify-between items-center ${currentScreen === AppScreen.Orders ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-neutral-50 text-neutral-600"}`}
                >
                  <span>10. My Orders Tracker</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>

                <button 
                  onClick={() => { setCurrentScreen(AppScreen.Payment); setShowController(false); }}
                  className={`w-full text-left p-2 rounded-lg transition-colors flex justify-between items-center ${currentScreen === AppScreen.Payment ? "bg-emerald-50 text-emerald-800 font-bold" : "hover:bg-neutral-50 text-neutral-600"}`}
                >
                  <span>11. Payment Selection</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
