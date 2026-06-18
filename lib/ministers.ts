export interface MinisterProfile {
  slug: string;
  name: string;
  party: string;
  partyShort: string;
  partyColor: string;
  role: string;
  portfolios: string[];
  isChiefMinister?: boolean;
  constituency?: string;
  memberSince?: string;
  politicalJourney?: string;
  quote?: string;
  imagePath?: string; // drop image at public/assets/ministers/<slug>.jpg
}

const profiles: MinisterProfile[] = [
  {
    slug: "vd-satheesan",
    name: "V.D. Satheesan",
    party: "Indian National Congress",
    partyShort: "INC",
    partyColor: "#2563eb",
    role: "Chief Minister of Kerala",
    portfolios: ["Finance", "General Administration", "Ports", "Law", "Science & Technology", "Lotteries"],
    isChiefMinister: true,
    constituency: "Peravoor, Kannur",
    memberSince: "2001",
    politicalJourney: "25+ Years",
    quote: "Our government will work tirelessly to fulfil every promise made to the people of Kerala.",
    imagePath: "/assets/ministers/vd-satheesan.png",
  },
  {
    slug: "ramesh-chennithala",
    name: "Ramesh Chennithala",
    party: "Indian National Congress",
    partyShort: "INC",
    partyColor: "#2563eb",
    role: "Minister for Home Affairs & Vigilance",
    portfolios: ["Home Affairs", "Vigilance", "Coir"],
    constituency: "Haripad, Alappuzha",
    memberSince: "1987",
    politicalJourney: "39+ Years",
    quote: "Justice and security for every citizen of Kerala is our foremost commitment.",
    imagePath: "/assets/ministers/ramesh-chennithala.png",
  },
  {
    slug: "k-muraleedharan",
    name: "K. Muraleedharan",
    party: "Indian National Congress",
    partyShort: "INC",
    partyColor: "#2563eb",
    role: "Minister for Health & Devaswom",
    portfolios: ["Health & Family Welfare", "Devaswom"],
    constituency: "Thrissur",
    memberSince: "1996",
    politicalJourney: "30+ Years",
    quote: "A healthy Kerala is the foundation of a prosperous Kerala.",
    imagePath: "/assets/ministers/k-muraleedharan.png",
  },
  {
    slug: "pk-kunhalikutty",
    name: "P.K. Kunhalikutty",
    party: "Indian Union Muslim League",
    partyShort: "IUML",
    partyColor: "#059669",
    role: "Minister for Industries & Information Technology",
    portfolios: ["Industries", "Information Technology"],
    constituency: "Vengara, Malappuram",
    memberSince: "1987",
    politicalJourney: "39+ Years",
    quote: "Kerala's economic future lies in building world-class industry and technology.",
    imagePath: "/assets/ministers/pk-kunhalikutty.png",
  },
  {
    slug: "sunny-joseph",
    name: "Sunny Joseph",
    party: "Indian National Congress",
    partyShort: "INC",
    partyColor: "#2563eb",
    role: "Minister for Electricity & Environment",
    portfolios: ["Power / Electricity", "Environment", "Parliamentary Affairs"],
    constituency: "Piravom, Ernakulam",
    memberSince: "2011",
    politicalJourney: "15+ Years",
    quote: "Green energy and a clean environment are our gifts to the next generation.",
    imagePath: "/assets/ministers/sunny-joseph.png",
  },
  {
    slug: "ap-anil-kumar",
    name: "A.P. Anil Kumar",
    party: "Indian National Congress",
    partyShort: "INC",
    partyColor: "#2563eb",
    role: "Minister for Revenue",
    portfolios: ["Revenue"],
    constituency: "Devikulam, Idukki",
    memberSince: "2011",
    politicalJourney: "15+ Years",
    quote: "Fair and transparent governance is the bedrock of public trust.",
    imagePath: "/assets/ministers/ap-anil-kumar.png",
  },
  {
    slug: "n-samsudheen",
    name: "N. Samsudheen",
    party: "Indian Union Muslim League",
    partyShort: "IUML",
    partyColor: "#059669",
    role: "Minister for General Education & Minority Welfare",
    portfolios: ["General Education", "Minority Welfare", "Wakf", "Haj"],
    constituency: "Wandoor, Malappuram",
    memberSince: "2016",
    politicalJourney: "10+ Years",
    quote: "Education is the most powerful tool for building an equal society.",
    imagePath: "/assets/ministers/n-samsudheen.png",
  },
  {
    slug: "roji-m-john",
    name: "Roji M. John",
    party: "Kerala Congress (M)",
    partyShort: "KC(M)",
    partyColor: "#7c3aed",
    role: "Minister for Higher Education",
    portfolios: ["Higher Education"],
    constituency: "Piravom, Ernakulam",
    memberSince: "2016",
    politicalJourney: "10+ Years",
    quote: "World-class universities will make Kerala the knowledge capital of India.",
    imagePath: "/assets/ministers/roji-m-john.png",
  },
  {
    slug: "pc-vishnunadh",
    name: "P.C. Vishnunadh",
    party: "Indian National Congress",
    partyShort: "INC",
    partyColor: "#2563eb",
    role: "Minister for Tourism & Cultural Affairs",
    portfolios: ["Tourism", "Cultural Affairs", "Cinema"],
    constituency: "Thrithala, Palakkad",
    memberSince: "2016",
    politicalJourney: "10+ Years",
    quote: "Kerala's culture and heritage are our greatest assets — we will showcase them to the world.",
    imagePath: "/assets/ministers/pc-vishnunadh.png",
  },
  {
    slug: "ve-abdul-gafoor",
    name: "V.E. Abdul Gafoor",
    party: "Indian Union Muslim League",
    partyShort: "IUML",
    partyColor: "#059669",
    role: "Minister for Fisheries & Social Justice",
    portfolios: ["Fisheries", "Social Justice"],
    constituency: "Tanur, Malappuram",
    memberSince: "2006",
    politicalJourney: "20+ Years",
    quote: "The welfare of fishermen and marginalised communities is at the heart of our governance.",
    imagePath: "/assets/ministers/ve-abdul-gafoor.png",
  },
  {
    slug: "km-shaji",
    name: "K.M. Shaji",
    party: "Indian Union Muslim League",
    partyShort: "IUML",
    partyColor: "#059669",
    role: "Minister for Local Self-Government",
    portfolios: ["Local Self-Government", "Rural Development"],
    constituency: "Aroor, Alappuzha",
    memberSince: "2011",
    politicalJourney: "15+ Years",
    quote: "Strong local governance means a strong Kerala.",
    imagePath: "/assets/ministers/km-shaji.png",
  },
  {
    slug: "pk-basheer",
    name: "P.K. Basheer",
    party: "Indian Union Muslim League",
    partyShort: "IUML",
    partyColor: "#059669",
    role: "Minister for Public Works",
    portfolios: ["Public Works Department (PWD)"],
    constituency: "Eranad, Malappuram",
    memberSince: "2016",
    politicalJourney: "10+ Years",
    quote: "World-class roads and infrastructure will drive Kerala's development.",
    imagePath: "/assets/ministers/pk-basheer.png",
  },
  {
    slug: "bindhu-krishna",
    name: "Bindhu Krishna",
    party: "Indian National Congress",
    partyShort: "INC",
    partyColor: "#2563eb",
    role: "Minister for Labour & Women Welfare",
    portfolios: ["Labour", "Women & Child Development"],
    constituency: "Aluva, Ernakulam",
    memberSince: "2021",
    politicalJourney: "5+ Years",
    quote: "Women's empowerment is not a promise — it is a right we will deliver.",
    imagePath: "/assets/ministers/bindhu-krishna.png",
  },
  {
    slug: "m-liju",
    name: "M. Liju",
    party: "Indian National Congress",
    partyShort: "INC",
    partyColor: "#2563eb",
    role: "Minister for Cooperation & Excise",
    portfolios: ["Cooperation", "Excise"],
    constituency: "Konni, Pathanamthitta",
    memberSince: "2016",
    politicalJourney: "10+ Years",
    quote: "A cooperative Kerala is a Kerala where no one is left behind.",
    imagePath: "/assets/ministers/m-liju.png",
  },
  {
    slug: "t-siddique",
    name: "T. Siddique",
    party: "Indian National Congress",
    partyShort: "INC",
    partyColor: "#2563eb",
    role: "Minister for Agriculture",
    portfolios: ["Agriculture"],
    constituency: "Iritty, Kannur",
    memberSince: "2006",
    politicalJourney: "20+ Years",
    quote: "Kerala's farmers are the backbone of our economy — their prosperity is our priority.",
    imagePath: "/assets/ministers/t-siddique.png",
  },
  {
    slug: "mons-joseph",
    name: "Mons Joseph",
    party: "Kerala Congress (M)",
    partyShort: "KC(M)",
    partyColor: "#7c3aed",
    role: "Minister for Water Resources",
    portfolios: ["Water Resources"],
    constituency: "Poonjar, Kottayam",
    memberSince: "2011",
    politicalJourney: "15+ Years",
    quote: "Clean drinking water and protected rivers for every Keralite.",
    imagePath: "/assets/ministers/mons-joseph.png",
  },
  {
    slug: "shibu-baby-john",
    name: "Shibu Baby John",
    party: "Revolutionary Socialist Party",
    partyShort: "RSP",
    partyColor: "#dc2626",
    role: "Minister for Forests & Wildlife",
    portfolios: ["Forest", "Wildlife"],
    constituency: "Chavara, Kollam",
    memberSince: "2011",
    politicalJourney: "15+ Years",
    quote: "Our forests are our lungs — protecting them is protecting our future.",
    imagePath: "/assets/ministers/shibu-baby-john.png",
  },
  {
    slug: "anoop-jacob",
    name: "Anoop Jacob",
    party: "Kerala Congress (Jacob)",
    partyShort: "KC(J)",
    partyColor: "#0891b2",
    role: "Minister for Food & Civil Supplies",
    portfolios: ["Food & Civil Supplies"],
    constituency: "Puthuppally, Kottayam",
    memberSince: "2006",
    politicalJourney: "20+ Years",
    quote: "No family in Kerala should go to sleep hungry.",
    imagePath: "/assets/ministers/anoop-jacob.png",
  },
  {
    slug: "cp-john",
    name: "C.P. John",
    party: "Communist Marxist Party",
    partyShort: "CMP",
    partyColor: "#b45309",
    role: "Minister for Transport",
    portfolios: ["Transport", "KSRTC"],
    constituency: "Kanjirappally, Kottayam",
    memberSince: "1991",
    politicalJourney: "35+ Years",
    quote: "A modern transport network connects Kerala's dreams to reality.",
    imagePath: "/assets/ministers/cp-john.png",
  },
  {
    slug: "ka-thulasi",
    name: "K.A. Thulasi",
    party: "Indian National Congress",
    partyShort: "INC",
    partyColor: "#2563eb",
    role: "Minister for SC/ST & Backward Classes Welfare",
    portfolios: ["SC/ST Welfare", "Backward Classes Welfare"],
    constituency: "Vattiyoorkavu, Thiruvananthapuram",
    memberSince: "2011",
    politicalJourney: "15+ Years",
    quote: "True progress means lifting every community equally.",
    imagePath: "/assets/ministers/ka-thulasi.png",
  },
  {
    slug: "oj-janeesh",
    name: "O.J. Janeesh",
    party: "Indian National Congress",
    partyShort: "INC",
    partyColor: "#2563eb",
    role: "Minister for Sports & Youth Affairs",
    portfolios: ["Sports", "Youth Affairs", "Archaeology"],
    constituency: "Perambra, Kozhikode",
    memberSince: "2016",
    politicalJourney: "10+ Years",
    quote: "Kerala's youth are our greatest resource — we will invest in every one of them.",
    imagePath: "/assets/ministers/oj-janeesh.png",
  },
];

/* lookup maps */
const byName = new Map<string, MinisterProfile>(profiles.map((p) => [p.name, p]));
const bySlug = new Map<string, MinisterProfile>(profiles.map((p) => [p.slug, p]));

export function getMinisterProfile(name: string): MinisterProfile | null {
  return byName.get(name) ?? null;
}

export function getMinisterBySlug(slug: string): MinisterProfile | null {
  return bySlug.get(slug) ?? null;
}

export function getAllMinisterSlugs(): string[] {
  return profiles.map((p) => p.slug);
}

export function getAllMinisterProfiles(): MinisterProfile[] {
  return profiles;
}

export function ministerInitials(name: string): string {
  return name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
