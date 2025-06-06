import { getPayload } from "payload";
import config from "./payload.config";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Pain Relief",
    color: "#FFB347",
    slug: "pain-relief",
    subcategories: [
      {
        name: "Neuropathic Pain & Migraine",
        slug: "neuropathic-pain-migraine",
      },
      {
        name: "General Pain & Fever Relief",
        slug: "general-pain-fever-relief",
      },
      {
        name: "Anti-inflammatory Pain Relief",
        slug: "anti-inflammatory-pain-relief",
      },
      {
        name: "Muscle Relaxants",
        slug: "muscle-relaxants",
      },
    ],
  },
  {
    name: "Cough & Cold",
    color: "#7EC8E3",
    slug: "cough-cold",
    subcategories: [
      { name: "Expectorants", slug: "expectorants" },
      { name: "Mucolytics", slug: "mucolytics" },
      { name: "Antitussives", slug: "antitussives" },
    ],
  },
  {
    name: "Allergy & Nasal Congestion",
    color: "#D8B5FF",
    slug: "allergy-nasal-congestion",
  },
  {
    name: "Motion Sickness & Nausea",
    color: "#FFE066",
    slug: "motion-sickness-nausea",
  },
  {
    name: "Anti-infective Agents",
    color: "#96E6B3",
    slug: "anti-infective-agents",
    subcategories: [
      { name: "Antibiotics", slug: "antibiotics" },
      { name: "Antifungals", slug: "antifungals" },
      { name: "Antivirals", slug: "antivirals" },
      { name: "Anthelmintics", slug: "anthelmintics" },
    ],
  },
  {
    name: "Gastrointestinal",
    color: "#FF9AA2",
    slug: "gastrointestinal",
    subcategories: [
      { name: "Laxatives", slug: "laxatives" },
      { name: "Antacids & Acid Reducers", slug: "antacids-acid-reducers" },
    ],
  },
  {
    name: "Topical & External Use",
    color: "#B5B9FF",
    slug: "topical-external-use",
    subcategories: [
      { name: "Eye & Ear Drops", slug: "eye-ear-drops" },
      { name: "Dermatologic Creams & Ointments", slug: "dermatologic-creams-ointments" },
    ],
  },
  {
    name: "Chronic Disease",
    color: "#FFCAB0",
    slug: "chronic-disease",
    subcategories: [
      { name: "Antidiabetics", slug: "antidiabetics" },
      { name: "Antihyperlipidemics", slug: "antihyperlipidemics" },
      { name: "Antihypertensives", slug: "antihypertensives" },
      { name: "Psychotropic Drugs", slug: "psychotropic-drugs" },
    ],
  },
  {
    name: "Others",
    color: "#FFD700",
    slug: "others",
    subcategories: [
      { name: "Vitamins & Minerals", slug: "vitamins-minerals" },
      { name: "Contraceptives", slug: "contraceptives" },
      { name: "Herbal Medicines", slug: "herbal-medicines" },
      { name: "Medical Devices", slug: "medical-devices" },
    ],
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "Admin",
      slug: "admin",
      stripeAccountId: "admin",
    },
  });

  // Create admin user
  await payload.create({
    collection: "users",
    data: {
      email: "admin@demo.com",
      password: "demo",
      roles: ["super-admin"],
      username: "admin",
      tenants: [
        {
          tenant: adminTenant.id,
        },
      ],
    },
  });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });

    for (const subCategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subCategory.name,
          slug: subCategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
};

try {
  await seed();
  console.log("Seed completed successfully");
  process.exit(0);
} catch (error) {
  console.error("Error seeding data:", error);
  process.exit(1);
}
