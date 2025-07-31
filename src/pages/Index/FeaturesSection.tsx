
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Gamepad2, Image, Coins, Gem, Users, Zap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Gamepad2,
      title: "Telegram Mini-Games",
      description: "Play engaging tap-to-earn games directly in Telegram. Complete daily missions and earn points through fun gameplay.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Image,
      title: "AI Content Generation",
      description: "Create stunning images and videos using advanced AI models. Transform your ideas into visual masterpieces with simple prompts.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Coins,
      title: "Point-to-Token System",
      description: "Convert earned points to $TONIX tokens. Your gameplay directly translates to real value in the ecosystem.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Gem,
      title: "NFT Minting",
      description: "Turn your AI creations into valuable NFTs. Own, trade, and showcase your digital art on TON-based marketplaces.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: "Community Rewards",
      description: "Participate in airdrops and referral programs. Build the community and get rewarded for your contributions.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "TON Integration",
      description: "Built on the fast and efficient TON blockchain. Enjoy low fees and instant transactions for all platform activities.",
      gradient: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-space font-bold mb-6 text-white">
            Powerful Features for{" "}
            <span className="gradient-text">Web3 Creators</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover a complete ecosystem that combines gaming, AI creativity, and blockchain technology 
            to create unprecedented opportunities for digital content creators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-2 border-gray-600 hover:border-accent/50 bg-slate-800"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-space font-semibold group-hover:text-primary transition-colors text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
