import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  price: { monthly: number; yearly: number };
  baseLeads: number;
  features: string[];
  cta: string;
  recommended?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Lite",
    price: { monthly: 9, yearly: 90 },
    baseLeads: 100,
    features: [
      "Inbox delivery only",
      "Basic ICP matching",
      "No CRM or automation",
    ],
    cta: "Start Lite",
  },
  {
    name: "Solo",
    price: { monthly: 29, yearly: 290 },
    baseLeads: 500,
    features: [
      "Inbox delivery with insights",
      "Advanced ICP matching",
      "Limited CRM integrations",
      "Limited Automations enabled"
    ],
    cta: "Get Solo",
    recommended: true,
  },
  {
    name: "Pro",
    price: { monthly: 69, yearly: 690 },
    baseLeads: 1500,
    features: [
      "Inbox delivery with insights",
      "Advanced ICP matching",
      "Full CRM integrations",
      "All Automations enabled",
    ],
    cta: "Go Pro",
  },
];

const Pricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const getLeadsText = (baseLeads: number) => {
    const leads = billingCycle === "yearly" ? Math.ceil(baseLeads * 1.2) : baseLeads;
    return `${leads} verified leads/month delivered to your inbox.`;
  };

  return (
    <section 
      id="pricing" 
      className="py-16 sm:py-20 lg:py-24 text-white px-4 sm:px-6 lg:px-8"
      style={{ contentVisibility: 'auto' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12" ref={ref}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight">
            Straightforward <span className="gradient-text italic">Pricing</span>
          </h2>
          
          <p className="text-white/70 text-lg mb-8">
            You pay. We deliver. Simple.
          </p>

          <div className="inline-flex items-center space-x-1 bg-zinc-800/50 rounded-full p-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                billingCycle === "monthly" 
                  ? "text-white bg-purple-600" 
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`text-sm px-4 py-2 rounded-full transition-all duration-200 ${
                billingCycle === "yearly" 
                  ? "text-white bg-purple-600" 
                  : "text-white/50 hover:text-white/70"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.recommended ? 'pricing-card-recommended' : ''}`}
            >
              {plan.recommended && (
                <div className="recommended-badge">
                  Recommended
                </div>
              )}
              
              <div className="flex-1" style={{ padding: '16px' }}>
                <h3 className="text-xl mb-3 text-white">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl text-white">
                    ${billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-base text-white/50 ml-1">
                    /{billingCycle === "monthly" ? "mo" : "yr"}
                  </span>
                </div>
                <p className="text-white/70 mb-6 text-sm leading-relaxed">
                  {getLeadsText(plan.baseLeads)}
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <Check className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-300 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <a
                href="#signup"
                className="pricing-button"
                style={{ 
                  fontSize: '16px',
                  padding: '12px 16px'
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;