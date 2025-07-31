
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { vestingData, tokenCategories } from "./vestingConfig";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const totalData = payload.find((item: any) => item.dataKey === "circulating");

    return (
      <div className="bg-sky-100 p-4 border-white">
        <p className="font-semibold text-[#0073e6] font-bricolage">{`Month: ${label}`}</p>
        {totalData && (
          <p className="text-sky-100 font-bricolage">
            {`TOTAL RELEASED: ${(totalData.value / 1000000000).toFixed(1)}B`}
          </p>
        )}
        <div className="mt-2 space-y-1">
          {payload
            .filter((item: any) => item.dataKey !== "circulating")
            .map((item: any, index: number) => (
              <p key={index} className="text-black font-bricolage text-sm">
                {`${tokenCategories[item.dataKey].label}: ${(
                  item.value / 1000000000
                ).toFixed(2)}B`}
              </p>
            ))}
        </div>
      </div>
    );
  }
  return null;
};

const VestingSection = () => {
  const allocations = [
    {
      category: 'User Incentives',
      allocation: 60,
      token: 12000000000,
      unlock: 400000000,
      cliff: 0,
      period: 59,
    },
    {
      category: 'Team & Development',
      allocation: 10,
      token: 2000000000,
      unlock: 0,
      cliff: 12,
      period: 36,
    },
    {
      category: 'Marketing & Ecosystem',
      allocation: 10,
      token: 2000000000,
      unlock: 400000000,
      cliff: 3,
      period: 24,
    },
    {
      category: 'Strategic Investors',
      allocation: 10,
      token: 2000000000,
      unlock: 200000000,
      cliff: 6,
      period: 24,
    },
    {
      category: 'Reserve & Treasury',
      allocation: 10,
      token: 2000000000,
      unlock: 0,
      cliff: 6,
      period: 48,
    }
  ];

  return (
    <section id="vesting" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-space font-bold mb-6 text-white">
            <span className="gradient-text">$TONIX</span> Vesting
          </h2>
        </div>

        <div className="space-y-10">
          <div className="">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">Allocation Overview</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Allocation (%)</TableHead>
                  <TableHead>Total Tokens</TableHead>
                  <TableHead>TGE Unlock (Tokens)</TableHead>
                  <TableHead>Cliff (Months)</TableHead>
                  <TableHead>Vesting Period (Months)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allocations.map((allocation, key) =>
                  <TableRow key={key}>
                    <TableCell>{allocation.category}</TableCell>
                    <TableCell>{allocation.allocation}%</TableCell>
                    <TableCell>{allocation.token.toLocaleString()}</TableCell>
                    <TableCell>{allocation.unlock.toLocaleString()}</TableCell>
                    <TableCell>{allocation.cliff}</TableCell>
                    <TableCell>{allocation.period}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">Monthly Vesting</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={vestingData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="gameplayGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={tokenCategories.incentive.color}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={tokenCategories.incentive.color}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="communityGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={tokenCategories.marketing.color}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={tokenCategories.marketing.color}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="developmentGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={tokenCategories.team.color}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={tokenCategories.team.color}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="investorsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={tokenCategories.team.color}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={tokenCategories.team.color}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="month"
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickLine={false}
                    className="font-bricolage"
                  />
                  <YAxis
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) =>
                      `${(value / 1000000000).toFixed(0)}B`
                    }
                    label={{
                      value: "TOKENS (BILLIONS)",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: "#9CA3AF", fontFamily: "bricolagespace" },
                    }}
                    className="font-bricolage"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="incentive"
                    stackId="1"
                    stroke={tokenCategories.incentive.color}
                    fill="url(#gameplayGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="marketing"
                    stackId="1"
                    stroke={tokenCategories.marketing.color}
                    fill="url(#gameplayGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="investor"
                    stackId="1"
                    stroke={tokenCategories.team.color}
                    fill="url(#communityGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="team"
                    stackId="1"
                    stroke={tokenCategories.team.color}
                    fill="url(#developmentGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="reserve"
                    stackId="1"
                    stroke={tokenCategories.reserve.color}
                    fill="url(#investorsGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VestingSection;
