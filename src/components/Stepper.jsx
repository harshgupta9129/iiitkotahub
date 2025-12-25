import React from 'react';
import { Check } from 'lucide-react';

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="w-full max-w-5xl mx-auto mt-6 px-2 sm:px-0 select-none">
      {/* Main Container with Glassmorphism */}
      <div
        className="flex items-center justify-between
        rounded-xl sm:rounded-2xl
        bg-gradient-to-r from-[#0b0f2f]/90 via-[#120b3d]/90 to-[#1a0f4f]/90
        backdrop-blur-xl border border-white/10
        shadow-lg shadow-purple-900/30
        px-3 py-4 sm:px-6 sm:py-5"
      >
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step Item */}
              <div className="flex items-center justify-center">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 group">
                  {/* Status Circle */}
                  <div
                    className={`flex items-center justify-center
                    w-9 h-9 sm:w-10 sm:h-10
                    rounded-full text-sm font-black transition-all duration-500
                    ${
                      isCompleted
                        ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]"
                        : isActive
                        ? "border-2 border-purple-500 text-purple-400 bg-purple-500/10 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                        : "border border-white/20 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={18} strokeWidth={3} className="animate-in zoom-in duration-300" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>

                  {/* Desktop Label */}
                  <span
                    className={`hidden sm:block text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors duration-300
                    ${
                      isCompleted
                        ? "text-white"
                        : isActive
                        ? "text-purple-400"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              </div>

              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div className="flex-1 px-2 sm:px-4">
                  <div
                    className={`h-[2px] w-full rounded-full transition-all duration-700
                    ${
                      step.id < currentStep
                        ? "bg-linear-to-r from-purple-600 to-indigo-600 shadow-[0_0_8px_rgba(147,51,234,0.3)]"
                        : "bg-white/10"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile-only Progress Indicator */}
      <div className="mt-4 text-center sm:hidden animate-in fade-in slide-in-from-top-2">
        <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400">
            Progress: {currentStep} / {steps.length}
          </p>
        </div>
        <p className="text-xs font-bold text-gray-400 mt-2 tracking-tight">
          Current: {steps.find((s) => s.id === currentStep)?.title}
        </p>
      </div>
    </div>
  );
}