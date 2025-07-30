import { WavyBackground } from "./ui/wavy-background";

export default function Header() {
  return (
    <WavyBackground className="max-w-6xl mx-auto pt-10">
      <div className="flex flex-col items-center justify-center space-y-6">
        {/* Main Title */}
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
            Chain Audit
          </h1>
          <div className="flex items-center justify-center mt-2">
            <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 font-light text-center max-w-4xl leading-relaxed">
          Leverage{" "}
          <span className="font-semibold text-white">AI-powered analysis</span>{" "}
          to audit your smart contracts with
          <span className="font-semibold text-white"> precision and ease</span>
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm md:text-base text-blue-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Security Analysis</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Gas Optimization</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>Code Quality</span>
          </div>
        </div>
      </div>
    </WavyBackground>
  );
}
