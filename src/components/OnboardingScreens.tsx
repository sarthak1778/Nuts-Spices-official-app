/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle } from "lucide-react";

interface OnboardingScreensProps {
  onNextScreen: () => void;
  onSkip: () => void;
}

const STEPS = [
  {
    step: 1,
    title: "Premium Quality Dry Fruits",
    description: "Handpicked from the finest orchards around the world, delivered straight to your doorstep.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-zn3AZILfmpUm2jQXwsgl-lgewfxk2XMZo9R6gLDJmnaL7VdtNqXitmXrTbvqNlcFj_WqCtX-z3Oxoyf_w5bRWHhghFE1Ok4IvOsxOMKKDrXjiV7rHAPmKlFf1KQcWdO7cSibneFobUqB4mxwD3fGHRvHTdokV6tsSHutrepzprah8pFL1Z0egtReryNEZvdojnwpn-8zB6dcpsnb5JT2scSt2acpajQjlkQyYrd_nV8ZIXQGhkHE2ERrRM5hxDalILluIVj3bOUr",
    badge: "100% Organic",
    badgeIcon: true
  },
  {
    step: 2,
    title: "Nature's Best, Delivered",
    description: "Discover a world of hand-picked flavors, from buttery cashews to crunchy walnuts, curated just for you.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwrOIoTTYi-Fsn9__4kDFRnKx-TZIc0ndKlvqY7ZLBsSA6R5mDIPnIkL2zjyuY_UBg5SjbL5o6MWL4bQBrRQtPQVThxgZSPN0WDblpQGFd-fPeq4zMG9w0b7gikCM8BDUpPI0NVQ0V4wcSx-dCdk4d8dELhxRgOM8kK4O6-XoKYaC5CA4WUGCkvwDhF1Y9YkaJJysfFLB27coW15B6bHesqbv74dyEJtaMIKhqkdIcEMktXQhsBgbboIqD07D5Ow_t9rx6n36rnavy",
    badge: "Premium Quality",
    badgeIcon: false
  },
  {
    step: 3,
    title: "Boutique Snacking",
    description: "Experience the ultimate convenience of healthy, gourmet snacking delivered to your doorstep in eco-friendly packaging.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsdGve9ROQrsu9vIA3Gl7Ft--2pyEWyacvb4ma_LZi_gvd3eQw_vwGaXMbyjgyOgfudhGoHH0FsmWKtCQuG4e8yffGDg-Q9fKwLGzZ4Q7LlbFumMCyF8BrTHc128pZiIMB2pP8sZfFlak2nJPbAGgdV8-DGdXSpUiYI1N5UqjlP819IMboQRA0PFaiRNVXEBZfkjClzpPSsB5n3MsI6LYxX8u2CgDWzXV1wwQ1Y3_6P0iDg2PA3MR5sY-cgJrFdDXjmfHchjIUtnKj",
    badge: "Eco Friendly",
    badgeIcon: false
  }
];

export default function OnboardingScreens({ onNextScreen, onSkip }: OnboardingScreensProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onNextScreen();
    }
  };

  return (
    <div 
      className="min-h-screen text-neutral-800 font-sans flex flex-col justify-between overflow-x-hidden"
      style={{
        background: "radial-gradient(circle at top right, rgba(13, 99, 27, 0.05), transparent 60%), radial-gradient(circle at bottom left, rgba(121, 89, 0, 0.05), transparent 60%), #faf9f6"
      }}
    >
      {/* Top Action Bar */}
      <nav className="flex justify-between items-center px-6 py-4 w-full sticky top-0 z-10 backdrop-blur-md bg-[#faf9f6]/40">
        <div className="text-2xl font-bold italic text-emerald-900 font-serif-premium" style={{ fontFamily: "EB Garamond, serif" }}>
          Nuts &amp; Spices
        </div>
        <button 
          onClick={onSkip}
          className="text-sm font-semibold text-neutral-500 hover:text-emerald-800 transition-colors py-2 px-4 rounded-full hover:bg-neutral-200/50 cursor-pointer"
        >
          Skip
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 max-w-lg mx-auto w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center text-center"
          >
            {/* Product Image Circular Showcase */}
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square mb-8 group">
              {/* Subtle Ambient Glow */}
              <div className="absolute inset-0 bg-emerald-700/5 blur-3xl rounded-full scale-110" />
              
              {/* Image Circle */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0px_20px_50px_rgba(0,0,0,0.12)] border-[10px] border-white bg-white">
                <img 
                  className="w-full h-full object-cover transform transition-transform duration-[3s] group-hover:scale-105" 
                  src={currentStep.image}
                  alt={currentStep.title}
                />
              </div>

              {/* Verified Badge (Step 1 only, or general badge for luxury feel) */}
              {currentStep.badge && (
                <div className="absolute -bottom-2 right-4 bg-amber-100 text-amber-900 border border-amber-200 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transform -rotate-3">
                  <CheckCircle className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-bold tracking-wider uppercase font-semibold">{currentStep.badge}</span>
                </div>
              )}
            </div>

            {/* Typography Description */}
            <div className="space-y-3 px-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight">
                {currentStep.title}
              </h1>
              <p className="text-base md:text-lg text-neutral-600 leading-relaxed font-normal">
                {currentStep.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Progress Dots */}
        <div className="flex gap-2 mt-8">
          {STEPS.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStepIndex ? "w-8 bg-emerald-800" : "w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>
      </main>

      {/* Bottom Action Footer */}
      <footer className="p-6 pb-12 w-full max-w-lg mx-auto flex flex-col items-center gap-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.01 }}
          onClick={handleNext}
          className="w-full bg-emerald-800 text-white font-semibold py-4 rounded-xl shadow-[0px_10px_20px_rgba(13,99,27,0.15)] hover:shadow-[0px_12px_24px_rgba(13,99,27,0.25)] hover:bg-emerald-900 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{currentStepIndex === STEPS.length - 1 ? "Get Started" : "Next"}</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
        <p className="text-xs text-neutral-400 font-semibold uppercase tracking-widest">
          Step {currentStepIndex + 1} of {STEPS.length}
        </p>
      </footer>
    </div>
  );
}
