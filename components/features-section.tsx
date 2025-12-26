"use client";

import { Card } from "@/components/ui/card";
import { Clock, BarChart3, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const features = [
  {
    icon: Clock,
    title: "Time Tracking",
    description:
      "Track your time with precision using our digital clock interface",
    color: "#8098f0",
  },
  {
    icon: BarChart3,
    title: "Task Analysis",
    description:
      "Visualize your productivity with beautiful charts and insights",
    color: "#f090f1",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with your entire team",
    color: "#ffd251",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <div>
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Everything You Need
        </h2>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Powerful features designed to help you stay productive and organized
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="p-8 h-full border-border/50 hover:shadow-xl transition-shadow rounded-3xl">
            {feature.title === "Time Tracking" && (
              <div className="mb-6">
                <div className="flex items-center justify-center h-32 bg-muted rounded-2xl">
                  <div className="text-center">
                    <div className="text-5xl font-bold font-mono text-foreground">
                      12:34
                    </div>
                    <div className="text-sm text-foreground/60 mt-1">
                      Active Timer
                    </div>
                  </div>
                </div>
              </div>
            )}
            {feature.title === "Task Analysis" && (
              <div className="mb-6">
                <div className="flex items-end justify-around h-32 gap-2">
                  <div
                    className="w-full bg-[#f090f1] rounded-t-xl"
                    style={{ height: "70%" }}
                  />
                  <div
                    className="w-full bg-[#ffd251] rounded-t-xl"
                    style={{ height: "85%" }}
                  />
                  <div
                    className="w-full bg-[#ff9f69] rounded-t-xl"
                    style={{ height: "60%" }}
                  />
                  <div
                    className="w-full bg-[#8098f0] rounded-t-xl"
                    style={{ height: "90%" }}
                  />
                </div>
              </div>
            )}
            {feature.title === "Team Collaboration" && (
              <div className="mb-6 flex items-center justify-center h-32">
                <div className="flex -space-x-4">
                  {["JD", "SK", "AM", "TC"].map((initials, i) => (
                    <Avatar key={i} className="border-4 border-card w-16 h-16">
                      <AvatarFallback
                        style={{
                          backgroundColor: [
                            "#8098f0",
                            "#f090f1",
                            "#ffd251",
                            "#ff9f69",
                          ][i],
                        }}
                      >
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-3 rounded-2xl"
                style={{ backgroundColor: feature.color + "20" }}
              >
                <feature.icon
                  className="h-6 w-6"
                  style={{ color: feature.color }}
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
            </div>
            <p className="text-foreground/70">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
