
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Progress } from "@/components/progress";
import { Coins, TrendingUp, Users, Shield } from "lucide-react";

const TokenomicsSection = () => {
  const allocations = [
    { label: "User Incentives & Participation", percentage: 60, color: "bg-tonix-blue" },
    { label: "Team & Development", percentage: 10, color: "bg-tonix-cyan" },
    { label: "Marketing & Ecosystem", percentage: 10, color: "bg-purple-500" },
    { label: "Strategic Investors", percentage: 10, color: "bg-green-500" },
    { label: "Reserve & Treasury", percentage: 10, color: "bg-orange-500" }
  ];

  const utilities = [
    {
      icon: Coins,
      title: "Point Conversion",
      description: "Redeem earned points for $TONIX tokens"
    },
    {
      icon: TrendingUp,
      title: "NFT Minting",
      description: "Use tokens to mint AI-generated NFTs"
    },
    {
      icon: Users,
      title: "Premium Access",
      description: "Unlock advanced AI tools and features"
    },
    {
      icon: Shield,
      title: "DAO Governance",
      description: "Participate in platform decisions (Coming 2026)"
    }
  ];

  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-space font-bold mb-6 text-white">
            <span className="gradient-text">$TONIX</span> Tokenomics
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            A sustainable economic model designed to reward participation, fuel growth, and ensure long-term platform success.
          </p>

          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-tonix-blue/10 to-tonix-cyan/10 border border-tonix-blue/20">
            <span className="text-2xl font-bold text-tonix-blue mr-2">20,000,000,000</span>
            <span className="text-lg text-gray-300">Total Supply</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Token Allocation */}
          <div className="space-y-6">
            <h3 className="text-2xl font-space font-bold mb-6 text-white">Token Distribution</h3>
            <Card className="h-fit bg-slate-800 border-gray-600">
              <CardContent className="space-y-6 pt-6">
                {allocations.map((allocation, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-300">{allocation.label}</span>
                      <span className="text-sm font-bold text-white">{allocation.percentage}%</span>
                    </div>
                    <Progress value={allocation.percentage} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Token Utility */}
          <div className="space-y-6">
            <h3 className="text-2xl font-space font-bold mb-6 text-white">Token Utility</h3>
            {utilities.map((utility, index) => {
              const Icon = utility.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-slate-800 border-gray-600">
                  <CardContent className="flex items-start space-x-4 p-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-tonix-blue to-tonix-cyan flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors text-white">
                        {utility.title}
                      </h4>
                      <p className="text-gray-300">
                        {utility.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
