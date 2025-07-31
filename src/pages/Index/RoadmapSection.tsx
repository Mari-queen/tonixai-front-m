
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Badge } from "@/components/badge";
import { CheckCircle, Clock, Calendar } from "lucide-react";

const RoadmapSection = () => {
  const roadmapItems = [
    {
      quarter: "Q3 2025",
      status: "upcoming",
      icon: Clock,
      title: "Foundation Launch",
      items: [
        "Launch announcement",
        "Telegram mini-game MVP",
        "AI image generation beta",
        "Community building"
      ]
    },
    {
      quarter: "Q4 2025",
      status: "upcoming",
      icon: Calendar,
      title: "Platform Expansion",
      items: [
        "NFT minting module",
        "AI video generation beta",
        "Community airdrop events",
        "TGE and DEX listing",
        "First DAO preview vote"
      ]
    },
    {
      quarter: "2026",
      status: "future",
      icon: Calendar,
      title: "Ecosystem Maturity",
      items: [
        "Full mobile app launch",
        "DAO implementation",
        "Multi-chain expansion",
        "Marketplace integration",
        "Advanced AI suite (3D, voice, motion)"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "upcoming":
        return "bg-tonix-blue";
      case "future":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "upcoming":
        return Clock;
      case "future":
        return Calendar;
      default:
        return Calendar;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-space font-bold mb-6 text-white">
            Development <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our strategic plan to revolutionize AI-powered content creation and Web3 gaming. 
            Each milestone brings us closer to a fully decentralized creative ecosystem.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-tonix-blue via-tonix-cyan to-purple-500"></div>

          <div className="space-y-12">
            {roadmapItems.map((item, index) => {
              const StatusIcon = getStatusIcon(item.status);
              return (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-4 border-tonix-blue flex items-center justify-center z-10">
                    <StatusIcon className="w-4 h-4 text-tonix-blue" />
                  </div>

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 md:w-5/12 ${index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                    <Card className="group hover:shadow-xl hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-2 bg-slate-800 border-gray-600">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`${getStatusColor(item.status)} text-white`}>
                            {item.quarter}
                          </Badge>
                          <StatusIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <CardTitle className="text-xl font-space group-hover:text-primary transition-colors text-white">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {item.items.map((milestone, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 bg-tonix-cyan rounded-full mr-3 flex-shrink-0"></div>
                              {milestone}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
