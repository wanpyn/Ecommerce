export const color = [
  "White",
  "Black",
  "Red",
  "Marun",
  "Being",
  "Blue",
  "Brown",
  "Green",
  "Purple",
  "Pink",
  "Yellow",
];

const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];

export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "black", label: "Black" },
      { value: "white", label: "White" },
      { value: "blue", label: "Blue" },
      { value: "beige", label: "Beige" },
      { value: "brown", label: "Brown" },
      { value: "green", label: "Green" },
      { value: "purple", label: "Purple" },
      { value: "yellow", label: "Yellow" },
      { value: "pink", label: "Pink" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "XS", label: "XS" },
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "12l", label: "L" },
      { value: "XL", label: "XL" },
      { value: "XXL", label: "XXL" },
      { value: "XXXL", label: "XXXL" },
    ],
  },
];

export const singleFilters = [
  {
    id: "price",
    name: "Price",
    options: [
      { value: "99-299", label: "₹99 to ₹299" },
      { value: "299-499", label: "₹299 to ₹499" },
      { value: "499=999", label: "₹499 to ₹999" },
      { value: "999-1999", label: "₹999 to ₹1999" },
      { value: "1999-49999", label: "₹1999 to ₹49999" },
    ],
  },
  {
    id: "discount",
    name: "Discount Range",
    options: [
      { value: "10", label: "10% and Above" },
      { value: "20", label: "20% and Above" },
      { value: "30", label: "30% and Above" },
      { value: "40", label: "40% and Above" },
      { value: "50", label: "50% and Above" },
      { value: "60", label: "60% and Above" },
      { value: "70", label: "70% and Above" },
      { value: "80", label: "80% and Above" },
      { value: "90", label: "90% and Above" },
    ],
  },
  {
    id: "stock",
    name: "Availability",
    options: [
      { value: "in_stock", label: "In Stock" },
      { value: "out_of_stock", label: "Out of Stock" },
    ],
  },
];

export const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
