export const navLinks = [

    {
        id: 'home',
        link: '/homepage',
        title: "Home"
    },
    {
        id: 'about',
        link: '/about',
        title: "About Us"
    },
    {
        id: 'features',
        link: '/features',
        title: "features"
    },
    {
        id: 'how',
        link: '/how-it-works',
        title: "How it works"
    },
    {
        id: 'pricing',
        link: '/pricing',
        title: "Pricing"
    },
    {
        id: 'contact',
        link: '/contact-us',
        title: "Contact Us"
    },
]



export const features = [

    {
        icon: '/assets/icons/proximity.svg',
        name: 'Proximity-Based Matching',
        description: 'The app uses geolocation technology to match caregivers with clients who are in close proximity.'
    },
    {
        icon: '/assets/icons/expert.svg',
        name: 'Needs and Expertise Matching',
        description: 'The app employs AI to evaluate and match caregivers based on their expertise and the specific healthcare needs of clients.'
    },
    {
        icon: '/assets/icons/urgency.svg',
        name: 'Dynamic Availability and Urgency Matching',
        description: 'The app constantly updates the availability status of caregivers and matches them with clients based on the urgency of the care required.'
    }
]

export const howItWorks = [
    {
        id: 'step-1',
        name: 'User Registration and Profile Setup:',
        description: 'Clients and caregivers register on the app and set up their profiles, including location, health needs, and expertise.'
    },
    {
        id: 'step-2',
        name: 'Service Request Initiation:',
        description: 'Clients initiate a service request by inputting their location, specific needs, and urgency level.'
    },
    {
        id: 'step-3',
        name: 'AI-Driven Matching Process:',
        description: 'The app uses AI to match the client with the most suitable caregiver based on proximity, expertise, and availability.'
    },
    {
        id: 'step-4',
        name: 'Notification and Confirmation:',
        description: 'Both the client and the caregiver receive notifications about the match. The caregiver confirms the appointment.'
    },
    {
        id: 'step-5',
        name: 'Care Delivery and Feedback:',
        description: 'The caregiver provides the required care, and both parties can leave feedback in the app to improve future matching and service quality.'
    }
]

export const aboutUs = [

    {   
        id: "1",
        statement: "An AI-powered ​homecare app that easily connects ​families with qualified home care nurses, ensuring a simple and efficient process."
    },
    {
        id: "2",
        statement: "We help connect you to ​professionally trained caregivers of ​your choice or preference though ​referral matchmaking."
    },
    {
        id: "3",
        statement: "We offer round-the-clock services, with our customer support team available whenever you need assistance."
    },
    
]

export const mission = [
    {
        title: "Our Mission",
        mission: "Our mission is to provide compassionate, personalized care for the elderly and sick by seamlessly connecting them with skilled caregivers."
    }
   
]

export const vision = [
    {
        title: "Our Vision",
        vision: "Our vision is to transform home health care into a seamless, efficient, and compassionate experience through innovative AI technology."
    }
]

export const team = [
    {
        id: '1',
        image: "/assets/images/team.webp",
        name: "Kwabena Owusu",
        position: "Founder",
        socials: {
            facebook: {
                link: 'https://fb.com',
                icon: '/assets/icons/fb.svg'
            },
            instagram: {
                link: 'https://ig.com',
                icon: '/assets/icons/ig.svg',
            },
            linkedin: {
                link: 'https://linkedin.com',
                icon: '/assets/icons/linkedin.svg'
            },
            twitter: {
                link: 'https://twitter.com',
                icon: '/assets/icons/twitter.svg'
            }
        }
    },
    {
        id: '2',
        image: "/assets/images/team.webp",
        name: "Mawuena Abena Dossah",
        position: "Co-Founder",
        socials: {
            facebook: {
                link: 'https://fb.com',
                icon: '/assets/icons/fb.svg'
            },
            instagram: {
                link: 'https://ig.com',
                icon: '/assets/icons/ig.svg',
            },
            linkedin: {
                link: 'https://linkedin.com',
                icon: '/assets/icons/linkedin.svg'
            },
            twitter: {
                link: 'https://twitter.com',
                icon: '/assets/icons/twitter.svg'
            }
        }
    },
    {
        id: '3',
        image: "/assets/images/team.webp",
        name: "Jeremiah Ebizo",
        position: "Software Engineer/CTO",
        socials: {
            facebook: {
                link: 'https://fb.com',
                icon: '/assets/icons/fb.svg'
            },
            instagram: {
                link: 'https://ig.com',
                icon: '/assets/icons/ig.svg',
            },
            linkedin: {
                link: 'https://linkedin.com',
                icon: '/assets/icons/linkedin.svg'
            },
            twitter: {
                link: 'https://twitter.com',
                icon: '/assets/icons/twitter.svg'
            }
        }
    },
    {
        id: '4',
        image: "/assets/images/team.webp",
        name: "Anita Adjoa Tafua ​Annor",
        position: "Marketing ​Director/C​MO",
        socials: {
            facebook: {
                link: 'https://fb.com',
                icon: '/assets/icons/fb.svg'
            },
            instagram: {
                link: 'https://ig.com',
                icon: '/assets/icons/ig.svg',
            },
            linkedin: {
                link: 'https://linkedin.com',
                icon: '/assets/icons/linkedin.svg'
            },
            twitter: {
                link: 'https://twitter.com',
                icon: '/assets/icons/twitter.svg'
            }
        }
    }
]

export const service = [
    {
        id: '1',
        title: 'For The Elderly',
        image: '/assets/images/service1.webp',
        description: 'Have no hard time finding a ​compassionate person to care for ​that loved one with our help'
    },
    {
        id: '2',
        title: 'For The Sick',
        image: '/assets/images/service2.webp',
        description: 'Be free to find individuals that ​meet your preferences and ​requirement with us'
    },
    {
        id: '3',
        title: 'For Nurses and Caregivers',
        image: '/assets/images/service3.webp',
        description: 'Connect with families in need and ​get full paying job offers that meet ​your field of studies'
    },

]

export const pricingPlan = [
    {
        id: '1',
        name: 'Basic Plan',
        heading: 'Perfect for those who need reliable and nearby assistance',
        amount: '₵19.99',
        annual: '₵199.99',
        discount: '16%',
        features: {
            first:{
                title: 'Proximity-Based Matching',
                available: 'yes'
            },
            second:{
                title: 'Needs and Expertise Matching',
                available: 'no'
            },
            third:{
                title: 'Personalized Care Plans',
                available: 'no'
            },  
            forth:{
                title: 'Dynamic Availability/Urgency Matching',
                available: 'no'
            }, 
            fifth:{
                title: '24/7 Support',
                available: 'no'
            }, 
            	
        }
    },
    {
        id: '2',
        name: 'Standard Plan',
        heading: 'Ideal for clients who need specialized care tailored to their unique needs.',
        amount: '₵39.99',
        annual: '₵399.99',
        discount: '16%',
        features: {
            first:{
                title: 'Proximity-Based Matching',
                available: 'yes'
            },
            second:{
                title: 'Needs and Expertise Matching',
                available: 'yes'
            },
            third:{
                title: 'Personalized Care Plans',
                available: 'yes'
            },  
            forth:{
                title: 'Dynamic Availability/Urgency Matching',
                available: 'no'
            }, 
            fifth:{
                title: '24/7 Support',
                available: 'no'
            }, 
        }
    },
    {
        id: '3',
        name: 'Premium Plan',
        heading: 'The ultimate plan for comprehensive, responsive, and expert home healthcare.',
        amount: '₵59.99',
        annual: '₵599.99',
        discount: '16%',
        features: {
            first:{
                title: 'Proximity-Based Matching',
                available: 'yes'
            },
            second:{
                title: 'Needs and Expertise Matching',
                available: 'yes'
            },
            third:{
                title: 'Personalized Care Plans',
                available: 'yes'
            },  
            forth:{
                title: 'Dynamic Availability/Urgency Matching',
                available: 'yes'
            }, 
            fifth:{
                title: '24/7 Support',
                available: 'yes'
            }, 
            	
        }
    },
]

export const faqData = [
    {
        id: '1',
        question: 'What is Proximity-Based Matching and how does it benefit me?',
        answer: 'Proximity-Based Matching uses geolocation technology to connect you with caregivers who are nearby. This ensures that caregivers can reach you quickly in case of emergencies, reducing travel time and costs, and providing prompt assistance.'
    },
    {
        id: '2',
        question: 'How does Needs and Expertise Matching work in Supracarer?',
        answer: 'Needs and Expertise Matching employs AI to assess and match caregivers based on their skills and your specific healthcare needs. This includes matching based on medical conditions, required skill sets, and previous experience, ensuring you receive the most suitable care.'
    },
    {
        id: '3',
        question: 'What is Dynamic Availability and Urgency Matching?',
        answer: 'Dynamic Availability and Urgency Matching constantly updates caregivers availability and matches them with clients based on the urgency of care required. It prioritizes urgent needs, ensuring that caregivers are assigned to clients who need immediate attention.'
    },
    {
        id: '4',
        question: 'Do I have access to 24/7 support with Supracarer?',
        answer: 'Yes, our Premium Plan offers 24/7 support, ensuring that you have access to assistance at any time of day or night, providing peace of mind and continuous care.'
    },
    {
        id: '5',
        question: 'Can I create personalized care plans with Supracarer?',
        answer: 'Yes, Personalized Care Plans are available in our Standard and Premium Plans. This feature allows you to tailor your care according to your unique needs and preferences, ensuring a customized and effective healthcare experience.'
    },
    {
        id: '6',
        question: 'What are the benefits of choosing the Premium Plan over the Basic and Standard Plans?',
        answer: 'The Premium Plan includes all available features: Proximity-Based Matching, Needs and Expertise Matching, Personalized Care Plans, Dynamic Availability and Urgency Matching, and 24/7 Support. It offers the most comprehensive, responsive, and expert home healthcare experience, making it ideal for those who require the highest level of care and support'
    },
]


export const companySocials = [
    {
        id: 1,
        name: "Facebook",
        link: 'https://fb.com',
        icon: '/assets/icons/fb.svg'
    },
    {
        id: 2,
        name: "Instagram",
        link: 'https://ig.com',
        icon: '/assets/icons/ig.svg',
    },
    {
        id: 3,
        name: "Linkedin",
        link: 'https://linkedin.com',
        icon: '/assets/icons/linkedin.svg'
    },
    {
        id: 4,
        name: "X",
        link: 'https://x.com',
        icon: '/assets/icons/twitter.svg'
    }

]

