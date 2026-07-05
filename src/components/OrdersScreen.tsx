/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ShoppingBag, 
  MapPin, 
  CheckCircle, 
  Clock, 
  HelpCircle, 
  Home as HomeIcon, 
  Grid, 
  Bookmark, 
  Receipt, 
  User, 
  X,
  MessageSquareCode
} from "lucide-react";
import { AppScreen, CartItem, Order } from "../types";
import { FORMAT_CURRENCY } from "../data";

interface OrdersScreenProps {
  onNavigate: (screen: AppScreen) => void;
  cart: CartItem[];
  orders: Order[];
}

export default function OrdersScreen({ onNavigate, cart, orders }: OrdersScreenProps) {
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const recentOrders = orders.filter(o => o.status !== "Delivered");
  const pastOrders = orders.filter(o => o.status === "Delivered");

  return (
    <div className="min-h-screen text-neutral-800 bg-[#faf9f6] font-sans pb-32">
      {/* Top App Bar */}
      <header className="sticky top-0 bg-[#faf9f6]/95 backdrop-blur-md z-40 border-b border-neutral-200/40">
        <div className="flex justify-between items-center px-6 py-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate(AppScreen.Home)}
              className="p-2 hover:bg-neutral-200/50 transition-colors rounded-full active:scale-95 cursor-pointer text-emerald-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-bold text-xl text-emerald-800 tracking-tight" style={{ fontFamily: "EB Garamond, serif", fontSize: "22px" }}>
              My Orders
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

      <main className="max-w-xl mx-auto px-6 pt-6 space-y-8">
        {/* Title Description */}
        <section className="space-y-1">
          <h2 className="text-3xl font-bold text-neutral-900" style={{ fontFamily: "EB Garamond, serif" }}>
            My Orders
          </h2>
          <p className="text-sm text-neutral-500 font-medium leading-relaxed">
            Track and manage your premium orchard selections.
          </p>
        </section>

        {/* RECENT ORDERS */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Recent Orders
            </h3>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-full uppercase">
              {recentOrders.length} Active
            </span>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div 
                key={order.id}
                className="bg-white rounded-2xl p-5 shadow-[0px_8px_24px_rgba(0,0,0,0.02)] border border-neutral-200/40 space-y-4"
              >
                {/* Header Row */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-neutral-400">ORDER #{order.id}</p>
                    <p className="text-base font-bold text-neutral-800 mt-0.5">{order.status}</p>
                  </div>
                  {order.status === "Out for Delivery" ? (
                    <button 
                      onClick={() => setActiveTrackingOrder(order)}
                      className="bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Track</span>
                    </button>
                  ) : (
                    <span className="bg-amber-50 text-amber-800 border border-amber-200/50 px-3 py-1 rounded-xl text-xs font-bold">
                      Details
                    </span>
                  )}
                </div>

                {/* Body Content Details */}
                {order.singleItemName ? (
                  /* Single Bulky Item Style Layout */
                  <div className="flex items-center gap-4 bg-neutral-50 p-3 rounded-xl border border-neutral-200/10">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0 p-1 flex items-center justify-center border border-neutral-200/20">
                      <img className="w-full h-full object-contain" src={order.singleItemImage} alt={order.singleItemName} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-800 line-clamp-1">{order.singleItemName}</h4>
                      <p className="text-xs text-neutral-500 font-medium mt-0.5">{order.singleItemDetails}</p>
                    </div>
                  </div>
                ) : (
                  /* Multi Item Stack Layout */
                  <div className="flex items-center gap-2">
                    {order.images.map((img, idx) => (
                      <div key={idx} className="w-14 h-14 rounded-xl border border-neutral-200 bg-white p-1 overflow-hidden shadow-sm shrink-0 flex items-center justify-center">
                        <img className="w-full h-full object-contain" src={img} alt="item image" />
                      </div>
                    ))}
                    {order.itemsCount > order.images.length && (
                      <div className="w-14 h-14 rounded-xl border border-amber-200 bg-amber-100/50 text-amber-800 flex items-center justify-center text-sm font-extrabold shadow-sm shrink-0">
                        +{order.itemsCount - order.images.length}
                      </div>
                    )}
                  </div>
                )}

                <div className="h-[1px] bg-neutral-200/40" />

                {/* Footer details row */}
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-xs font-semibold text-neutral-400 block">
                      {order.expectedTime ? "Expected Arrival" : "Ordered On"}
                    </span>
                    <span className="font-bold text-neutral-700 mt-0.5 inline-block">
                      {order.expectedTime || order.date}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-neutral-400 block">Total Amount</span>
                    <span className="font-extrabold text-emerald-800 mt-0.5 inline-block">
                      {FORMAT_CURRENCY(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PAST ORDERS */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Past Orders
            </h3>
            <button className="text-xs font-semibold text-emerald-800 hover:underline cursor-pointer">
              Download All Receipts
            </button>
          </div>

          <div className="space-y-3">
            {pastOrders.map((order) => (
              <div 
                key={order.id}
                className="bg-white rounded-xl p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.01)] border border-neutral-200/30 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-400">#{order.id}</p>
                    <p className="text-xs font-semibold text-neutral-500 mt-0.5">
                      {order.date} • {order.itemsCount} Items
                    </p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-4">
                  <span className="font-bold text-neutral-800">
                    {FORMAT_CURRENCY(order.totalAmount)}
                  </span>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">
                    Delivered
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Need Help Banner (Green card) */}
        <section className="bg-gradient-to-r from-emerald-400/20 to-emerald-500/10 p-5 rounded-2xl border border-emerald-400/20 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-emerald-800 shrink-0 animate-bounce" />
            <div>
              <h4 className="text-sm font-bold text-neutral-800">Need help with an order?</h4>
              <p className="text-xs text-neutral-500 font-medium">Get immediate answers from support.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSupportModal(true)}
            className="bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
          >
            Contact Support
          </button>
        </section>
      </main>

      {/* Floating Track Courier details sheet */}
      <AnimatePresence>
        {activeTrackingOrder && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-t-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative border-t border-neutral-200/50"
            >
              {/* Drag line indicator */}
              <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-2" />

              <button 
                onClick={() => setActiveTrackingOrder(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Active tracker</p>
                <h3 className="text-xl font-bold text-neutral-900 font-serif-premium" style={{ fontFamily: "EB Garamond, serif" }}>
                  Delivery Tracking #{activeTrackingOrder.id}
                </h3>
              </div>

              {/* Progress Steps Indicator */}
              <div className="space-y-6 relative pl-8 py-2">
                <div className="absolute left-3 top-0 bottom-0 w-1.5 bg-emerald-100 rounded-full" />
                
                {/* Step 1: Confirmed */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-[27px] w-5 h-5 rounded-full bg-emerald-600 border-4 border-white flex items-center justify-center shadow-md" />
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800">Order Confirmed</h4>
                    <p className="text-xs text-neutral-400">Oct 24, 2023 • 10:15 AM</p>
                  </div>
                </div>

                {/* Step 2: Roasted & Packaged */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-[27px] w-5 h-5 rounded-full bg-emerald-600 border-4 border-white flex items-center justify-center shadow-md" />
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800">Custom Roasted &amp; Freshly Sealed</h4>
                    <p className="text-xs text-neutral-400">Oct 24, 2023 • 2:30 PM</p>
                  </div>
                </div>

                {/* Step 3: Out for Delivery */}
                <div className="relative flex items-start gap-4">
                  <div className="absolute -left-[27px] w-5 h-5 rounded-full bg-emerald-600 border-4 border-white flex items-center justify-center shadow-md animate-ping" />
                  <div className="absolute -left-[27px] w-5 h-5 rounded-full bg-emerald-600 border-4 border-white flex items-center justify-center shadow-md" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                      Out for Delivery
                    </h4>
                    <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      Arriving today by 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">Courier Agent: Ram Singh</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">GPS: Verified Route Active</p>
                </div>
                <button className="bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer">
                  Call Courier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Support Chat modal dialog */}
      <AnimatePresence>
        {showSupportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl relative border border-neutral-200/50"
            >
              <button 
                onClick={() => setShowSupportModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mx-auto">
                  <MessageSquareCode className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 font-serif-premium" style={{ fontFamily: "EB Garamond, serif" }}>
                  Live Concierge Support
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Our artisanal coordinators are online to assist you with order status, returns, or product inquiries.
                </p>
              </div>

              <div className="border border-neutral-200/60 rounded-xl p-3 bg-neutral-50">
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  Support status: Active
                </p>
                <p className="text-xs text-neutral-400">Response time: Usually &lt; 5 minutes</p>
              </div>

              <button 
                onClick={() => setShowSupportModal(false)}
                className="w-full bg-emerald-800 hover:bg-emerald-950 text-white font-bold py-3 rounded-xl text-sm transition-all cursor-pointer text-center block"
              >
                Start Live Chat
              </button>
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
            className="flex flex-col items-center justify-center text-emerald-800 transition-all scale-105 cursor-pointer"
          >
            <Receipt className="w-5 h-5 fill-emerald-800 text-emerald-800" />
            <span className="text-[10px] uppercase tracking-wider mt-1 font-bold">Orders</span>
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
