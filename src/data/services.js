// src/data/services.js
import { Monitor, Smartphone, Settings } from 'lucide-react';

export const servicesData = [
  {
    id: 1,
    Icon: Monitor,
    title: "אתרי אינטרנט",
    items: [
      "אתרי תדמית מרשימים",
      "חנויות אונליין מתקדמות",
      "פלטפורמות מורכבות",
      "אתרים רספונסיביים"
    ]
  },
  {
    id: 2,
    Icon: Smartphone,
    title: "אפליקציות",
    items: [
      "Native Apps",
      "Progressive Web Apps",
      "Cross-platform",
      "אפליקציות היברידיות"
    ]
  },
  {
    id: 3,
    Icon: Settings,
    title: "מערכות עסקיות",
    items: [
      "CRM מותאם אישית",
      "מערכות ניהול מתקדמות",
      "אוטומציה עסקית",
      "דאשבורדים ו-BI"
    ]
  }
];