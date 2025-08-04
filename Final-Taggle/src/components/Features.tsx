import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  UserCheck,
  FileSearch,
  Zap,
  Database,
  Clock,
  DollarSign,
  BarChart3,
} from 'lucide-react';
import SimpleCarousel from './SimpleCarousel';

const Features: React.FC = () => {
  const [ref, inView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.15,
    rootMargin: '50px 0px'
  });

  const features = [
    {
      icon: <UserCheck className="w-8 h-8 text-purple-400" />,
      title: 'Verified Leads',
      description: 'Receive laser-targeted leads, fully verified and aligned to your ideal customer profile (ICP), right in your inbox.',
    },
    {
      icon: <FileSearch className="w-8 h-8 text-blue-400" />,
      title: 'Prospect Intelligence',
      description: 'Gain insight into each lead\'s buying signals, firmographics, and intent, all enriched automatically.',
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: 'Smart Automations',
      description: 'Enable intelligent automation to save hours every week and nurture leads without manual intervention.',
    },
    {
      icon: <Database className="w-8 h-8 text-green-400" />,
      title: 'CRM Integrations',
      description: 'Seamlessly integrate with Salesforce, HubSpot, and more. Keep your pipeline fresh and organized.',
    },
    {
      icon: <Clock className="w-8 h-8 text-indigo-400" />,
      title: 'Real-time Notifications',
      description: 'Get instant alerts when high-value prospects show buying intent, so you never miss an opportunity.',
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-emerald-400" />,
      title: 'Advanced Analytics',
      description: 'Track performance metrics, conversion rates, and ROI with detailed analytics and reporting.',
    },
  ];

  // Create feature cards
  const featureCards = features.map((feature, index) => (
    <div
      key={index}
      className="feature-card"
    >
      <div className="mb-6 p-3 rounded-xl bg-black/20 w-fit">
        {feature.icon}
      </div>
      
      <h3 className="text-xl mb-3 text-white leading-tight">
        {feature.title}
      </h3>
      
      <p className="text-gray-300 text-base leading-relaxed">
        {feature.description}
      </p>
    </div>
  ));

  return (
    <section 
      id="features" 
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12" 
      style={{ contentVisibility: 'auto' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6 text-white leading-tight">
            Taggle Delivers the <span className="gradient-text italic">Leads That Convert</span>
          </h2>
          
          <p className="text-gray-300 text-lg mb-12 leading-relaxed">
            Verified contacts. Real-time insights. Smart automations. CRM integrations ready.
          </p>

          {/* Stats Grid - Always 3 columns in a single line */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16 max-w-4xl mx-auto">
            {[
              { icon: Clock, text: 'Save 25+ hours weekly', color: 'text-purple-400' },
              { icon: DollarSign, text: 'Cut CAC by up to 60%', color: 'text-green-400' },
              { icon: BarChart3, text: '3x higher conversions', color: 'text-blue-400' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-3 p-4 sm:p-5 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex-1 min-w-[200px] max-w-[280px]"
              >
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color} flex-shrink-0`} />
                <span className="text-white text-sm sm:text-base text-center leading-tight font-medium">
                  {stat.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Carousel */}
        <div ref={ref}>
          <SimpleCarousel
            cardsPerView={{
              mobile: 1,
              tablet: 2,
              desktop: 3,
            }}
            gap={24}
            className="features-carousel"
          >
            {featureCards}
          </SimpleCarousel>
        </div>
      </div>
    </section>
  );
};

export default Features;