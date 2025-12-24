export default function Stepper({ currentStep }) {
  const steps = [
    { id: 1, title: "Select Semester" },
    { id: 2, title: "Choose Branch" },
    { id: 3, title: "Fill Grades" },
    { id: 4, title: "View SGPA" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-6 px-2 sm:px-0">
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
            <div
              key={step.id}
              className="flex items-center justify-center w-full"
            >
              {/* Step Item */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                {/* Circle */}
                <div
                  className={`flex items-center justify-center
                  w-9 h-9 sm:w-10 sm:h-10
                  rounded-full text-sm font-semibold transition
                  ${
                    isCompleted
                      ? "bg-purple-600 text-white"
                      : isActive
                      ? "border-2 border-purple-500 text-purple-400"
                      : "border border-white/20 text-gray-400"
                  }`}
                >
                  {isCompleted ? "✓" : step.id}
                </div>

                {/* Label (hidden on mobile) */}
                <span
                  className={`hidden sm:block text-sm font-medium whitespace-nowrap
                  ${
                    isCompleted
                      ? "text-white"
                      : isActive
                      ? "text-purple-400"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector */}
              {index !== steps.length - 1 && (
                <div
                  className={`hidden sm:block flex-1 h-[2px] mx-4
                  ${
                    step.id < currentStep
                      ? "bg-purple-600/60"
                      : "bg-white/10"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Step Label */}
      <div className="mt-3 text-center sm:hidden">
        <p className="text-sm font-medium text-purple-400">
          Step {currentStep} of {steps.length}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {steps.find((s) => s.id === currentStep)?.title}
        </p>
      </div>
    </div>
  );
}
