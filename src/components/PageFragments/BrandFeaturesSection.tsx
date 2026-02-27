import React from "react";
import { ShieldCheck, Truck, Cpu, LucideIcon } from "lucide-react";

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: FeatureItem[] = [
  {
    id: 1,
    title: "High Performance Materials",
    description:
      "Premium aluminum builds, reinforced connectors, and long-lasting durability.",
    icon: Cpu,
  },
  {
    id: 2,
    title: "Fast & Secure Delivery",
    description:
      "Carefully packaged products with tracked and insured shipping.",
    icon: Truck,
  },
  {
    id: 3,
    title: "1-Year Warranty",
    description:
      "Enjoy peace of mind with easy replacements and dedicated support.",
    icon: ShieldCheck,
  },
];

const BrandFeaturesSection: React.FC = () => {
  return (
    <section className="w-full bg-neutral-100 py-24 px-6 lg:px-20">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
            Designed for Performance
          </h2>
          <p className="text-neutral-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Engineered with precision. Built to last. Designed to elevate your
            workspace.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start text-left"
              >
                {/* Icon Wrapper */}
                <div className="mb-6 p-4 bg-neutral-100 rounded-full flex items-center justify-center transition-colors group-hover:bg-neutral-200">
                  <Icon
                    className="w-6 h-6 text-neutral-800"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-neutral-900 mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandFeaturesSection;
