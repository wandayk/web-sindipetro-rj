import { StepIndicator } from "../ui/StepIndicator";
import Image from "next/image";

interface HeaderProps {
  currentStep?: number;
  totalSteps?: number;
  showSteps?: boolean;
}

export function Header({ currentStep = 1, totalSteps = 6, showSteps = false }: HeaderProps) {
  return (
    <header className="relative bg-white text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-70">
        <Image
          src="/background.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-2xl px-4 pt-6 pb-20">
        {/* Logo e Título */}
        <div className="flex flex-col items-center justify-center relative w-full">
            <Image
              src="/logo.svg"
              alt="Logo Sindipetro-RJ"
              fill
              className="object-contain p-2 !static !w-full !h-[100px]"
              priority
            />
        </div>

        {/* Step Indicator */}
        {showSteps && (
          <div className="">
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} theme="dark" />
          </div>
        )}
      </div>
    </header>
  );
}
