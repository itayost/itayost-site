// src/data/portfolio.js
export const portfolioData = [
  {
    id: 1,
    title: "Kitchen Optimizer- מערכת לניהול הזמנות אוכל וניהול מלאי",
    description: "מערכת ניהול מלאי והזמנות אוכל - שמירת נתוני לקוחות כולל בעיות אלרגנים להתאמת הזמנות",
    technologies: ["React", "Node.js", "SupaBase"],
    image: "/images/AmosKitchen.png",
    link: null, // Add your link here when ready, e.g., "https://kitchen-optimizer.com"
    linkType: "live" // Options: "live", "demo", "github", "case-study"
  },
  {
    id: 2,
    title: "Lola Martin - אתר תדמית למסעדה",
    description: "אתר תדמית למסעדה עם תפריט אינטראקטיבי",
    technologies: ["Vercel", "Next.js"],
    image: "/images/LolaMartin.png",
    link: "https://lolamartin.co.il", // Add your link here
    linkType: "live"
  },
  {
    id: 3,
    title: "The Fader Academy - אתר תדמית לאקדמיית ספרות",
    description: "אתר תדמית לאקדמיית ספרות עם מערכת CRM למעקב אחר לידים",
    technologies: ["Next.js", "GoogleAPI", "Python"],
    image: "/images/TheFader.png",
    link: "https://thefader.co.il", // Add your link here
    linkType: "live"
  },
  {
    id: 4,
    title: "טל נדלן - דף נחיתה לסוכן נדלן",
    description: "דף נחיתה מותאם אישית לסוכן נדלן עם מערכת ניהול לידים",
    technologies: ["Next.js", "Vercel"],
    image: "/images/TalNadlan.png",
    link: "https://tanadlan.com", // Add your link here
    linkType: "live"
  }
];