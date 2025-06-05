export const expenseCategories = [
  {
    id: "utlities",
    title: "Utilities & Bills",
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
    subcategories: [{ id: "tax", name: "Tax" }],
  },
  {
    id: "insurance",
    title: "Insurance",
    subcategories: [{ id: "insurance", name: "Insurance" }],
  },
  {
    id: "misc",
    title: "Miscellaneous Expenses",
    subcategories: [{ id: "misc", name: "Miscellaneous" }],
  },
];

export const incomeCategories = [
  {
    id: "income",
    title: "Income Sources",
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

export const getPrimeCategoriesExpense = () =>
  expenseCategories.map((item) => item.title);
export const getSubCategoriesExpense = () =>
  expenseCategories.flatMap((item) =>
    item.subcategories.map((sub) => sub.name),
  );

export const getPrimeCategoriesIncome = () =>
  incomeCategories.map((item) => item.title);
export const getSubCategoriesIncome = () =>
  incomeCategories.flatMap((item) => item.subcategories.map((sub) => sub.name));

export const geSubOfPrime = (prime, isExpense) => {
  const list = isExpense ? expenseCategories : incomeCategories;
  const category = list.find((item) => item.title === prime);
  return category ? category.subcategories.map((item) => item.name) : [];
};
