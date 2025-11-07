export const expenseCategories = [
  {
    id: "utlities",
    title: "Utilities & Bills",
    color: "var(--color-utlities)",
    subcategories: [
      { id: "electricity", name: "Electricity" },
      { id: "water", name: "Water" },
      { id: "mobile", name: "Mobile" },
      { id: "internet", name: "Internet" },
      { id: "tv", name: "TV" },
      { id: "gas", name: "Gas" },
      { id: "cc", name: "Credit Card" },
      { id: "repair", name: "Service & Repairs" },
      { id: "rent", name: "Rent" },
    ],
  },
  {
    id: "travel",
    title: "Transportation",
    color: "var(--color-travel)",
    subcategories: [
      { id: "fuel", name: "Fuel" },
      { id: "parking", name: "Parking Fees" },
      { id: "taxi", name: "Taxi" },
      { id: "train", name: "Train" },
      { id: "bus", name: "Bus" },
      { id: "aeroplan", name: "Aeroplan" },
      { id: "toll", name: "Toll" },
    ],
  },
  {
    id: "food",
    title: "Food & Drinks",
    color: "var(--color-food)",
    subcategories: [
      { id: "groceries", name: "Groceries" },
      { id: "rest", name: "Restaurant" },
      { id: "cafe", name: "Cafe" },
      { id: "order", name: "Ordering Online" },
      { id: "snack", name: "Snacks" },
      { id: "drink", name: "Drinks" },
      { id: "pet", name: "Pet Food" },
    ],
  },
  {
    id: "shop",
    title: "Shopping",
    color: "var(--color-shop)",
    subcategories: [
      { id: "cloth", name: "Clothing" },
      { id: "gadget", name: "Gadgets" },
      { id: "appliance", name: "Home Appliances" },
      { id: "furni", name: "Furniture" },
      { id: "foot", name: "Footware" },
      { id: "acc", name: "Accessories" },
      { id: "tool", name: "Tools" },
      { id: "cleaning", name: "Cleaning Supplies" },
      { id: "toilet", name: "Toiletries" },
    ],
  },
  {
    id: "health",
    title: "Medical & Healthcare",
    color: "var(--color-health)",
    subcategories: [
      { id: "visit", name: "Doctor Visits" },
      { id: "meds", name: "Medicines" },
      { id: "checkup", name: "Health Checkup" },
      { id: "vaccni", name: "Vaccination" },
      { id: "operation", name: "Operation & Surgery" },
    ],
  },
  {
    id: "loan",
    title: "Loans & Debts",
    color: "var(--color-loan)",
    subcategories: [
      { id: "bank", name: "Bank" },
      { id: "mortage", name: "Mortgage" },
      { id: "debttaken", name: "Debt Taken" },
      { id: "debtgiven", name: "Debt Given" },
      { id: "emi", name: "EMI" },
      { id: "default", name: "Default" },
    ],
  },
  {
    id: "edu",
    title: "Education",
    color: "var(--color-edu)",
    subcategories: [
      { id: "school", name: "School Fees" },
      { id: "college", name: "College Fees" },
      { id: "course", name: "Course Fees" },
      { id: "coaching", name: "Tuition/Coaching Classes" },
      { id: "online", name: "Online Learning Subscriptions" },
      { id: "supplies", name: "Educational Supplies" },
    ],
  },
  {
    id: "gift",
    title: "Gifting & Charity",
    color: "var(--color-gift)",
    subcategories: [
      { id: "bday", name: "Birthday" },
      { id: "wed", name: "Wedding" },
      { id: "anna", name: "Anniversary" },
      { id: "festiv", name: "Festival" },
      { id: "special", name: "Special Occasions" },
      { id: "gen", name: "General" },
      { id: "donation", name: "Donation" },
    ],
  },
  {
    id: "ent",
    title: "Entertainment",
    color: "var(--color-ent)",
    subcategories: [
      { id: "movie", name: "Movies" },
      { id: "games", name: "Games" },
      { id: "event", name: "Events" },
      { id: "hotel", name: "Hotel Stay" },
      { id: "sub", name: "Subscriptions" },
      { id: "park", name: "Amusement Parks/Zoos" },
      { id: "hobbie", name: "Hobbies" },
    ],
  },
  {
    id: "personal",
    title: "Personal Care",
    color: "var(--color-personal)",
    subcategories: [
      { id: "salon", name: "Salon" },
      { id: "gym", name: "GYM/Fitness" },
      { id: "cos", name: "Cosmetics" },
      { id: "eqp", name: "Fitness Equipment" },
      { id: "yoga", name: "Yoga" },
      { id: "wellness", name: "Wellness" },
    ],
  },
  {
    id: "tax",
    title: "Taxation",
    color: "var(--color-tax)",
    subcategories: [{ id: "tax", name: "Tax" }],
  },
  {
    id: "insurance",
    title: "Insurance",
    color: "var(--color-insurance)",
    subcategories: [{ id: "insurance", name: "Insurance" }],
  },
  {
    id: "misc",
    title: "Miscellaneous Expenses",
    color: "var(--color-misc)",
    subcategories: [{ id: "misc", name: "Miscellaneous" }],
  },
];

export const incomeCategories = [
  {
    id: "income",
    title: "Income",
    color: "var(--color-inc-a1)",
    subcategories: [
      { id: "salary", name: "Salary" },
      { id: "salary_bonus", name: "Salary Bonus" },
      { id: "part_time", name: "Part-Time Job" },
      { id: "freelance", name: "Freelance Work" },
      { id: "reselling", name: "Reselling" },
      { id: "rental", name: "Rental Income" },
      { id: "service", name: "Service Provided" },
      { id: "loan_repaid", name: "Loan Repaid" },
      { id: "prize", name: "Prize Money" },
      { id: "loan_taken", name: "Loan Taken" },
    ],
  },
];

export const getPrimeCategories = (cats = []) =>
  Object.values(cats).map((item) => item.title);

export const getSubCategories = (cats = []) =>
  Object.values(cats).flatMap(
    (item) => item.subcategories?.map((sub) => sub.name) || [],
  );

export const getSubOfPrime = (prime, isExpense) => {
  if (prime !== null) {
    const list = isExpense ? expenseCategories : incomeCategories;
    const category = list.find((item) => item.title === prime);
    return category ? category.subcategories.map((item) => item.name) : [];
  } else return [];
};

export const getSubOfPrime_Exp = (prime) => {
  const category = expenseCategories.find((item) => item.title === prime);
  return category ? category.subcategories.map((item) => item.name) : [];
};
export const getSubOfPrime_Inc = (prime = "Income") => {
  const category = incomeCategories.find((item) => item.title === prime);
  return category ? category.subcategories.map((item) => item.name) : [];
};

const allCats = [...expenseCategories, ...incomeCategories];
export const getPrimeColor = (prime) =>
  allCats?.find((e) => e.title === prime)?.color ?? "var(--color-exp-aa)";
