'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export interface Step {
  id: number;
  name: string;
  shortName: string;
}

export const BOOKING_STEPS: Step[] = [
  { id: 1, name: 'Stay Dates', shortName: '01 Stay' },
  { id: 2, name: 'Choose Room', shortName: '02 Room' },
  { id: 3, name: 'Guest Details', shortName: '03 Details' },
  { id: 4, name: 'Review & Terms', shortName: '04 Review' },
  { id: 5, name: 'Payment', shortName: '05 Pay' },
  { id: 6, name: 'Confirmed', shortName: '06 Confirmed' },
];

interface BookingStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function BookingStepper({ currentStep, onStepClick }: BookingStepperProps) {
  const shouldReduceMotion = useReducedMotion();
  const currentStepObj = BOOKING_STEPS.find((s) => s.id === currentStep) || BOOKING_STEPS[0];

  return (
    <div className="w-full mb-8">
      {/* Desktop Compact Horizontal Indicator (~60-75px height) */}
      <div className="hidden md:flex items-center justify-between bg-[#FCFAF5] border border-[#D8C4A8]/60 rounded-2xl px-6 py-4 shadow-sm">
        {BOOKING_STEPS.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isUpcoming = step.id > currentStep;
          const isClickable = onStepClick && isCompleted && currentStep < 6;

          return (
            <React.Fragment key={step.id}>
              <div
                onClick={() => isClickable && onStepClick(step.id)}
                className={`flex items-center gap-2.5 transition-all select-none ${
                  isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-default'
                }`}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onStepClick(step.id);
                  }
                }}
              >
                {/* Step Icon / Number Indicator */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-serif font-medium transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#A95339] text-[#FFFDF8] shadow-sm'
                      : isCurrent
                      ? 'bg-[#A95339] text-[#FFFDF8] ring-4 ring-[#A95339]/15 shadow-sm'
                      : 'bg-transparent text-[#2B1D17]/40 border border-[#D8C4A8]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="flex flex-col">
                  <span
                    className={`font-sans text-xs tracking-wide transition-colors duration-200 ${
                      isCurrent
                        ? 'font-bold text-[#A95339]'
                        : isCompleted
                        ? 'font-medium text-[#2B1D17]'
                        : 'font-normal text-[#2B1D17]/40'
                    }`}
                  >
                    {step.shortName}
                  </span>
                </div>
              </div>

              {/* Connecting Divider Arrow */}
              {idx < BOOKING_STEPS.length - 1 && (
                <div className="flex-1 max-w-[40px] h-[1px] mx-2 bg-[#D8C4A8]/50" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Dedicated Stepper */}
      <div className="flex md:hidden flex-col gap-2 bg-[#FCFAF5] border border-[#D8C4A8]/60 rounded-xl p-3.5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#A95339] font-bold">
            STEP {currentStep} OF {BOOKING_STEPS.length}
          </span>
          <span className="font-serif text-sm font-medium text-[#2B1D17]">
            {currentStepObj.name}
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full h-1 bg-[#D8C4A8]/40 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#A95339] rounded-full"
            initial={shouldReduceMotion ? {} : { width: 0 }}
            animate={{ width: `${(currentStep / BOOKING_STEPS.length) * 100}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}
