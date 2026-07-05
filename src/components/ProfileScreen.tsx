/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Edit3, 
  User, 
  MapPin, 
  CreditCard, 
  Bell, 
  LifeBuoy, 
  LogOut, 
  ChevronRight,
  Home as HomeIcon,
  Grid,
  Bookmark,
  Receipt,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { AppScreen, CartItem, Order } from "../types";

interface ProfileScreenProps {
  onNavigate: (screen: AppScreen) => void;
  cart: CartItem[];
  onLogout: () => void;
  profile: any;
  orders: Order[];
  onUpgrade: () => Promise<boolean>;
}

export default function ProfileScreen({
  onNavigate,
  cart,
  onLogout,
  profile,
  orders,
  onUpgrade
}: ProfileScreenProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const isUpgraded = profile?.membershipStatus === "Gilded Gold Member";
  const displayName = profile?.name || "Julian Alexander";
  const displayEmail = profile?.email || "julian.a@luxuryorganic.com";
  const rewardsPoints = profile?.rewardsPoints ?? 1250;
  const totalOrdersCount = orders?.length ?? 24;

  const handleUpgrade = async () => {
    setLoading(true);
    const success = await onUpgrade();
    setLoading(false);
    if (success) {
      setShowUpgradeModal(false);
    }
  };

  return (
    <div className="min-h-screen text-neutral-800 bg-[#faf9f6] font-sans pb-32">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-[#faf9f6]/95 backdrop-blur-md border-b border-neutral-200/40">
        <div className="flex justify-between items-center px-6 py-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate(AppScreen.Home)}
              className="p-2 hover:bg-neutral-200/50 transition-colors rounded-full active:scale-95 cursor-pointer text-emerald-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-bold text-xl text-emerald-800 tracking-tight" style={{ fontFamily: "EB Garamond, serif", fontSize: "22px" }}>
              My Profile
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

      <main className="max-w-md mx-auto px-6 pt-24 space-y-8">
        {/* Hero Profile Section */}
        <section className="flex flex-col items-center text-center">
          <div className="relative group">
            <div className="w-28 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-[0px_10px_30px_rgba(0,0,0,0.06)] bg-neutral-200">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDREnT5HtVFyJSoTL95NMzraWnTWpv532iP_2cp6fmcM4BTlsFG90wOCzLqFn1oTL1GLFrNzQ8XfNzWQplNBySGjgSB6pSzynJpnqOBNMYpa5IIEebLNaz0pCWVuX7fzrxup9OPUnmvHioVdR3leqWoOfx7F3QpozOu74kg8QgwquhuS1MYIruVs_YEDU09Z8F_YrEjZGl7kCNYkvS6MPF1DpO0iOQx0eQY-9JaQ_6dmH45QWpnSBnoW4-zYRFgnVyVmYoDZtMOSr24" 
                alt="Julian Alexander" 
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-emerald-800 text-white p-2 rounded-full shadow-lg hover:bg-emerald-950 active:scale-95 transition-all cursor-pointer">
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-neutral-900" style={{ fontFamily: "EB Garamond, serif" }}>
              {displayName}
            </h2>
            <p className="text-xs font-semibold text-neutral-400 mt-1 uppercase tracking-wider">
              {isUpgraded ? "★ GILDED GOLD MEMBER ★" : "GILDED MEMBER"}
            </p>
            <p className="text-sm text-neutral-500 font-medium">{displayEmail}</p>
          </div>
        </section>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-2 gap-4">
          {/* Total Orders Box */}
          <div className="bg-amber-500/10 p-4 rounded-2xl flex flex-col justify-between border border-amber-500/10 shadow-sm">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block">Total Orders</span>
            <span className="text-3xl font-extrabold text-amber-950 mt-2">{totalOrdersCount}</span>
          </div>

          {/* Rewards Points Box */}
          <div className="bg-emerald-500/10 p-4 rounded-2xl flex flex-col justify-between border border-emerald-500/10 shadow-sm">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">Rewards Points</span>
            <span className="text-3xl font-extrabold text-emerald-950 mt-2">
              {rewardsPoints.toLocaleString("en-IN")} <span className="text-xs font-bold text-emerald-800 tracking-wide">pts</span>
            </span>
          </div>
        </section>

        {/* Menu Items List */}
        <section className="space-y-3">
          {/* Personal Info */}
          <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-[0px_8px_24px_rgba(0,0,0,0.02)] border border-neutral-200/40 transition-all hover:bg-neutral-50 active:scale-[0.98] group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                <User className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-neutral-800">Personal Information</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>

          {/* Saved Addresses */}
          <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-[0px_8px_24px_rgba(0,0,0,0.02)] border border-neutral-200/40 transition-all hover:bg-neutral-50 active:scale-[0.98] group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-neutral-800">Saved Addresses</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>

          {/* Payment Methods */}
          <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-[0px_8px_24px_rgba(0,0,0,0.02)] border border-neutral-200/40 transition-all hover:bg-neutral-50 active:scale-[0.98] group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-neutral-800">Payment Methods</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>

          {/* Notifications */}
          <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-[0px_8px_24px_rgba(0,0,0,0.02)] border border-neutral-200/40 transition-all hover:bg-neutral-50 active:scale-[0.98] group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-neutral-800">Notifications</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </div>
          </button>

          {/* Help & Support */}
          <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-[0px_8px_24px_rgba(0,0,0,0.02)] border border-neutral-200/40 transition-all hover:bg-neutral-50 active:scale-[0.98] group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                <LifeBuoy className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-neutral-800">Help &amp; Support</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>

          {/* Logout */}
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-[0px_8px_24px_rgba(0,0,0,0.02)] border border-neutral-200/40 transition-all hover:bg-red-50/20 active:scale-[0.98] group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-red-600">Logout</span>
            </div>
            <ChevronRight className="w-4 h-4 text-red-300" />
          </button>
        </section>

        {/* Promo member upgrade banner */}
        {!isUpgraded ? (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-6 shadow-md border border-emerald-800">
            <div className="absolute right-0 top-0 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl" />
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <h3 className="font-bold text-lg" style={{ fontFamily: "EB Garamond, serif", fontSize: "20px" }}>
                  Gilded Gold Membership
                </h3>
                <p className="text-xs text-neutral-300">Get exclusive early access to rare imports.</p>
              </div>
              <button 
                onClick={() => setShowUpgradeModal(true)}
                className="bg-amber-400 hover:bg-amber-500 text-emerald-950 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider self-start sm:self-center transition-all cursor-pointer shadow-sm active:scale-95"
              >
                Upgrade
              </button>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-700 to-amber-900 text-white p-6 shadow-md border border-amber-600">
            <div className="relative z-10 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-300 animate-spin" style={{ animationDuration: "12s" }} />
              <div>
                <h3 className="font-bold text-lg" style={{ fontFamily: "EB Garamond, serif", fontSize: "20px" }}>
                  Active: Gilded Gold Member
                </h3>
                <p className="text-xs text-amber-200">Welcome to elite status. Priority support active.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Upgrade Success Dialog Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl relative border border-neutral-200/50"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 mx-auto">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-neutral-900 font-serif-premium" style={{ fontFamily: "EB Garamond, serif" }}>
                  Gilded Gold Level
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Unlock premium features, free worldwide shipping, early access to limited edition spice batches, and 24/7 dedicated concierge assistance.
                </p>
                <div className="bg-[#FAF9F6] p-3 rounded-xl border border-neutral-200/50 mt-4 text-left">
                  <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Subscription Cost</p>
                  <p className="text-lg font-extrabold text-emerald-800">₹499 <span className="text-xs font-normal text-neutral-500">/ month</span></p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button 
                  onClick={handleUpgrade}
                  disabled={loading}
                  className="bg-emerald-800 hover:bg-emerald-950 disabled:bg-emerald-800/60 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                >
                  {loading ? "Upgrading..." : "Confirm & Upgrade"}
                </button>
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="text-xs font-semibold text-neutral-400 hover:text-neutral-600 transition-colors py-2 cursor-pointer"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
            className="flex flex-col items-center justify-center text-emerald-800 transition-all scale-105 cursor-pointer"
          >
            <User className="w-5 h-5 fill-emerald-800 text-emerald-800" />
            <span className="text-[10px] uppercase tracking-wider mt-1 font-bold">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
