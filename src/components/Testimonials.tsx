import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Quote } from 'lucide-react';
import SimpleCarousel from './SimpleCarousel';

interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
}

const testimonials: TestimonialData[] = [
  {
    quote: "Taggle has transformed our B2B outreach. We've seen a 43% increase in qualified leads and our sales team is closing deals 30% faster.",
    name: "Sarah Johnson",
    role: "VP of Sales",
    company: "TechGrowth Inc.",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  },
  {
    quote: "Thanks to Taggle, we're focusing only on leads that are 5x more likely to convert. It's saved our team hours every week.",
    name: "Michael Chen",
    role: "Marketing Director", 
    company: "Innovate Solutions",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
  },
  {
    quote: "Since switching to Taggle, our cost per acquisition dropped by 35% and our conversion rate doubled. It's a no-brainer.",
    name: "Emma Rodriguez",
    role: "Growth Lead",
    company: "Scale Ventures", 
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
  },
  {
    quote: "The quality of leads from Taggle is unmatched. We're closing deals faster and spending less time on qualification.",
    name: "David Park",
    role: "CEO",
    company: "StartupFlow",
    image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
  },
  {
    quote: "Taggle's automation features have streamlined our entire lead process. Our team can focus on what they do best - closing deals.",
    name: "Lisa Thompson", 
    role: "Sales Director",
    company: "GrowthLabs",
    image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg",
  },
  {
    quote: "We've tried many lead generation tools, but Taggle delivers the highest quality prospects we've ever seen.",
    name: "James Wilson",
    role: "CMO",
    company: "TechForward",
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg",
  },
];

const TestimonialCard: React.FC<{ testimonial: TestimonialData }> = ({ testimonial }) => (
  <div className="testimonial-card">
    <Quote className="w-6 h-6 text-primary-light opacity-20 mb-4 flex-shrink-0" />
    <div className="flex-1">
      <blockquote className="text-white/90 text-base leading-relaxed mb-6">
        {testimonial.quote}
      </blockquote>
      <div className="flex items-center">
        <picture>
          <source 
            srcSet={`${testimonial.image}?format=webp&w=400`} 
            type="image/webp"
            width="48"
            height="48"
          />
          <img 
            src={testimonial.image} 
            alt={`${testimonial.name} profile`}
            className="testimonial-avatar"
            width="48"
            height="48"
            loading="lazy"
            style={{ maxWidth: '400px' }}
          />
        </picture>
        <div className="overflow-hidden">
          <h4 className="font-heading text-white text-base truncate">
            {testimonial.name}
          </h4>
          <p className="text-white/60 text-sm truncate">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const [ref, inView] = useInView({ 
    triggerOnce: true, 
    threshold: 0.1,
    rootMargin: '50px 0px'
  });

  // Create testimonial cards
  const testimonialCards = testimonials.map((testimonial, index) => (
    <TestimonialCard 
      key={index} 
      testimonial={testimonial}
    />
  ));

  return (
    <section 
      id="testimonials" 
      className="py-16 sm:py-20 lg:py-24 bg-background relative z-0 px-4 sm:px-6 lg:px-8"
      style={{ contentVisibility: 'auto' }}
    >
      <div className="absolute inset-0 bg-gradient-radial from-primary-dark/20 via-background to-transparent opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16" ref={ref}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-white leading-tight">
            Trusted by <span className="gradient-text italic">Industry Leaders</span>
          </h2>
          
          <p className="text-white/70 text-lg mb-12">
            See how companies are scaling their outreach with Taggle.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <SimpleCarousel
          cardsPerView={{
            mobile: 1,
            tablet: 2,
            desktop: 3,
          }}
          gap={24}
          className="testimonials-carousel"
        >
          {testimonialCards}
        </SimpleCarousel>
      </div>
    </section>
  );
};

export default Testimonials;