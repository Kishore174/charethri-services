import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaArrowRight,
  FaFileContract,
  FaFileSignature,
  FaBalanceScale,
} from "react-icons/fa";
import logo from "../assets/logo.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import estamp from "../assets/e-stamp-3.jpg"
/* ============================= */
/* 🔥 BACKGROUND PARTICLES */
/* ============================= */
function BackgroundParticles() {
  const particles = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 6 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;

        return (
          <motion.span
            key={i}
            className="absolute  bg-gray-400   rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: "-10px",
            }}
            animate={{
              y: "-110vh",
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}

// ✅ ADD THIS BACK (VERY IMPORTANT)
const sliderServices = [
  {
    icon: <FaFileSignature size={36} />,
    title: "CHARETHRI BUSINESS SOLUTIONS",
    subtitle: "Complete Property Services — End to End",
    description: `🏠 Property Documentation Experts
📑 Legal & Registration Support
🤝 Trusted End-to-End Service

From pre-registration to post-registration, we handle every property process professionally and transparently.`,
    url: "https://charethribs.com",
    bg: "bg-[#6B9080]",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },
  {
  icon: <FaFileContract size={36} />,
  title: "e-Stamp & Digital Documentation Services",
  subtitle: "Secure. Government Approved. Legally Valid.",
  description: `• e-Stamp paper generation for all legal purposes
• Sale Agreement & Rental Agreement e-Stamp
• Affidavits & Declarations
• Power of Attorney (POA) e-Stamp
• Stamp duty calculation assistance
• Instant processing & verified documentation`,
  url: "https://charethribs.com",
  bg: "bg-[#5E548E]",
  img: estamp,
},

  {
    icon: <FaFileContract size={36} />,
    title: "Pre-Registration Assistance",
    subtitle: "Complete Legal Verification Support",
    description: `• Title verification & due diligence
• Encumbrance Certificate (EC) check
• Agreement to Sale & Sale Deed drafting
• Stamp duty & registration guidance
• Document verification & compliance`,
    url: "https://charethribs.com",
    bg: "bg-[#9C6644]",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
  },
  {
    icon: <FaFileSignature size={36} />,
    title: "Property Registration Services",
    subtitle: "Hassle-Free Registration Process",
    description: `• Sale Deed & Gift Deed
• Partition & Release Deed
• GPA / POA drafting & registration
• Sub-Registrar Office coordination
• End-to-end registration support`,
    url: "https://charethribs.com",
    bg: "bg-[#3A5A40]",
    img: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac",
  },
  {
    icon: <FaBalanceScale size={36} />,
    title: "Post-Registration Assistance",
    subtitle: "Complete Documentation Closure",
    description: `• Khata transfer & Khata bifurcation
• Mutation services
• BBMP / Panchayat follow-ups
• Property tax guidance & support
• Documentation closure assistance`,
    url: "https://charethribs.com",
    bg: "bg-[#355070]",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    icon: <FaBalanceScale size={36} />,
    title: "Why Choose Us",
    subtitle: "Professional. Transparent. Reliable.",
    description: `✔ Transparent process
✔ No hidden charges
✔ Timesaving & hassle-free
✔ Single point of contact
✔ Complete start-to-finish handling`,
    url: "https://charethribs.com",
    bg: "bg-[#344E41]",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf",
  },
  {
    icon: <FaPhoneAlt size={36} />,
    title: "Call for Consultation",
    subtitle: "Fast response • Clear guidance • Trusted support",
    description: `Call / WhatsApp Us: 9832444111

People who don’t want to call immediately may fill this form below.`,
    url: "#",
    bg: "bg-[#2F3E46]",
    img: "https://images.unsplash.com/photo-1556742031-c6961e8560b0",
    isForm: true,
  },
];


export default function StackedSlider() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
const formRef = useRef();
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(false);
const [isPaused, setIsPaused] = useState(false);

  // ✅ Detect screen safely
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

const nextSlide = () => {
  setActive((prev) => (prev + 1) % sliderServices.length);
};
useEffect(() => {
  if (isPaused) return;

  const interval = setInterval(() => {
    setActive((prev) => (prev + 1) % sliderServices.length);
  }, 5000);

  return () => clearInterval(interval);
}, [isPaused]);

const prevSlide = () => {
  setActive((prev) =>
    prev === 0 ? sliderServices.length - 1 : prev - 1
  );
};

 

const swipeThreshold = 80;

const handleDragEnd = (event, info) => {
  if (info.offset.y < -swipeThreshold) {
    nextSlide(); // swipe up → next
  } else if (info.offset.y > swipeThreshold) {
    prevSlide(); // swipe down → previous
  }
};

const sendEmail = (e) => {
  e.preventDefault();

  setLoading(true);

  emailjs
    .sendForm(
      "service_qwrb63k",
      "template_fqp4ecl",
      formRef.current,
      "dVsOb6uc-37lpSSqA"
    )
.then(() => {
  setLoading(false);
  setSuccess(true);
  formRef.current.reset();

  setTimeout(() => {
    setSuccess(false);
    setIsPaused(false); // ✅ Resume auto slide
  }, 2000);
})

};

  return (
<div className="relative min-h-screen md:h-screen w-full flex items-center justify-center bg-white overflow-auto md:overflow-hidden px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
  <BackgroundParticles />


      {/* LOGO */}
      <a
        href="https://charethribs.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 left-4 z-20"
      >
        <img
          src={logo}
          alt="Charethri Business Solutions"
          className="h-10 sm:h-12 md:h-14 object-contain drop-shadow-lg hover:scale-105 transition"
        />
      </a>
 {/* LEFT ARROW */}
<button
  onClick={prevSlide}
  className="absolute left-2 sm:left-12 top-1/2 -translate-y-1/2 z-40 
  bg-black/20 backdrop-blur-md text-white p-3 sm:p-4 
  rounded-full hover:bg-blacck/30 transition"
>
  <FaChevronLeft size={20} />
</button>

{/* RIGHT ARROW */}
<button
  onClick={nextSlide}
  className="absolute right-2 sm:right-12 top-1/2 -translate-y-1/2 z-40 
  bg-black/20 backdrop-blur-md text-white p-3 sm:p-4 
  rounded-full hover:bg-black/30 transition"
>
  <FaChevronRight size={20} />
</button>
<div className="relative w-full max-w-[1200px] min-h-[480px] sm:min-h-[600px] md:min-h-[650px] md:flex items-center justify-center">


        {sliderServices.map((card, index) => {
          const position = index - active;
          if (position < -1 || position > 2) return null;

          return (
<motion.div
  key={index}
  drag={position === 0 ? "y" : false}
  dragConstraints={{ top: 0, bottom: 0 }}
  dragElastic={0.2}
  onDragEnd={handleDragEnd}
  className={`absolute w-full 
    h-auto md:h-[530px]
    rounded-[28px]
    bg-white/70 backdrop-blur-2xl
    border border-black/40
     
    overflow-hidden`}
  animate={{
    y: position * (isMobile ? 50 : 100),
    scale: position === 0 ? 1 : 0.95,
    opacity: position === 0 ? 1 : 0.4,
    zIndex: 30 - Math.abs(position),
  }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>



              <div className="absolute inset-0 bg-white/5 z-0" />

   <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full text-gray-800">


<div className="p-5 sm:p-8 md:p-12 flex flex-col justify-between">

                  <div>
                    <div className="mb-4">{card.icon}</div>

   <h2 className="text-xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight">


                      {card.title}
                    </h2>
{card.isForm ? (
  <form
    ref={formRef}
    onSubmit={sendEmail}
    className="mt-6 space-y-5 max-w-md"
  >

    {/* Name */}
    <div className="relative">
      <input
        type="text"
        name="from_name"
        required
        onFocus={() => setIsPaused(true)}
        placeholder=" "
        className="peer w-full px-4 pt-5 pb-2 rounded-xl 
        bg-white/80 border border-gray-300 
        text-gray-800 outline-none 
        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
        transition"
      />
      <label className="absolute left-4 top-2 text-sm text-gray-500 
        peer-placeholder-shown:top-4 
        peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-gray-400 
        peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600 
        transition-all">
        Name
      </label>
    </div>

    {/* Phone */}
    <div className="relative">
      <input
        type="tel"
        name="phone"
        required
        onFocus={() => setIsPaused(true)}
        placeholder=" "
        className="peer w-full px-4 pt-5 pb-2 rounded-xl 
        bg-white/80 border border-gray-300 
        text-gray-800 outline-none 
        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
        transition"
      />
      <label className="absolute left-4 top-2 text-sm text-gray-500 
        peer-placeholder-shown:top-4 
        peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-gray-400 
        peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600 
        transition-all">
        Phone
      </label>
    </div>

    {/* Service */}
    <div className="relative">
      <input
        type="text"
        name="service"
        required
        onFocus={() => setIsPaused(true)}
        placeholder=" "
        className="peer w-full px-4 pt-5 pb-2 rounded-xl 
        bg-white/80 border border-gray-300 
        text-gray-800 outline-none 
        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
        transition"
      />
      <label className="absolute left-4 top-2 text-sm text-gray-500 
        peer-placeholder-shown:top-4 
        peer-placeholder-shown:text-base 
        peer-placeholder-shown:text-gray-400 
        peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600 
        transition-all">
        Service Needed
      </label>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 
      text-white font-semibold py-3 rounded-xl 
      hover:scale-105 hover:shadow-lg 
      transition-all duration-300"
    >
      {loading ? "Sending..." : "Submit Request"}
    </button>

  </form>
) : (

                     <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-md whitespace-pre-line leading-relaxed">


                        {card.description}
                      </p>
                    )}
                  </div>

                  {/* SOCIAL + PHONE */}
               <div className="flex flex-col gap-4 mt-4 sm:flex-row justify-center items-center sm:items-center sm:justify-between">

                    <div className="flex gap-5">
                      <a
                        href="https://wa.me/919832444111"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform"
                      >
                        <FaWhatsapp size={22} />
                      </a>
                      <FaFacebookF size={20} />
                      <FaInstagram size={20} />
                      <FaLinkedinIn size={20} />
                    </div>

                    <a
                      href="tel:+919832444111"
                      className="inline-flex items-center justify-center gap-2 text-sm bg-white/15 px-4 py-2 rounded-full hover:bg-white/25 transition"
                    >
                      <FaPhoneAlt />
                      <span>+91 98324 44111</span>
                    </a>
                  </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative overflow-hidden h-[220px] sm:h-[520px] md:h-[550px]
">
                  <img
                    src={card.img}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black/60 to-transparent" />

  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-4 flex md:flex-wrap flex-none justify-center md:justify-start gap-2 sm:gap-3">

                    <a
                      href="tel:+919832444111"
                      className="bg-white/20 backdrop-blur-md text-white px-4 py-2 text-xs md:text-sm rounded-full flex items-center gap-2 font-semibold hover:scale-105 transition"
                    >
                      <FaPhoneAlt />
                      Call
                    </a>

                    <a
                      href="https://wa.me/919832444111"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-4 py-2 text-xs md:text-sm rounded-full flex items-center gap-2 font-semibold hover:scale-105 transition"
                    >
                      <FaWhatsapp />
                      WhatsApp
                    </a>

                    <a
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black px-4 py-2 text-xs md:text-sm  text-nowrap rounded-full flex items-center gap-2 font-semibold hover:gap-3 transition-all"
                    >
                      Read More <FaArrowRight />
                    </a>

                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}
{success && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center">
    
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

    {/* Success Card */}
    <div className="relative bg-white rounded-xl px-8 py-6 shadow-2xl text-center animate-scaleIn">
      
      <div className="text-green-500 text-4xl mb-3">✔</div>
      
      <h3 className="text-lg font-semibold text-gray-800">
        Message Sent Successfully!
      </h3>
      
      <p className="text-sm text-gray-500 mt-1">
        We will contact you shortly.
      </p>

    </div>
  </div>
)}

      </div>


    </div>
  );
}
