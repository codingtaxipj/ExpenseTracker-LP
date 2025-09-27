export const countries = [
  {
    name: "Afghanistan",
    currency: "Afghan Afghani",
    currencyCode: "AFN",
  },
  {
    name: "Albania",
    currency: "Albanian Lek",
    currencyCode: "ALL",
  },
  {
    name: "Algeria",
    currency: "Algerian Dinar",
    currencyCode: "DZD",
  },
  {
    name: "Andorra",
    currency: "Euro",
    currencyCode: "EUR",
  },
  {
    name: "Angola",
    currency: "Angolan Kwanza",
    currencyCode: "AOA",
  },
  {
    name: "Argentina",
    currency: "Argentine Peso",
    currencyCode: "ARS",
  },
  {
    name: "Armenia",
    currency: "Armenian Dram",
    currencyCode: "AMD",
  },
  {
    name: "Australia",
    currency: "Australian Dollar",
    currencyCode: "AUD",
  },
  {
    name: "Austria",
    currency: "Euro",
    currencyCode: "EUR",
  },
  {
    name: "Azerbaijan",
    currency: "Azerbaijani Manat",
    currencyCode: "AZN",
  },
  {
    name: "Bahrain",
    currency: "Bahraini Dinar",
    currencyCode: "BHD",
  },
  {
    name: "Bangladesh",
    currency: "Bangladeshi Taka",
    currencyCode: "BDT",
  },
  {
    name: "Bhutan",
    currency: "Bhutanese Ngultrum",
    currencyCode: "BTN",
  },
  {
    name: "Brazil",
    currency: "Brazilian Real",
    currencyCode: "BRL",
  },
  {
    name: "Cambodia",
    currency: "Cambodian Riel",
    currencyCode: "KHR",
  },
  {
    name: "Canada",
    currency: "Canadian Dollar",
    currencyCode: "CAD",
  },
  {
    name: "China",
    currency: "Chinese Yuan",
    currencyCode: "CNY",
  },
  {
    name: "France",
    currency: "Euro",
    currencyCode: "EUR",
  },
  {
    name: "Germany",
    currency: "Euro",
    currencyCode: "EUR",
  },
  {
    name: "India",
    currency: "Indian Rupee",
    currencyCode: "INR",
  },
  {
    name: "Indonesia",
    currency: "Indonesian Rupiah",
    currencyCode: "IDR",
  },
  {
    name: "Iran",
    currency: "Iranian Rial",
    currencyCode: "IRR",
  },
  {
    name: "Iraq",
    currency: "Iraqi Dinar",
    currencyCode: "IQD",
  },
  {
    name: "Israel",
    currency: "Israeli New Shekel",
    currencyCode: "ILS",
  },
  {
    name: "Italy",
    currency: "Euro",
    currencyCode: "EUR",
  },
  {
    name: "Japan",
    currency: "Japanese Yen",
    currencyCode: "JPY",
  },
  {
    name: "South Korea",
    currency: "South Korean Won",
    currencyCode: "KRW",
  },
  {
    name: "Laos",
    currency: "Lao Kip",
    currencyCode: "LAK",
  },
  {
    name: "Malaysia",
    currency: "Malaysian Ringgit",
    currencyCode: "MYR",
  },
  {
    name: "Maldives",
    currency: "Maldivian Rufiyaa",
    currencyCode: "MVR",
  },
  {
    name: "Myanmar",
    currency: "Burmese Kyat",
    currencyCode: "MMK",
  },
  {
    name: "Nepal",
    currency: "Nepalese Rupee",
    currencyCode: "NPR",
  },
  {
    name: "Philippines",
    currency: "Philippine Peso",
    currencyCode: "PHP",
  },
  {
    name: "Qatar",
    currency: "Qatari Riyal",
    currencyCode: "QAR",
  },
  {
    name: "Russia",
    currency: "Russian Ruble",
    currencyCode: "RUB",
  },
  {
    name: "Saudi Arabia",
    currency: "Saudi Riyal",
    currencyCode: "SAR",
  },
  {
    name: "Singapore",
    currency: "Singapore Dollar",
    currencyCode: "SGD",
  },
  {
    name: "Sri Lanka",
    currency: "Sri Lankan Rupee",
    currencyCode: "LKR",
  },
  {
    name: "Thailand",
    currency: "Thai Baht",
    currencyCode: "THB",
  },
  {
    name: "Turkey",
    currency: "Turkish Lira",
    currencyCode: "TRY",
  },
  {
    name: "United Arab Emirates",
    currency: "UAE Dirham",
    currencyCode: "AED",
  },
  {
    name: "United Kingdom",
    currency: "Pound Sterling",
    currencyCode: "GBP",
  },
  {
    name: "United States",
    currency: "US Dollar",
    currencyCode: "USD",
  },
  {
    name: "Vietnam",
    currency: "Vietnamese Dong",
    currencyCode: "VND",
  },
  {
    name: "Zimbabwe",
    currency: "Zimbabwean Dollar",
    currencyCode: "ZWL",
  },
];

export const getCountryNames = () => countries.map((c) => c.name);
export const getCodeOf = (cc) => countries.find((c) => c.name === cc);
