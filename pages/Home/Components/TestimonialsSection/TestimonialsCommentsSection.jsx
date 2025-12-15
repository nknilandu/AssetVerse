import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "HR Director",
      company: "TechCorp Solutions",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
      quote:
        "AssetVerse has completely transformed how we manage company assets. What used to take hours of manual tracking now happens automatically. Our HR team has reduced administrative time by 65%. employees love the self-service request relational.",
      highlight: "Reduced admin time by 65%",
    },
    {
      name: "Michael Chen",
      role: "Operations Manager",
      company: "Global Innovations Inc",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 5,
      quote:
        "The real-time analytics and reporting features are game-changers. We can track asset utilization across departments and make data-driven decisions. The ROI was evident within the first month.",
      highlight: "ROI in first month",
    },
    {
      name: "Emily Rodriguez",
      role: "IT Manager",
      company: "DataStream Systems",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      rating: 5,
      quote:
        "Managing IT assets for 200+ employees was a nightmare before AssetVerse. Automated workflows and instant notifications made compliance reporting effortless.",
      highlight: "Effortless compliance",
    },
    {
      name: "David Thompson",
      role: "Finance Director",
      company: "Apex Enterprises",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      rating: 5,
      quote:
        "Preventing asset loss alone justified the subscription. We eliminated duplicate purchases and improved accountability across all locations.",
      highlight: "Eliminated duplicate purchases",
    },
    {
      name: "Jennifer Park",
      role: "HR Business Partner",
      company: "Innovate Labs",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
      rating: 5,
      quote:
        "Employees appreciate the transparency and ease of requesting assets. The mobile-friendly design and fast approvals significantly improved employee experience.",
      highlight: "Improved employee experience",
    },
    {
      name: "Robert Williams",
      role: "Chief Operating Officer",
      company: "Quantum Dynamics",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      rating: 5,
      quote:
        "Scaling from 50 to 300 employees would have been impossible without AssetVerse. The platform scales effortlessly, and support has been exceptional.",
      highlight: "Scales effortlessly",
    },
    // New entries
    {
      name: "Linda Gomez",
      role: "Procurement Manager",
      company: "EcoTech Solutions",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda",
      rating: 5,
      quote:
        "AssetVerse streamlined our procurement process. We now have full visibility on asset lifecycle, which has reduced unnecessary spending significantly.",
      highlight: "Reduced unnecessary spending",
    },
    {
      name: "James Carter",
      role: "Logistics Coordinator",
      company: "NextGen Logistics",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      rating: 5,
      quote:
        "Tracking and relocating assets across multiple warehouses is no longer a challenge. Real-time updates keep our team informed and accountable.",
      highlight: "Real-time warehouse tracking",
    },
    {
      name: "Priya Sharma",
      role: "Chief Technology Officer",
      company: "InnovateX",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      rating: 5,
      quote:
        "Integrating AssetVerse with our internal systems was seamless. The automation has improved productivity, and reporting has never been easier.",
      highlight: "Seamless system integration",
    },
    {
      name: "Carlos Mendes",
      role: "Facilities Manager",
      company: "UrbanWorks",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      rating: 5,
      quote:
        "Preventive maintenance scheduling and asset tracking are now automated. This has greatly reduced downtime and maintenance costs.",
      highlight: "Reduced downtime and costs",
    },
    {
      name: "Sofia Lopez",
      role: "Project Manager",
      company: "BrightFuture Tech",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
      rating: 5,
      quote:
        "The dashboard makes monitoring project assets simple and intuitive. It has enhanced collaboration across teams and improved project delivery times.",
      highlight: "Enhanced collaboration",
    },
  ];

  return (
    <div className="py-14">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="max-w-xl mx-auto text-4xl font-bold text-base-content">
          Our Client Success Stories
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-base-content/60">
          See how companies across industries are transforming their asset
          management with AssetVerse
        </p>
      </div>

      {/* Cards */}
      <Swiper
        className="mySwiper"
        spaceBetween={16}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
        speed={2000}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div
              
              className="h-[250px] mb-5 rounded-2xl border border-base-content/5 bg-base-100 p-6 shadow-xs transition hover:shadow-lg"
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full bg-base-content/10"
                  />
                  <div>
                    <p className="font-semibold text-base-content">{t.name}</p>
                    <p className="text-sm text-base-content/60">{t.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div className="max-h-18 overflow-hidden">
                <p className="text-sm leading-relaxed text-base-content/50">
                  {t.quote}
                </p>
              </div>

              {/* Divider */}
              <div className="my-4 h-px bg-base-content/10" />

              {/* Highlight */}
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-600">
                ✓ {t.highlight}
              </div>

              {/* Company */}
              <p className="mt-1 text-xs text-base-content/60">{t.company}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
