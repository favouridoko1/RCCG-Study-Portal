import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import contractJson from "./contract.json" with { type: "json" };

const db = postgres({
  contractJson,
  url: process.env.DATABASE_URL,
});

const materials = [
  {
    title: "Sunday School Guide 2025",
    subtitle: "Adult Edition",
    price: "€12.99",
    tag: "NEW",
    type: "book",
    action: "Add to Cart",
    href: null,
  },
  {
    title: "Workers in Training Manual",
    subtitle: "Rev 2.4",
    price: null,
    tag: null,
    type: "training",
    action: "Read Now",
    href: "/reader/workers-in-training",
  },
  {
    title: "Ministerial Ethics Guide",
    subtitle: "Leadership Series",
    price: "€15.00",
    tag: null,
    type: "ethics",
    action: "Add to Cart",
    href: null,
  },
  {
    title: "House Fellowship Manual",
    subtitle: "2024/2025",
    price: "€8.50",
    tag: null,
    type: "manual",
    action: "Add to Cart",
    href: null,
  },
  {
    title: "Foundation for Christian Living",
    subtitle: "New Believers Edition",
    price: "€10.99",
    tag: null,
    type: "book",
    action: "Add to Cart",
    href: null,
  },
  {
    title: "RCCG Workers' Manual",
    subtitle: "Workers in the Vineyard",
    price: null,
    tag: null,
    type: "training",
    action: "Read Now",
    href: "/reader/workers-manual",
  },
  {
    title: "Leadership Development Guide",
    subtitle: "Ministers & Leaders",
    price: "€14.50",
    tag: null,
    type: "ethics",
    action: "Add to Cart",
    href: null,
  },
  {
    title: "House Fellowship Leaders Guide",
    subtitle: "Leadership Edition",
    price: null,
    tag: null,
    type: "manual",
    action: "Read Now",
    href: "/reader/house-fellowship-leaders",
  },
  {
    title: "Daily Devotional 2025",
    subtitle: "Open Heaven Edition",
    price: "€9.99",
    tag: "POPULAR",
    type: "book",
    action: "Add to Cart",
    href: null,
  },
  {
    title: "Evangelism & Soul Winning",
    subtitle: "Workers Training Series",
    price: null,
    tag: null,
    type: "training",
    action: "Read Now",
    href: "/reader/evangelism-soul-winning",
  },
  {
    title: "Christian Family Handbook",
    subtitle: "Marriage & Family Series",
    price: "€11.50",
    tag: null,
    type: "manual",
    action: "Add to Cart",
    href: null,
  },
  {
    title: "Ministerial Conduct & Discipline",
    subtitle: "Leadership Series",
    price: "€13.99",
    tag: null,
    type: "ethics",
    action: "Add to Cart",
    href: null,
  },
];

for (const material of materials) {
  await db.orm.public.Material.create(material);
}

console.log(`Inserted ${materials.length} materials.`);
