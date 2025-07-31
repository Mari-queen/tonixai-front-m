
import { Button } from "@/components/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Hero Glow Effect */}
      <div className="absolute inset-0 hero-glow"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-tonix-blue/10 to-tonix-cyan/10 border border-tonix-blue/20">
              <Sparkles className="w-4 h-4 text-tonix-blue mr-2" />
              <span className="text-sm font-medium text-tonix-blue">Next-Gen AI Platform on TON</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-space font-bold mb-6 leading-tight text-white">
            Create, Play, and Earn with{" "}
            <span className="gradient-text animate-gradient-x">AI-Powered</span>{" "}
            Creativity
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            TONIXAI combines Telegram gaming, AI content generation, and NFT minting on the TON blockchain. 
            Earn points through mini-games, create stunning AI visuals, and own your digital assets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/ai-generation">
              <Button size="lg" className="bg-gradient-to-r from-tonix-blue to-tonix-cyan hover:from-tonix-cyan hover:to-tonix-blue text-white px-8 py-4 text-lg font-semibold group">
                Try AI Generator
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold border-2 border-gray-400 text-gray-200 hover:bg-gray-800 hover:text-white group">
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-float" style={{ animationDelay: '0s' }}>
              <div className="text-3xl font-bold text-tonix-blue mb-2">20B</div>
              <div className="text-sm text-gray-400">Total $TONIX Supply</div>
            </div>
            <div className="animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-3xl font-bold text-tonix-cyan mb-2">60%</div>
              <div className="text-sm text-gray-400">User Incentives</div>
            </div>
            <div className="animate-float" style={{ animationDelay: '2s' }}>
              <div className="text-3xl font-bold text-tonix-blue mb-2">AI</div>
              <div className="text-sm text-gray-400">Powered Generation</div>
            </div>
            <div className="animate-float" style={{ animationDelay: '3s' }}>
              <div className="text-3xl font-bold text-tonix-cyan mb-2">TON</div>
              <div className="text-sm text-gray-400">Blockchain</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
