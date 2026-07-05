/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Building, 
  Coins, 
  ShieldCheck, 
  ChevronRight,
  CheckCircle,
  Sparkles,
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import { AppScreen, CartItem, Product } from "../types";
import { FORMAT_CURRENCY } from "../data";

interface PaymentScreenProps {
  onNavigate: (screen: AppScreen) => void;
  cart: CartItem[];
  onClearCart: () => void;
  onAddMockOrder: (amount: number, images: string[], singleItemName?: string, singleItemDetails?: string, singleItemImage?: string) => void;
}

export default function PaymentScreen({
  onNavigate,
  cart,
  onClearCart,
  onAddMockOrder
}: PaymentScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [isSuccess, setIsUpSuccess] = useState(false);
  const [generatedOrderNo, setGeneratedOrderNo] = useState("");
  const [chargedAmount, setChargedAmount] = useState<number | null>(null);

  // Calculate pricing
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const finalPrice = subtotal > 0 ? subtotal : 2450; // Fallback to 2450 as per mockup design

  const handlePayNow = () => {
    // Generate order number
    const orderNum = "FN-" + Math.floor(10000 + Math.random() * 90000);
    setGeneratedOrderNo(orderNum);
    setChargedAmount(finalPrice);

    // Save mock order into history
    const itemImages = cart.map(item => item.product.image);
    const firstName = cart.length > 0 ? cart[0].product.name : "Premium Roasted Cashews";
    const firstImg = cart.length > 0 ? cart[0].product.image : "";
    onAddMockOrder(finalPrice, itemImagesOnly(cart), cart.length > 0 ? undefined : "Premium California Almonds", cart.length > 0 ? undefined : "250g • Deluxe pouch", cart.length > 0 ? undefined : "https://lh3.googleusercontent.com/aida-public/AB6AXuB9psC-RopflqXjIk87O3dM7VcGjMtNRWS4ld8b-Bqg_o3hleSfxDdsdY5SbwCUyHVe4DV3dk-4frWk4x_NEtBOOkA9FJnHx0d3Uh_WyiZwnZ2PgZX3xduKHgUodMGad7RHk49UM0KLLCIYa2Lshum1LG3SAeplPWcC08dsMAQyR3-Hs-RjSAlbSHN9vlLPb23GqwNQ-daY--n-R5pPaloVUjSejVKiZKUWqxmlRFPwUqI_fsGF8duWzufh4gSlswpBecPBt1aMAFXx");

    // Success Screen transition
    setIsUpSuccess(true);
  };

  const itemImagesOnly = (items: CartItem[]) => {
    return items.map(i => i.product.image);
  };

  const handleSuccessDone = () => {
    onClearCart();
    setIsUpSuccess(false);
    onNavigate(AppScreen.Orders);
  };

  return (
    <div className="min-h-screen text-neutral-800 bg-[#f8faf3] font-sans pb-32">
      {/* Top App Bar */}
      <header className="sticky top-0 w-full z-50 bg-[#f8faf3]/95 backdrop-blur-md border-b border-neutral-200/40">
        <div className="flex items-center justify-between px-6 h-16 w-full max-w-container-max mx-auto">
          <button 
            onClick={() => onNavigate(AppScreen.Home)}
            className="p-2 hover:bg-neutral-200/50 transition-colors rounded-full active:scale-95 cursor-pointer text-emerald-800"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <h1 className="font-display text-xl font-bold text-emerald-800 select-none">Checkout</h1>
          
          <button className="p-2 text-emerald-800 cursor-default">
            <Lock className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-6 space-y-8">
        {/* Peek Summary Header */}
        <section className="space-y-1">
          <h2 className="text-xl font-bold text-neutral-900" style={{ fontFamily: "EB Garamond, serif", fontSize: "22px" }}>
            Order Summary
          </h2>
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Review your selections before payment
          </p>
        </section>

        {/* Invoice details sheet */}
        <section className="bg-white p-5 rounded-2xl shadow-[0px_10px_30px_rgba(0,0,0,0.02)] border border-neutral-200/40 space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center text-neutral-500">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-800">{FORMAT_CURRENCY(finalPrice)}</span>
            </div>
            <div className="flex justify-between items-center text-neutral-500">
              <span>Delivery Fee</span>
              <span className="font-semibold text-emerald-800 uppercase tracking-wide">FREE</span>
            </div>
          </div>
          <div className="h-[1px] bg-neutral-200/40" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-neutral-900" style={{ fontFamily: "EB Garamond, serif" }}>Total Amount</span>
            <span className="text-2xl font-extrabold text-emerald-800">{FORMAT_CURRENCY(finalPrice)}</span>
          </div>
        </section>

        {/* List of Payment Methods */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900" style={{ fontFamily: "EB Garamond, serif", fontSize: "22px" }}>
            Payment Method
          </h2>

          <div className="space-y-3">
            {/* UPI Option */}
            <div 
              onClick={() => setSelectedMethod("upi")}
              className={`cursor-pointer flex items-center justify-between p-4 bg-white rounded-xl border transition-all duration-300 shadow-[0px_8px_24px_rgba(0,0,0,0.01)] hover:shadow-md ${
                selectedMethod === "upi" ? "border-emerald-800 bg-emerald-50/10" : "border-neutral-200/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 shadow-sm">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-800">UPI</p>
                  <p className="text-xs text-neutral-400">Google Pay, PhonePe, BHIM</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedMethod === "upi" ? "border-emerald-800" : "border-neutral-300"
              }`}>
                <div className={`w-2.5 h-2.5 rounded-full bg-emerald-800 transition-opacity ${
                  selectedMethod === "upi" ? "opacity-100" : "opacity-0"
                }`} />
              </div>
            </div>

            {/* Credit Card Option */}
            <div 
              onClick={() => setSelectedMethod("card")}
              className={`cursor-pointer flex items-center justify-between p-4 bg-white rounded-xl border transition-all duration-300 shadow-[0px_8px_24px_rgba(0,0,0,0.01)] hover:shadow-md ${
                selectedMethod === "card" ? "border-emerald-800 bg-emerald-50/10" : "border-neutral-200/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 shadow-sm">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-800">Credit / Debit Card</p>
                  <p className="text-xs text-neutral-400">Visa, Mastercard, Amex</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedMethod === "card" ? "border-emerald-800" : "border-neutral-300"
              }`}>
                <div className={`w-2.5 h-2.5 rounded-full bg-emerald-800 transition-opacity ${
                  selectedMethod === "card" ? "opacity-100" : "opacity-0"
                }`} />
              </div>
            </div>

            {/* Net Banking Option */}
            <div 
              onClick={() => setSelectedMethod("netbanking")}
              className={`cursor-pointer flex items-center justify-between p-4 bg-white rounded-xl border transition-all duration-300 shadow-[0px_8px_24px_rgba(0,0,0,0.01)] hover:shadow-md ${
                selectedMethod === "netbanking" ? "border-emerald-800 bg-emerald-50/10" : "border-neutral-200/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 shadow-sm">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-800">Net Banking</p>
                  <p className="text-xs text-neutral-400">All Indian Banks</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedMethod === "netbanking" ? "border-emerald-800" : "border-neutral-300"
              }`}>
                <div className={`w-2.5 h-2.5 rounded-full bg-emerald-800 transition-opacity ${
                  selectedMethod === "netbanking" ? "opacity-100" : "opacity-0"
                }`} />
              </div>
            </div>

            {/* Cash on Delivery Option */}
            <div 
              onClick={() => setSelectedMethod("cod")}
              className={`cursor-pointer flex items-center justify-between p-4 bg-white rounded-xl border transition-all duration-300 shadow-[0px_8px_24px_rgba(0,0,0,0.01)] hover:shadow-md ${
                selectedMethod === "cod" ? "border-emerald-800 bg-emerald-50/10" : "border-neutral-200/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 shadow-sm">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-800">Cash on Delivery</p>
                  <p className="text-xs text-neutral-400">Pay when you receive</p>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedMethod === "cod" ? "border-emerald-800" : "border-neutral-300"
              }`}>
                <div className={`w-2.5 h-2.5 rounded-full bg-emerald-800 transition-opacity ${
                  selectedMethod === "cod" ? "opacity-100" : "opacity-0"
                }`} />
              </div>
            </div>
          </div>
        </section>

        {/* Security Seals */}
        <section className="flex flex-col items-center justify-center gap-1.5 opacity-75 text-center px-4 py-4 bg-neutral-100/50 rounded-xl">
          <div className="flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Secure Payment</span>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm">
            Your data is protected with industry-standard 256-bit SSL encryption.
          </p>
        </section>
      </main>

      {/* Fixed Action Footer */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl p-4 border-t border-neutral-200/40 z-40 shadow-[0px_-4px_24px_rgba(0,0,0,0.02)]">
        <div className="max-w-2xl mx-auto">
          <button 
            onClick={handlePayNow}
            className="w-full h-14 bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Pay Now {FORMAT_CURRENCY(finalPrice)}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Success Confetti overlay modal */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl relative border border-neutral-200/40"
            >
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner relative">
                <CheckCircle className="w-10 h-10 animate-pulse" />
                <Sparkles className="w-5 h-5 text-amber-500 absolute top-2 right-2 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-neutral-900 font-serif-premium" style={{ fontFamily: "EB Garamond, serif" }}>
                  Payment Successful!
                </h3>
                <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">
                  Order {generatedOrderNo}
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed px-2">
                  Thank you for shopping with Gilded Orchard! Your fresh organic batch is being packed with love and care.
                </p>
              </div>

              <div className="bg-[#f8faf3] p-4 rounded-2xl border border-neutral-200/50 text-left space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-neutral-500">Method</span>
                  <span className="font-bold text-neutral-700 capitalize">{selectedMethod}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-neutral-500">Total Charged</span>
                  <span className="font-extrabold text-emerald-800">{FORMAT_CURRENCY(chargedAmount !== null ? chargedAmount : finalPrice)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button 
                  onClick={handleSuccessDone}
                  className="w-full bg-emerald-800 hover:bg-emerald-950 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Track My Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    onClearCart();
                    setIsUpSuccess(false);
                    onNavigate(AppScreen.Home);
                  }}
                  className="text-xs font-bold uppercase tracking-wider text-emerald-800 hover:text-emerald-950 transition-colors py-2 cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
