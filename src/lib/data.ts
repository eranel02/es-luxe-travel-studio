import dubai from "@/assets/dest-dubai.jpg";
import thailand from "@/assets/dest-thailand.jpg";
import greece from "@/assets/dest-greece.jpg";
import italy from "@/assets/dest-italy.jpg";
import paris from "@/assets/dest-paris.jpg";
import maldives from "@/assets/dest-maldives.jpg";
import hero from "@/assets/hero-maldives.jpg";

export const images = { dubai, thailand, greece, italy, paris, maldives, hero };

export type DestinationId = "dubai" | "thailand" | "greece" | "italy" | "paris" | "maldives";

export const destinations: { id: DestinationId; name: string; en: string; tagline: string; image: string; from: number }[] = [
  { id: "dubai", name: "דובאי", en: "Dubai", tagline: "יוקרה מודרנית במדבר", image: dubai, from: 3490 },
  { id: "thailand", name: "תאילנד", en: "Thailand", tagline: "איים טרופיים ותרבות קסומה", image: thailand, from: 4290 },
  { id: "greece", name: "יוון", en: "Greece", tagline: "שקיעות לבנות־כחולות", image: greece, from: 2890 },
  { id: "italy", name: "איטליה", en: "Italy", tagline: "חוף אמלפי וטעמים של קיץ", image: italy, from: 3790 },
  { id: "paris", name: "פריז", en: "Paris", tagline: "עיר האורות והרומנטיקה", image: paris, from: 3190 },
  { id: "maldives", name: "האיים המלדיביים", en: "Maldives", tagline: "וילות מעל המים", image: maldives, from: 9890 },
];

export type Pkg = {
  id: string;
  dest: DestinationId;
  title: string;
  hotel: string;
  stars: number;
  nights: number;
  price: number;
  badge?: string;
  popularity: number;
  depart: string; // ISO
  board: string;
  description: string;
  room: string;
  flight: { out: string; back: string; airline: string };
  included: string[];
  excluded: string[];
  attractions: { name: string; price: number }[];
  hot?: boolean;
};

const inc = ["טיסות הלוך ושוב", "מזוודה 23 ק״ג", "העברות משדה התעופה", "ביטוח בסיסי למזוודות", "ליווי אישי 24/7"];
const exc = ["ביטוח בריאות לחו״ל", "מסי עיר מקומיים", "הוצאות אישיות", "טיפים"];

export const packages: Pkg[] = [
  { id: "dubai-atlantis", dest: "dubai", title: "דובאי — אטלנטיס דה פאלם", hotel: "Atlantis The Palm", stars: 5, nights: 5, price: 7490, badge: "דיל חם", popularity: 98, depart: "2026-12-14", board: "ארוחת בוקר", hot: true,
    description: "אתר נופש אייקוני על האי המלאכותי פאלם ג׳ומיירה, עם פארק המים אקוואוונצ׳ר, חוף פרטי ומסעדות שף.", room: "חדר Ocean King עם נוף למפרץ, 45 מ״ר", flight: { out: "TLV 08:15 → DXB 13:30", back: "DXB 16:40 → TLV 19:05", airline: "Emirates" }, included: [...inc, "כניסה לפארק המים"], excluded: exc,
    attractions: [{ name: "ספארי מדבר בשקיעה", price: 290 }, { name: "תצפית בורג׳ חליפה קומה 124", price: 220 }] },
  { id: "dubai-address", dest: "dubai", title: "דובאי — דאונטאון ובורג׳ חליפה", hotel: "Address Downtown", stars: 5, nights: 4, price: 5690, popularity: 84, depart: "2027-01-10", board: "ארוחת בוקר",
    description: "מלון בוטיק־יוקרה במרכז העיר, צמוד לדובאי מול ולמזרקות המפורסמות.", room: "Deluxe Fountain View, 42 מ״ר", flight: { out: "TLV 10:00 → DXB 15:05", back: "DXB 18:00 → TLV 20:20", airline: "flydubai" }, included: inc, excluded: exc,
    attractions: [{ name: "שייט ארוחת ערב במרינה", price: 260 }] },
  { id: "thai-phuket", dest: "thailand", title: "פוקט — חופשת איים", hotel: "Rosewood Phuket", stars: 5, nights: 9, price: 9890, badge: "הכי מבוקש", popularity: 95, depart: "2027-02-02", board: "ארוחת בוקר", hot: true,
    description: "וילות פרטיות מוקפות ג׳ונגל מול מפרץ אמרלד, ספא עטור פרסים ושייט לאיי פי פי.", room: "Ocean Pavilion עם בריכה פרטית", flight: { out: "TLV 21:30 → HKT 13:10 (+1)", back: "HKT 23:20 → TLV 06:10", airline: "El Al" }, included: [...inc, "שייט יום לאיי פי פי"], excluded: exc,
    attractions: [{ name: "קורס בישול תאילנדי", price: 180 }, { name: "קיאקים בפאנג נגה", price: 240 }] },
  { id: "thai-samui", dest: "thailand", title: "קוסמוי — רוגע טרופי", hotel: "Four Seasons Koh Samui", stars: 5, nights: 8, price: 11490, popularity: 77, depart: "2027-03-05", board: "חצי פנסיון",
    description: "וילות על צלע גבעה מעל מפרץ פרטי, יוגה בזריחה וארוחות על החוף.", room: "Hillside Pool Villa", flight: { out: "TLV 21:30 → USM 15:40 (+1)", back: "USM 10:00 → TLV 21:00", airline: "Thai Airways" }, included: inc, excluded: exc,
    attractions: [{ name: "שייט לפארק אנג תונג", price: 260 }] },
  { id: "greece-santorini", dest: "greece", title: "סנטוריני — שקיעה באויה", hotel: "Canaves Oia Suites", stars: 5, nights: 5, price: 6890, badge: "זוגות", popularity: 93, depart: "2027-05-20", board: "ארוחת בוקר", hot: true,
    description: "סוויטות חצובות בצוק עם בריכות אינסוף ונוף ישיר לקלדרה ולשקיעה המפורסמת.", room: "Honeymoon Suite עם ג׳קוזי פרטי", flight: { out: "TLV 06:30 → JTR 09:00", back: "JTR 20:10 → TLV 22:30", airline: "Aegean" }, included: inc, excluded: exc,
    attractions: [{ name: "שייט קטמרן בשקיעה", price: 340 }, { name: "סיור יקבים", price: 190 }] },
  { id: "greece-crete", dest: "greece", title: "כרתים — משפחות על החוף", hotel: "Domes Noruz Chania", stars: 5, nights: 6, price: 4290, popularity: 81, depart: "2027-07-08", board: "הכל כלול",
    description: "מתחם חוף רגוע עם מועדון ילדים, בריכות מחוממות ומטבח כרתי עונתי.", room: "Family Suite עם גישה לבריכה", flight: { out: "TLV 07:00 → CHQ 09:00", back: "CHQ 19:00 → TLV 21:00", airline: "Israir" }, included: [...inc, "מועדון ילדים"], excluded: exc,
    attractions: [{ name: "חוף בלוס ושייט", price: 210 }] },
  { id: "italy-amalfi", dest: "italy", title: "חוף אמלפי — פוזיטנו", hotel: "Le Sirenuse", stars: 5, nights: 6, price: 10990, badge: "בלעדי", popularity: 89, depart: "2027-06-12", board: "ארוחת בוקר",
    description: "מלון אגדי מעל מפרץ פוזיטנו, עם טרסות לימון, בריכה ומסעדה זוכת כוכב.", room: "Sea View Deluxe עם מרפסת", flight: { out: "TLV 05:40 → NAP 08:45", back: "NAP 17:30 → TLV 22:00", airline: "ITA Airways" }, included: [...inc, "נהג פרטי מנאפולי"], excluded: exc,
    attractions: [{ name: "סירה פרטית לקאפרי", price: 690 }, { name: "סדנת לימונצ׳לו", price: 150 }] },
  { id: "italy-rome", dest: "italy", title: "רומא וטוסקנה", hotel: "Hotel de Russie", stars: 5, nights: 7, price: 7790, popularity: 74, depart: "2027-04-14", board: "ארוחת בוקר",
    description: "שלושה לילות ברומא וארבעה בווילה טוסקנית בין כרמים — מסע תרבות וקולינריה.", room: "Deluxe Garden View", flight: { out: "TLV 09:00 → FCO 12:00", back: "FCO 14:00 → TLV 18:40", airline: "El Al" }, included: [...inc, "רכב שכור בטוסקנה"], excluded: exc,
    attractions: [{ name: "סיור בוותיקן ללא תורים", price: 280 }] },
  { id: "paris-classic", dest: "paris", title: "פריז הרומנטית", hotel: "Shangri-La Paris", stars: 5, nights: 4, price: 6290, badge: "דיל חם", popularity: 91, depart: "2026-12-22", board: "ארוחת בוקר", hot: true,
    description: "ארמון היסטורי עם נוף ישיר למגדל אייפל, ספא ומסעדה עטורת כוכבי מישלן.", room: "Deluxe Eiffel View", flight: { out: "TLV 06:00 → CDG 10:00", back: "CDG 16:30 → TLV 22:15", airline: "Air France" }, included: inc, excluded: exc,
    attractions: [{ name: "שייט ערב על הסן", price: 160 }, { name: "סיור בלובר", price: 210 }] },
  { id: "paris-disney", dest: "paris", title: "פריז ודיסנילנד למשפחות", hotel: "Disneyland Hotel", stars: 4, nights: 5, price: 4890, popularity: 86, depart: "2027-04-02", board: "חצי פנסיון",
    description: "שלושה ימים בפארקים של דיסני ושני ימים בעיר — חופשה משפחתית מושלמת.", room: "Superior Family Room", flight: { out: "TLV 07:30 → CDG 11:20", back: "CDG 17:00 → TLV 22:30", airline: "El Al" }, included: [...inc, "כרטיסי פארק ל-3 ימים"], excluded: exc,
    attractions: [{ name: "ארוחה עם הדמויות", price: 140 }] },
  { id: "maldives-soneva", dest: "maldives", title: "המלדיביים — וילה מעל המים", hotel: "Soneva Jani", stars: 5, nights: 7, price: 24900, badge: "ירח דבש", popularity: 88, depart: "2027-01-25", board: "חצי פנסיון", hot: true,
    description: "וילות מעל הלגונה עם מגלשה פרטית למים, גג נפתח לתצפית כוכבים וספא מעל הים.", room: "Water Retreat עם בריכה פרטית", flight: { out: "TLV 23:00 → MLE 11:30 (+1)", back: "MLE 13:00 → TLV 20:30", airline: "Etihad" }, included: [...inc, "הטסה במטוס ימי"], excluded: exc,
    attractions: [{ name: "שנורקלינג עם מנטות", price: 420 }, { name: "ארוחה פרטית על שרטון", price: 1200 }] },
  { id: "maldives-family", dest: "maldives", title: "המלדיביים — הכל כלול", hotel: "Kuda Villingili", stars: 5, nights: 6, price: 15990, popularity: 72, depart: "2027-03-18", board: "הכל כלול",
    description: "אתר נופש חדשני עם בית עץ לילדים, צלילה, ושישה מסעדות — הכל כלול.", room: "Beach Villa with Pool", flight: { out: "TLV 23:00 → MLE 11:30 (+1)", back: "MLE 13:00 → TLV 20:30", airline: "Emirates" }, included: [...inc, "העברה בסירה מהירה"], excluded: exc,
    attractions: [{ name: "צלילה בשונית", price: 380 }] },
];

export const ils = (n: number) =>
  new Intl.NumberFormat("he-IL", { style: "currency", currency: "ILS", maximumFractionDigits: 0 }).format(n);

export const heDate = (iso: string) =>
  new Intl.DateTimeFormat("he-IL", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso));

export const destName = (id: DestinationId) => destinations.find((d) => d.id === id)!.name;
export const destImage = (id: DestinationId) => destinations.find((d) => d.id === id)!.image;

export const testimonials = [
  { name: "משפחת לוי (דוגמה)", trip: "תאילנד", text: "כל פרט תוכנן מראש — מהנהג שחיכה בשדה ועד ההפתעה בחדר. הרגשנו שמישהו דואג לנו בכל רגע." },
  { name: "נועה ואיתי (דוגמה)", trip: "סנטוריני, ירח דבש", text: "הסוכנת שלנו הכירה כל מלון באי. קיבלנו את הסוויטה הכי יפה שראינו, במחיר שלא מצאנו בשום מקום." },
  { name: "דוד כ. (דוגמה)", trip: "דובאי, נסיעת עסקים ופנאי", text: "שירות מהיר, זמין בוואטסאפ גם בלילה, וחבילה מותאמת בדיוק ללוח הזמנים שלי." },
];

export const agents = [
  { id: "a1", name: "אסתר שמעוני", role: "מנהלת", email: "esther@demo.es-travels", phone: "050-000-0001", leads: 24, sales: 412000, avatar: "א" },
  { id: "a2", name: "יוסי מזרחי", role: "סוכן בכיר", email: "yossi@demo.es-travels", phone: "050-000-0002", leads: 31, sales: 356000, avatar: "י" },
  { id: "a3", name: "מיכל אברהם", role: "סוכנת", email: "michal@demo.es-travels", phone: "050-000-0003", leads: 18, sales: 198000, avatar: "מ" },
  { id: "a4", name: "רון דהן", role: "סוכן", email: "ron@demo.es-travels", phone: "050-000-0004", leads: 12, sales: 121000, avatar: "ר" },
];

export type LeadStatus = "חדש" | "בטיפול" | "הצעה נשלחה" | "נסגר" | "לא רלוונטי";
export const leads: { id: string; name: string; phone: string; email: string; dest: string; date: string; budget: number; status: LeadStatus; agent: string; notes: string }[] = [
  { id: "L-1042", name: "רונית כהן", phone: "052-111-2233", email: "ronit@example.com", dest: "סנטוריני", date: "2027-05-20", budget: 14000, status: "חדש", agent: "מיכל אברהם", notes: "ירח דבש, מעדיפים סוויטה עם ג׳קוזי." },
  { id: "L-1041", name: "אבי ישראלי", phone: "054-222-3344", email: "avi@example.com", dest: "דובאי", date: "2026-12-14", budget: 22000, status: "בטיפול", agent: "יוסי מזרחי", notes: "משפחה עם 2 ילדים, רוצים פארק מים." },
  { id: "L-1040", name: "שירה גולן", phone: "050-333-4455", email: "shira@example.com", dest: "המלדיביים", date: "2027-01-25", budget: 55000, status: "הצעה נשלחה", agent: "אסתר שמעוני", notes: "יום הולדת 40, מבקשת ארוחה פרטית." },
  { id: "L-1039", name: "משה פרץ", phone: "053-444-5566", email: "moshe@example.com", dest: "רומא", date: "2027-04-14", budget: 16000, status: "נסגר", agent: "רון דהן", notes: "כשר — לבדוק מסעדות." },
  { id: "L-1038", name: "תמר בן דוד", phone: "058-555-6677", email: "tamar@example.com", dest: "פוקט", date: "2027-02-02", budget: 26000, status: "בטיפול", agent: "מיכל אברהם", notes: "גמישות בתאריכים ±3 ימים." },
  { id: "L-1037", name: "עידו רוזן", phone: "052-666-7788", email: "ido@example.com", dest: "פריז", date: "2026-12-22", budget: 12000, status: "לא רלוונטי", agent: "יוסי מזרחי", notes: "הזמין עצמאית." },
];

export const quotations = [
  { id: "Q-2207", customer: "שירה גולן", dest: "המלדיביים", total: 52400, status: "נשלחה", date: "2026-11-03", expires: "2026-11-17" },
  { id: "Q-2206", customer: "אבי ישראלי", dest: "דובאי", total: 21800, status: "טיוטה", date: "2026-11-05", expires: "2026-11-19" },
  { id: "Q-2205", customer: "תמר בן דוד", dest: "פוקט", total: 25600, status: "טיוטה", date: "2026-11-04", expires: "2026-11-18" },
  { id: "Q-2204", customer: "משה פרץ", dest: "רומא וטוסקנה", total: 15580, status: "אושרה", date: "2026-10-28", expires: "2026-11-11" },
  { id: "Q-2203", customer: "גלית שרון", dest: "פריז", total: 13900, status: "פג תוקף", date: "2026-10-10", expires: "2026-10-24" },
];

export const bookings = [
  { id: "B-8812", customer: "משה פרץ", dest: "רומא וטוסקנה", depart: "2027-04-14", total: 15580, paid: 15580, payment: "שולם", supplier: "אושר" },
  { id: "B-8811", customer: "יעל מור", dest: "סנטוריני", depart: "2027-05-20", total: 13780, paid: 4000, payment: "מקדמה", supplier: "אושר" },
  { id: "B-8810", customer: "קרן אלון", dest: "דובאי", depart: "2026-12-14", total: 18900, paid: 0, payment: "ממתין", supplier: "ממתין לאישור" },
  { id: "B-8809", customer: "נדב שגיא", dest: "פוקט", depart: "2027-02-02", total: 19780, paid: 19780, payment: "שולם", supplier: "אושר" },
];

export const revenue = [
  { m: "יוני", v: 182 }, { m: "יולי", v: 241 }, { m: "אוג׳", v: 298 }, { m: "ספט׳", v: 214 }, { m: "אוק׳", v: 263 }, { m: "נוב׳", v: 311 },
];

export const WHATSAPP = "https://wa.me/972500000000";
