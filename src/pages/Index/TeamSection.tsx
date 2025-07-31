
import { Card, CardContent } from "@/components/card";

const TeamSection = () => {
  const members = [
    { avatar: "/imgs/team/1.png", name: "Nguyen Van Kien", title: "CTO - ATB Tech" },
    { avatar: "/imgs/team/2.png", name: "Phạm Ngọc Tuân", title: "CMO - ATB Tech" },
    { avatar: "/imgs/team/3.png", name: "Sunny Wong", title: "CEO - Merlion Software Lte" },
  ];

  const partners = [
    {
      icon: "/imgs/partners/openai.png",
      title: "OpenAI",
    },
    {
      icon: "/imgs/partners/kling.png",
      title: "KlingAI",
    },
    {
      icon: "/imgs/partners/wrtn.jpg",
      title: "WRTN Technologies",
    },
    {
      icon: "/imgs/partners/midjourney.png",
      title: "Midjourney",
    },
    {
      icon: "/imgs/partners/nouvo.png",
      title: "NouvoAI",
    },
    {
      icon: "/imgs/partners/heygen.jpg",
      title: "HeyGen",
    },
  ];

  return (
    <section id="team" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-space font-bold mb-6 text-white">
            Team & Partners
          </h2>
          {/* <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            A sustainable economic model designed to reward participation, fuel growth, and ensure long-term platform success.
          </p> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Token Allocation */}
          <div className="space-y-6">
            <h3 className="text-2xl font-space font-bold mb-6 text-white">Our Team</h3>
            <Card className="h-fit bg-slate-800 border-gray-600">
              <CardContent className="space-y-6 pt-6">
                {members.map((member, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img src={member.avatar} className="w-16 h-16 rounded-full" alt="" />
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-300">{member.name}</div>
                      <div className="text-sm font-bold text-white">{member.title}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Token Utility */}
          <div className="space-y-6">
            <h3 className="text-2xl font-space font-bold mb-6 text-white">Our Partners & Investors</h3>
            {partners.map((partner, index) => {
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-slate-800 border-gray-600">
                  <CardContent className="flex items-center space-x-4 p-6">
                    <img src={partner.icon} className="w-10 h-10 rounded-lg" />
                    <h4 className="font-semibold text-lg group-hover:text-primary transition-colors text-white">
                      {partner.title}
                    </h4>
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

export default TeamSection;
