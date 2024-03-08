# csv field in product response

A two-dimensional history array containing the product’s historical data. Access the first dimension index using the following enum/constants:

0 - AMAZON: Amazon price history
1 - NEW: Marketplace New price history
2 - USED: Marketplace Used price history
3 - SALES: Sales Rank history (not every product has a Sales Rank; variation items usually don’t have individual sales ranks)
4 - LISTPRICE: List Price history
5 - COLLECTIBLE: Collectible price history
6 - REFURBISHED: Refurbished price history
7 - NEW_FBM_SHIPPING: 3rd party (not including Amazon) New price history including shipping costs, only fulfilled by merchant (FBM)
8 - LIGHTNING_DEAL: Lightning Deal price history (special, relevant information below)
9 - WAREHOUSE: Amazon Warehouse price history
10 - NEW_FBA: Price history of the lowest 3rd party (not including Amazon/Warehouse) New offer that is fulfilled by Amazon
11 - COUNT_NEW: New offer count history (= count of marketplace merchants selling the product as new)
12 - COUNT_USED: Used offer count history
13 - COUNT_REFURBISHED: Refurbished offer count history
14 - COUNT_COLLECTIBLE: Collectible offer count history
15 - EXTRA_INFO_UPDATES: History of past updates to all offers-parameter related data: offers, isSNS, isRedirectASIN, and the csv types NEW_FBM_SHIPPING, WAREHOUSE, NEW_FBA, RATING, COUNT_REVIEWS, USED_SHIPPING, COLLECTIBLE_SHIPPING, and REFURBISHED_SHIPPING. As updates to those fields are infrequent, it is essential to know when our system updated them. The absolute value indicates the number of offers fetched at the given time. If the value is positive, it means all available offers were fetched. If negative, there were more offers than fetched.
16 - RATING: The product’s rating history (an integer from 0 to 50, e.g., 45 = 4.5 stars)
17 - COUNT_REVIEWS: The product’s rating count history
18 - BUY_BOX_SHIPPING: The New buy box price history, including shipping costs. If no offer qualified for the buy box (or if the buy box is a used offer), the price has the value -1
19 - USED_NEW_SHIPPING: “Used - Like New” price history, including shipping costs
20 - USED_VERY_GOOD_SHIPPING: “Used - Very Good” price history, including shipping costs
21 - USED_GOOD_SHIPPING: “Used - Good” price history, including shipping costs
22 - USED_ACCEPTABLE_SHIPPING: “Used - Acceptable” price history, including shipping costs
23 - COLLECTIBLE_NEW_SHIPPING: “Collectible - Like New” price history, including shipping costs
24 - COLLECTIBLE_VERY_GOOD_SHIPPING: “Collectible - Very Good” price history, including shipping costs
25 - COLLECTIBLE_GOOD_SHIPPING: “Collectible - Good” price history, including shipping costs
26 - COLLECTIBLE_ACCEPTABLE_SHIPPING: “Collectible - Acceptable” price history, including shipping costs
27 - REFURBISHED_SHIPPING: Refurbished price history, including shipping costs
28 - EBAY_NEW_SHIPPING: Price history of the lowest new price on the respective eBay locale, including shipping costs
29 - EBAY_USED_SHIPPING: Price history of the lowest used price on the respective eBay locale, including shipping costs
30 - TRADE_IN: Trade-in 60 price history (Amazon trade-in is not available for every locale)
31 - RENTAL: Rental price history (requires the use of the rental and offers parameters; Amazon Rental is only available for Amazon US)
32 - BUY_BOX_USED_SHIPPING: The Used buy box price history (any sub-condition), including shipping costs. If no offer qualified for the used buy box, the price has the value -1
33 - PRIME_EXCL: Price history of the lowest Prime exclusive New offer

([Keepa doc](https://keepa.com/#!discuss/t/product-object/116))

# amazon Availability

availabilityAmazon
Availability of the Amazon offer. Possible values:
-1: no Amazon offer exists
0: Amazon offer is in stock and shippable
1: Amazon offer is currently not in stock, but will be in the future (pre-order)
2: Amazon offer availability is “unknown”
3: Amazon offer is currently not in stock, but will be in the future (back-order)
4: Amazon offer shipping is delayed - see “availabilityAmazonDelay” for more details

# publicationDate

The item’s publication date in one of the following three formats:
YYYY or YYYYMM or YYYYMMDD (Y = year, M = month, D = day)
-1 if not available.
Examples:
1978 = the year 1978
200301 = January 2003
20150409 = April 9th, 2015

# numberOfItems

The number of items of this product. -1 if not available.
Example: 1
