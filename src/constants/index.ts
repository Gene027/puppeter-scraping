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

const frozenFoodsQuery: Query[] = [
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

const fruitsAndVegetablesQuery: Query[] = [
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
    url: "https://www.walmart.ca/en/browse/grocery/dairy-eggs/dairy-milk/10019_6000194327369_6000194327399?icid=cp_l1_page_grocery_lhn_milk_58846_W7E3NNFBVV",
    category: "Dairy",
    subCategory: "Milk",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/dairy-eggs/cheese/10019_6000194327369_6000194327377?icid=cp_l1_page_grocery_lhn_cheese_58847_K2C2FP9TR5",
    category: "Dairy",
    subCategory: "Cheese",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/dairy-eggs/eggs-egg-substitutes/10019_6000194327369_6000194327389?icid=cp_l1_page_grocery_lhn_eggs_58851_XS2AI93TDK",
    category: "Dairy",
    subCategory: "Eggs",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/dairy-eggs/yogurt/10019_6000194327369_6000194327390?icid=cp_l1_page_grocery_lhn_yogurt_58848_KMN8NUF4Y0",
    category: "Dairy",
    subCategory: "Yogurt",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/dairy-eggs/butter-margarine/10019_6000194327369_6000194327387?icid=cp_l1_page_grocery_lhn_butter_58850_FOSGKIVHQC",
    category: "Dairy",
    subCategory: "Butter & Margarine",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/dairy-eggs/cream-creamers/10019_6000194327369_6000194349396?icid=cp_l1_page_grocery_lhn_cream_58849_9T65N4SM7D",
    category: "Dairy",
    subCategory: "Cream",
    pages: 1,
  },
];

const meatAndSeafoodQuery: Query[] = [
  {
    url: "https://www.walmart.ca/en/browse/grocery/meat-seafood-alternatives/fresh-beef/10019_6000194327357_6000194327394?icid=cp_l1_page_grocery_lhn_fresh_beef_58854_9JSI1ZFLLJ",
    category: "Meat",
    subCategory: "Fresh Beef",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/meat-seafood-alternatives/fresh-chicken-turkey/10019_6000194327357_6000194327409?icid=cp_l1_page_grocery_lhn_fresh_chicken_58853_F34CQ8YNJH",
    category: "Meat",
    subCategory: "Chicken & Turkey",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/meat-seafood-alternatives/fresh-pork/10019_6000194327357_6000194327395?icid=cp_l1_page_grocery_lhn_fresh_pork_58855_JDF0XS3ZWF",
    category: "Meat",
    subCategory: "Pork",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/meat-seafood-alternatives/fresh-fish-seafood/10019_6000194327357_6000194327410?icid=cp_l1_page_grocery_lhn_fresh_fish_58856_23GX5M7RQE",
    category: "Meat",
    subCategory: "Fresh Seafood & Fish",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/meat-seafood-alternatives/fresh-sausages/10019_6000194327357_6000204985034?icid=cp_l1_page_grocery_lhn_fresh_sausages_58857_7XZT7EJSKA",
    category: "Meat",
    subCategory: "Fresh Sausages",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/meat-seafood-alternatives/hot-dogs/10019_6000194327357_6000200207254?icid=cp_l1_page_grocery_lhn_hot_dogs_58858_R8H32R4HO8",
    category: "Meat",
    subCategory: "Hot Dogs",
    pages: 1,
  },
];

export const pantryQuery: Query[] = [
  {
    url: "https://www.walmart.ca/en/browse/grocery/pantry-food/dry-pasta-noodles/10019_6000194326346_6000194329528?icid=cp_l1_page_grocery_dry_pasta_noodles_lhn_76445_7X6387D1NU",
    category: "Pantry",
    subCategory: "Dry pasta & noodles",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/pantry-food/rice-grains/10019_6000194326346_6000194329559?icid=cp_l1_page_grocery_rice_grains_lhn_76446_EH27I7NUIL",
    category: "Pantry",
    subCategory: "Rice & grains",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/pantry-food/dried-beans-lentils-peas/10019_6000194326346_6000194329558?icid=cp_l1_page_grocery_dried_beans_lentils_lhn_76447_3TMKJC24FQ",
    category: "Pantry",
    subCategory: "Dried beans, lentils & peas",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/pantry-food/cereal-breakfast/10019_6000194326346_6000194328506?icid=cp_l1_page_grocery_lhn_cereal_breakfast_58861_FQVFXJ2FIB",
    category: "Pantry",
    subCategory: "Cereal & breakfast",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/pantry-food/canned-food/10019_6000194326346_6000194328515?icid=cp_l1_page_grocery_lhn_canned_food_58862_BJJYSYIJHI",
    category: "Pantry",
    subCategory: "Canned food",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/pantry-food/instants-meals-sides/10019_6000194326346_6000202444928?icid=cp_l1_page_grocery_lhn_easy_meals_58864_UBML71W591",
    category: "Pantry",
    subCategory: "Easy meals & Instant sides",
    pages: 1,
  },
  {
    url: "https://www.walmart.ca/en/browse/grocery/pantry-food/sauces-spices-marinades/10019_6000194326346_6000194328520?icid=cp_l1_page_grocery_lhn_sauces_spices_58865_WFMZJ79E5A",
    category: "Pantry",
    subCategory: "Sauces, spices & marinades",
    pages: 1,
  },
];

export const breadAndBakeryQuery: Query[] = [
  {
    url: "https://www.walmart.ca/en/browse/grocery/bread-bakery/10019_6000194327359?icid=cp_l2_page_grocery_shop_all_23096_PWP4HZCCH6",
    category: "Bread & Bakery",
    subCategory: "Bread & Bakery",
    pages: 12,
  },
];
// export const breadAndBakeryQuery = [];
// export const snacksAndCandyQuery = [];
// export const drinksQuery = [];
// export const cheeseQuery = [];
