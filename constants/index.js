import { Doctor } from "@components/core/icon/doctor";
import { Elderly } from "@components/core/icon/elderly";
import { Nurse } from "@components/core/icon/nurse";
import { FaInfoCircle, FaBalanceScale } from "react-icons/fa";
import {
  FaHandsHelping,
  FaShieldAlt,
  FaStar,
  FaUsers,
  FaLightbulb,
  FaHandshake,
} from "react-icons/fa";

import {
  Linkedin,
  Instagram,
  Twitter,
  FacebookRect,
} from "@components/core/icon/socials";
import Image from "next/image";

export const navLinks = [
  {
    id: "home",
    link: "/",
    title: "Home",
  },
  {
    id: "company",
    title: "Our Company",
    subNav: [
      {
        id: "about",
        title: "About Us",
        link: "/about",
        icon: <FaInfoCircle />,
      },
      {
        id: "values",
        title: "Our Values",
        link: "/values",
        icon: <FaBalanceScale />,
      },
    ],
  },
  {
    id: "features",
    link: "/features",
    title: "Features",
  },
  {
    id: "how",
    link: "/how-it-works",
    title: "How it works",
  },
  {
    id: "blog",
    link: "/blog",
    title: "Blog",
  },
  {
    id: "contact",
    link: "/contact-us",
    title: "Contact Us",
  },
];
export const DashboardLinks = [
  {
    id: "client",
    link: "/client",
    title: "Home",
  },
  {
    id: "notification",
    link: "/client/notifications",
    title: "Notifications",
  },
  {
    id: "booking",
    link: "/client/booking",
    title: "Book an appointment",
  },
  {
    id: "contact",
    link: "/client/contact",
    title: "Contact Us",
  },
  {
    id: "settings",
    link: "/client/settings",
    title: "Settings",
  },
];
export const NurseDashboardLinks = [
  {
    id: "nurse",
    link: "/nurse",
    title: "Home",
  },
  {
    id: "notification",
    link: "/nurse/notifications",
    title: "Notifications",
  },
  {
    id: "client",
    link: "/nurse/clients",
    title: "Clients",
  },
  {
    id: "contact",
    link: "/nurse/contact",
    title: "Contact Support",
  },
  {
    id: "settings",
    link: "/nurse/settings",
    title: "Settings",
  },
];
export const AdminDashboardLinks = [
  {
    id: "admin",
    link: "/admin",
    title: "Home",
  },
  {
    id: "notification",
    link: "/admin/notifications",
    title: "Notifications",
  },
  {
    id: "client",
    link: "/admin/clients",
    title: "Clients",
  },
  {
    id: "nurse",
    link: "/admin/nurses",
    title: "Nurses",
  },
  {
    id: "settings",
    link: "/admin/settings",
    title: "Settings",
  },
];

export const features = [
  {
    icon: "/assets/icons/proximity.svg",
    name: "Proximity-Based Matching",
    title: "Expertly Matched Caregivers",
    description:
      "We take the guesswork out of finding care. Our platform carefully matches you with caregivers and nurses based on your health needs, preferences, and care requirements, ensuring you receive personalized and dedicated support.",
  },
  {
    icon: "/assets/icons/expert.svg",
    name: "Needs and Expertise Matching",
    title: "Seamless Booking",
    description:
      "With our user-friendly booking system, scheduling care services is simple. Whether you need urgent care or are planning ahead, Supracarer makes it easy to arrange services that work around your schedule.",
  },
  {
    icon: "/assets/icons/urgency.svg",
    name: "Dynamic Availability and Urgency Matching",
    title: "Thriving Fitness Community",
    description:
      "Join our vibrant community focused on health and wellness. Share fitness tips, participate in group activities, and stay motivated on your journey to better health with support from peers and professionals alike.",
  },
];

export const keyBenefits = [
  {
    id: 1,
    title: "Personalized, All-in-One Holistic Health Solution:",
    desc: {
      paragraph1:
        "Whether you're focused on physical, mental, or emotional well-being, Supracarer offers an integrated platform that addresses all aspects of your health.",
      paragraph2:
        "Your wellness plan is tailored to your unique goals, preferences, and lifestyle, ensuring a completely personalized experience.",
    },
  },
  {
    id: 2,
    title: "Access to Certified Practitioners from Various Health Disciplines:",
    desc: {
      paragraph1:
        "Connect with trusted experts including nutritionists, mental health counselors, yoga instructors, and more, all in one place.",
      paragraph2:
        "Benefit from a range of specialties designed to support holistic wellness.",
    },
  },
  {
    id: 4,
    title: "Seamless Appointment Scheduling:",
    desc: {
      paragraph1:
        "Easily book appointments with certified practitioners directly through the platform. No more hassle with finding and managing multiple contacts.",
      paragraph2: "",
    },
  },
  {
    id: 5,
    title: "Tailored Health Advice from Day One:",
    desc: {
      paragraph1:
        "Supracarer starts working for you the moment you sign up by offering customized tips and insights that match your individual health profile.",
      paragraph2: "",
    },
  },
  {
    id: 6,
    title: "Flexible and Convenient:",
    desc: {
      paragraph1:
        "Manage your wellness journey on your own terms, whether you prefer mobile, desktop, or tablet. Stay connected and track your progress from anywhere.",
      paragraph2: "",
    },
  },
];

export const howItWorks = [
  {
    id: "Step 1",
    name: "User Registration and Profile Setup:",
    description:
      "Clients and caregivers register on the app and set up their profiles, including location, health needs, and expertise.",
  },
  {
    id: "Step 2",
    name: "Service Request Initiation:",
    description:
      "Clients initiate a service request by inputting their location, specific needs, and urgency level.",
  },
  {
    id: "Step 3",
    name: "Matching Process:",
    description:
      "Supracarer matches the client with the most suitable caregiver based on proximity, expertise, and availability.",
  },
  {
    id: "Step 4",
    name: "Notification and Confirmation:",
    description:
      "Both the client and the caregiver receive notifications about the match. The caregiver confirms the appointment.",
  },
  {
    id: "Step 5",
    name: "Care Delivery and Feedback:",
    description:
      "The caregiver provides the required care, and both parties can leave feedback in the app to improve future matching and service quality.",
  },
];

export const aboutUs = [
  {
    id: "1",
    statement:
      "A homecare app that easily connects families with qualified home care healthcare professionals, ensuring a simple and efficient process. ",
  },
  {
    id: "2",
    statement:
      "We are dedicated to helping individuals and families find trusted, compassionate caregivers and nurses who provide high-quality support tailored to their specific needs.",
  },
  {
    id: "3",
    statement:
      "We offer round-the-clock services, with our customer support team available whenever you need assistance.",
  },
  {
    id: "4",
    statement:
      "At Supracarer, we recognise the critical need for personalized healthcare in the home environment.",
  },
];

export const mission = [
  {
    title: "Our Mission",
    mission:
      "Our mission is to provide compassionate, high-quality and comprehensive home care services that empower individuals.",
  },
];

export const vision = [
  {
    title: "Our Vision",
    vision:
      "Our vision is to be the leading provider of innovative and holistic home care solutions.",
  },
];

export const team = [
  {
    id: "1",
    image: "/assets/images/founder.webp",
    name: "Kwabena Owusu",
    position: "Founder",
  },
  {
    id: "2",
    image: "/assets/images/co-founder.webp",
    name: "Jeremiah Ebizo",
    position: "Co-Founder/CTO",
  },
  {
    id: "3",
    image: "/assets/images/founders-adviser.webp",
    name: "Mawuena Abena Dossah",
    position: "Founder's Advisor",
  },
  {
    id: "4",
    image: "/assets/images/head-of-finance.webp",
    name: "Nancy Pepprah",
    position: "Head of Finance",
  },
  {
    id: "5",
    image: "/assets/images/brand-designer.webp",
    name: "Joshua Acquah Addo",
    position: "Brand Designer",
  },
];

export const pricingPlan = [
  {
    id: "1",
    name: "Basic Plan",
    heading: "Perfect for those who need reliable and nearby assistance",
    amount: "₵19.99",
    annual: "₵199.99",
    discount: "16%",
    features: {
      first: {
        title: "Proximity-Based Matching",
        available: "yes",
      },
      second: {
        title: "Needs and Expertise Matching",
        available: "no",
      },
      third: {
        title: "Personalized Care Plans",
        available: "no",
      },
      forth: {
        title: "Dynamic Availability/Urgency Matching",
        available: "no",
      },
      fifth: {
        title: "24/7 Support",
        available: "no",
      },
    },
  },
  {
    id: "2",
    name: "Standard Plan",
    heading:
      "Ideal for clients who need specialized care tailored to their unique needs.",
    amount: "₵39.99",
    annual: "₵399.99",
    discount: "16%",
    features: {
      first: {
        title: "Proximity-Based Matching",
        available: "yes",
      },
      second: {
        title: "Needs and Expertise Matching",
        available: "yes",
      },
      third: {
        title: "Personalized Care Plans",
        available: "yes",
      },
      forth: {
        title: "Dynamic Availability/Urgency Matching",
        available: "no",
      },
      fifth: {
        title: "24/7 Support",
        available: "no",
      },
    },
  },
  {
    id: "3",
    name: "Premium Plan",
    heading:
      "The ultimate plan for comprehensive, responsive, and expert home healthcare.",
    amount: "₵59.99",
    annual: "₵599.99",
    discount: "16%",
    features: {
      first: {
        title: "Proximity-Based Matching",
        available: "yes",
      },
      second: {
        title: "Needs and Expertise Matching",
        available: "yes",
      },
      third: {
        title: "Personalized Care Plans",
        available: "yes",
      },
      forth: {
        title: "Dynamic Availability/Urgency Matching",
        available: "yes",
      },
      fifth: {
        title: "24/7 Support",
        available: "yes",
      },
    },
  },
];

export const faqs = [
  // Client FAQs
  {
    id: 1,
    question: "How does Supracarer work?",
    answer:
      "Supracarer connects families with highly qualified and compassionate caregivers through our smart matching system. Simply register, create a service request, and get matched with a caregiver tailored to your needs.",
    role: "client",
  },
  {
    id: 2,
    question: "Is Supracarer available 24/7?",
    answer:
      "Yes, we offer round-the-clock care services and support. Whether you need urgent assistance or are planning ahead, our team is here to help anytime.",
    role: "client",
  },
  {
    id: 3,
    question: "Can I choose my caregiver?",
    answer:
      "Our platform carefully matches you with professionals based on your preferences, care needs, and location. You can review profiles before confirming.",
    role: "client",
  },
  {
    id: 4,
    question: "Is my personal and health information secure?",
    answer:
      "Absolutely. At Supracarer, we follow strict data protection policies to ensure all your health and personal information remains confidential and secure.",
    role: "client",
  },
  {
    id: 5,
    question: "What types of services can I book?",
    answer:
      "You can book a range of services including elderly care, post-operative support, disability care, and wellness check-ins. We tailor each service to fit your lifestyle.",
    role: "client",
  },

  // Caregiver FAQs
  {
    id: 6,
    question: "How do I join Supracarer as a caregiver?",
    answer:
      "You can apply directly through our platform. Once you submit your credentials and pass verification, we will onboard you and start matching you with suitable clients.",
    role: "caregiver",
  },
  {
    id: 7,
    question: "Do I need specific qualifications?",
    answer:
      "Yes. All caregivers must have professional healthcare certifications and valid IDs. We prioritize caregivers with experience in elder care, nursing, or similar fields.",
    role: "caregiver",
  },
  {
    id: 8,
    question: "How are caregivers matched with clients?",
    answer:
      "We use an AI-driven algorithm to match caregivers with clients based on their health conditions, preferences, and proximity. This ensures high compatibility and satisfaction.",
    role: "caregiver",
  },
  {
    id: 9,
    question: "When and how do I get paid?",
    answer:
      "Payments are processed weekly or bi-weekly through your preferred payment method, after services are confirmed by the client.",
    role: "caregiver",
  },
  {
    id: 10,
    question: "Can I set my availability?",
    answer:
      "Yes, caregivers can set their working hours and availability from their dashboard, giving you full control over your schedule.",
    role: "caregiver",
  },
  // General FAQs
  {
    id: 11,
    question: "What is Proximity-Based Matching and how does it benefit me?",
    answer:
      "We match clients to our nurses and caregivers who are nearby. This ensures that caregivers can reach you quickly in case of emergencies, reducing travel time and costs, and providing prompt assistance.",
    role: "general",
  },
  {
    id: 12,
    question: "How does Needs and Expertise Matching work in Supracarer?",
    answer:
      "Needs and Expertise Matching match you to our trusted caregivers based on their skills and your specific healthcare needs. This includes matching based on medical conditions, required skill sets, and previous experience, ensuring you receive the most suitable care.",
    role: "general",
  },
  {
    id: 13,
    question: "What is Dynamic Availability and Urgency Matching?",
    answer:
      "Dynamic Availability and Urgency Matching constantly updates caregivers availability and matches them with you based on the urgency of care required. It prioritizes urgent needs, ensuring that caregivers are assigned to clients who need immediate attention.",
    role: "general",
  },
];

export const pricingFaqs = [
  {
    question: "What’s the difference between the Basic and Standard plans?",
    answer:
      "The Basic plan gives you access to basic homecare services, while the Standard plan offers advanced features such as detailed health tracking, priority booking, and 24/7 support.",
  },
  {
    question: "How does billing work for the Premium plan?",
    answer:
      "You can choose between monthly or annual subscriptions. Annual subscribers save 20% compared to the monthly rate. Billing occurs on the first of each month or annually.",
  },
  {
    question: "Can I cancel or switch plans at any time?",
    answer:
      "Yes, you can cancel or switch between plans at any time. There are no cancellation fees, and you'll retain access to Pro features until the end of your billing period.",
  },
];

export const companySocials = [
  {
    id: 1,
    name: "Facebook",
    link: "https://www.facebook.com/share/1AfZR6cZaj/",
    icon: <FacebookRect />,
  },
  {
    id: 2,
    name: "Instagram",
    link: "https://www.instagram.com/supracarer?igsh=ZjNhcXprNnF6Z240",
    icon: <Instagram />,
  },
  {
    id: 3,
    name: "Linkedin",
    link: "https://www.linkedin.com/company/supracarer/",
    icon: <Linkedin />,
  },
  {
    id: 4,
    name: "X",
    link: "https://x.com/supracarer?t=ohbsUQhePBnum9uDTo3VoA&s=09",
    icon: <Twitter />,
  },
];

export const historyData = [
  {
    name: "John Doe",
    date: "2024-10-23",
    time: "10:00 AM",
    bloodPressure: "120/80",
  },
  {
    name: "Jane Smith",
    date: "2024-10-22",
    time: "2:00 PM",
    bloodPressure: "125/85",
  },
  {
    name: "Michael Brown",
    date: "2024-10-21",
    time: "6:00 PM",
    bloodPressure: "130/90",
  },
  {
    name: "Emily Davis",
    date: "2024-10-20",
    time: "9:30 AM",
    bloodPressure: "115/75",
  },
];

export const abtWhatWeOffer = [
  {
    id: 1,
    name: "For The Elderly",
    image: "/assets/images/02.webp",
    icon: (
      <Elderly
        color="#006838"
        className="w-12 h-12 transition-all duration-300"
      />
    ),
    text: "Have no hard time finding a ​compassionate person to care for ​that loved one with our help.",
  },
  {
    id: 2,
    name: "For The Sick",
    image: "/assets/images/10500.webp",
    icon: (
      <Nurse
        color="#006838"
        className="w-12 h-12 transition-all duration-300"
      />
    ),
    text: "Be free to find individuals that ​meet your preferences and ​requirement with us.",
  },
  {
    id: 3,
    name: "For Nurses and Caregivers",
    image: "/assets/images/nurses.webp",
    icon: (
      <Doctor
        color="#006838"
        className="w-12 h-12 transition-all duration-300"
      />
    ),
    text: "Connect with families in need and ​get full paying job offers that meet ​your field of studies.",
  },
];

export const contactDetails = [
  {
    id: 1,
    title: "Phone: ",
    details: "(+233)-54-914-8087",
    icon: (
      <Image
        src="/assets/icons/icons8-phone-48.png"
        width={40}
        height={40}
        alt="phone"
      />
    ),
  },
  {
    id: 2,
    title: "Email: ",
    details: "info@supracarer.com",
    icon: (
      <Image
        src="/assets/icons/icons8-envelope-48.png"
        width={40}
        height={40}
        alt="email"
      />
    ),
  },
  {
    id: 3,
    title: "Address: ",
    details: "ALX Ghana One Airport Square, Accra.",
    icon: (
      <Image
        src="/assets/icons/icons8-place-marker-50.png"
        width={40}
        height={40}
        alt="address"
      />
    ),
  },
];

export const coreValues = [
  {
    id: 1,
    title: "Compassion",
    icon: <FaHandsHelping className="text-4xl text-custom-green mb-3" />,
    description:
      "We care deeply about the wellbeing of others and treat every individual with kindness and empathy.",
  },
  {
    id: 2,
    title: "Integrity",
    icon: <FaShieldAlt className="text-4xl text-custom-green mb-3" />,
    description:
      "We uphold honesty, transparency, and ethical standards in all that we do.",
  },
  {
    id: 3,
    title: "Excellence",
    icon: <FaStar className="text-4xl text-custom-green mb-3" />,
    description:
      "We strive to deliver the highest standard of care and continuously improve our services.",
  },
  {
    id: 4,
    title: "Collaboration",
    icon: <FaUsers className="text-4xl text-custom-green mb-3" />,
    description:
      "We work together with families, caregivers, and partners to achieve the best outcomes.",
  },
  {
    id: 5,
    title: "Innovation",
    icon: <FaLightbulb className="text-4xl text-custom-green mb-3" />,
    description:
      "We leverage technology and creative thinking to enhance homecare experiences.",
  },
  {
    id: 6,
    title: "Trust",
    icon: <FaHandshake className="text-4xl text-custom-green mb-3" />,
    description:
      "We build long-term relationships through reliability, confidentiality, and respect.",
  },
];
