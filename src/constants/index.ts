export interface Query {
  url: string;
  category: string;
  subCategory: string;
  pages: number;
}

export const walmartHtmlPages = [
  {
    productUrl: "public/test.html",
    resource: "Walmart Html",
    category: "Fruits",
    subCategory: "Fresh fruits",
  },
];

export const frozenFoodsQuery: Query[] = [
  {
    url: "https://www.walmart.ca/en/browse/grocery/frozen-food/frozen-meat-seafood-alternatives/10019_6000194326337_6000194327396?icid=landing%2Fcp_page_grocery_frozen_meat_seafood_and_alternatives_21629_5LMIE96WVC",
    category: "Frozen Foods",
    subCategory: "Frozen meat, seafood & alternatives",
    pages: 5,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/frozen-food/frozen-meals-sides/10019_6000194326337_6000194327413?icid=landing%2Fcp_page_grocery_frozen_meals_and_sides_21630_LCM513U4KZ",
    category: "Frozen Foods",
    subCategory: "Frozen meals & side dishes",
    pages: 8,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/frozen-food/frozen-pizza/10019_6000194326337_6000194349404?icid=landing%2Fcp_page_grocery_frozen_pizza_21631_MU1Z3OIBQF",
    category: "Frozen Foods",
    subCategory: "Frozen pizza",
    pages: 3,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/frozen-food/ice-cream-treats/10019_6000194326337_6000194349402?icid=landing/cp_page_grocery_ice_cream_shop_all_pill_21644_1Q85R3J7DC",
    category: "Frozen Foods",
    subCategory: "Ice Cream & treats",
    pages: 7,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/frozen-food/frozen-appetizers-snacks/10019_6000194326337_6000202265715?icid=landing/cp_page_grocery_frozen_appetizers_shop_all_pill_21645_3HVF5EBNCC",
    category: "Frozen Foods",
    subCategory: "Frozen appetizers & snacks",
    pages: 2,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/frozen-food/frozen-vegetables/10019_6000194326337_6000194327403?icid=landing/cp_page_grocery_frozen_vegetables_shop_all_pill_21646_Q7TFOUX67E",
    category: "Frozen Foods",
    subCategory: "Frozen vegetables",
    pages: 2,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/frozen-food/frozen-breakfast/10019_6000194326337_6000194349403?icid=landing/cp_page_grocery_frozen_breakfast_shop_all_pill_21647_8T3CU5328R",
    category: "Frozen Foods",
    subCategory: "Frozen breakfast",
    pages: 2,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/frozen-food/frozen-fruit/10019_6000194326337_6000194327401?icid=landing/cp_page_grocery_frozen_fruit_21637_S0NMAHBAXA",
    category: "Frozen Foods",
    subCategory: "Frozen fruit",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/frozen-food/frozen-pizza/10019_6000194326337_6000194349404?icid=landing%2Fcp_page_grocery_frozen_pizza_21631_MU1Z3OIBQF",
    category: "Frozen Foods",
    subCategory: "Frozen drinks & ice",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/frozen-food/frozen-meals-sides/frozen-fries-potatoes/10019_6000194326337_6000194327413_6000202265741?icid=landing%2Fcp_page_grocery_frozen_fries_and_potatoes_21633_ID4AH2M3TS",
    category: "Frozen Foods",
    subCategory: "Frozen fries & potatoes",
    pages: 2,
  },
];

export const fruitsAndVegetablesQuery: Query[] = [
  {
    url: "https://www.walmart.ca/en/browse/grocery/fruits-vegetables/fresh-fruits/10019_6000194327370_6000194327411?icid=cp_l2_page_grocery_fresh_fruits_shop_all_22968_7UGSWL56UX",
    category: "Fruits",
    subCategory: "Fresh fruits",
    pages: 2,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/fruits-vegetables/fresh-vegetables/10019_6000194327370_6000194327412?icid=cp_l2_page_grocery_fresh_vegetables_shop_all_22969_MTSF26T9P4",
    category: "Vegetables",
    subCategory: "Fresh vegetables",
    pages: 5,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/fruits-vegetables/fresh-salads-dressings-toppings/10019_6000194327370_6000205319590?icid=cp_l2_page_grocery_fresh_salads_dressings_and_toppings_shop_all_22970_RAYCQ9SE0S",
    category: "Vegetables",
    subCategory: "Fresh salad ingredients",
    pages: 2,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/fruits-vegetables/pre-cut-fruits-vegetables/10019_6000194327370_6000205319266?icid=cp_l2_page_grocery_pre_cut_fruits_and_vegetables_shop_all_22971_7C2Y9TV3KL",
    category: "Vegetables",
    subCategory: "Fresh-cut fruits & vegetables",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/drinks/kombucha-wellness-drinks/10019_6000194326336_6000205760085?icid=cp_l2_page_grocery_fresh_juice_and_kombucha_shop_all_22972_6I0EGBGNEP",
    category: "Vegetables",
    subCategory: "Kombucha tea & wellness drinks",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/meat-seafood-alternatives/plant-based-proteins-tofu/10019_6000194327357_6000195505355?icid=cp_l2_page_grocery_plant_based_proteins_and_tofu_shop_all_22973_WLL45N3WVN",
    category: "Vegetables",
    subCategory: "Plant-based proteins & meat alternatives",
    pages: 2,
  },
];

const diaryAndEggsQuery: Query[] = [
  {
    url: "https://www.walmart.ca/en/grocery/dairy-eggs/dairy/N-3854",
    category: "Dairy",
    subCategory: "Milk",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/grocery/dairy-eggs/dairy/N-3854",
    category: "Dairy",
    subCategory: "Cheese",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/grocery/dairy-eggs/eggs/N-3855",
    category: "Dairy",
    subCategory: "Eggs",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/grocery/dairy-eggs/yogurt/N-3856",
    category: "Dairy",
    subCategory: "Yogurt",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/grocery/dairy-eggs/butter-margarine/N-3857",
    category: "Dairy",
    subCategory: "Butter & Margarine",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/grocery/dairy-eggs/cream/N-3858",
    category: "Dairy",
    subCategory: "Cream",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/grocery/dairy-eggs/cheese/N-3859",
    category: "Dairy",
    subCategory: "Cheese",
    pages: 1,
  },
];

const meatAndSeafoodQuery: Query[] = [
  {
    url: "https://www.walmart.ca/en/grocery/meat-seafood/beef/N-3860",
    category: "Meat",
    subCategory: "Beef",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/grocery/meat-seafood/chicken/N-3861",
    category: "Meat",
    subCategory: "Chicken",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/grocery/meat-seafood/pork/N-3862",
    category: "Meat",
    subCategory: "Pork",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/grocery/meat-seafood/seafood/N-3863",
    category: "Meat",
    subCategory: "Seafood",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/grocery/meat-seafood/vegetarian-meat-alternatives/N-3864",
    category: "Meat",
    subCategory: "Vegetarian meat alternatives",
    pages: 1,
  },
];

const pantryQuery: Query[] = [];

// export const breadAndBakeryQuery = [];
// export const snacksAndCandyQuery = [];
// export const drinksQuery = [];
// export const cheeseQuery = [];
