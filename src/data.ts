/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Order } from "./types";

export const CATEGORIES = [
  {
    id: "almonds",
    name: "Almonds",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyvHoGvJ7i3ScRF0paQKOgqPfP3YrXfJK32Uhsuw2_FJO9HUKL3nGHlp2TXnC4GksecBr_TTMn1oD9eMyHKtJLUtEbd2YSuWPTtr-pqAf2--0-I4RblUDA0euPSteAfnDcHGDzwhgwR6b9xle5Bjiti1uvEQ-t_eLMYCVTC4Dwi_0rYIXMeMROriCZMzA6n15WZcs_gocL9Mz80spGBATi2mXSS6uNP1y2Xk3cdfKx61XdIdmWBtU1vtJdBAHTzBWFdkebkiClEAZ2"
  },
  {
    id: "cashews",
    name: "Cashews",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeSFrJzR6Bnmao3m7Ir4SflHVDZnvXWRAxS6rIN5Yjdjfxryd_ctRXaIetyG8NqO_hC9OjonGaUlKN6e3zY45A_bgh6jFd7FAnFNVrrGhisDqTRQ7NxMs2i5QwK_pE6NTv_QBuuY8_iNgP5RIS6L-dan33EA0_EyycJUC-EX1Q0NrQNHqrR1JOUH38Fce7vGo4r6oLxzlbAlp5XyY2hl1R4xRN91PvfuZOt80IbvTrQ40xsVtwnq_WgKAG4Q93lREHiGC7tg2ql2Zz"
  },
  {
    id: "walnuts",
    name: "Walnuts",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2LNeRRsClzfyCQ-asdszWpkb-ZUOFps9eJFujsXD2EYyhMa-At6hhmjlbruycV6ECJgzPXl5c7ldLR4i6WC1b463wAU6uACO9a8JaXVvRDzM0mc1L87hMHDygEpCCkp6-j06xxDc5ene2LAum9fWWkWFQd90Tq7AO7_Le148UPV0GLxzILn1Ap4cqJiIAtkpnwkqr6UFt_SykfS7Aq1nzI2DbUGcHoWYQTMe6DPULbQ0LTtXPj38GtI-qmLq5r7c918b-17O61ac8"
  },
  {
    id: "pistachios",
    name: "Pistachios",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-upAO_4R_v50EsnrD5lM8n0tRW9GAqOBJDQKB-lXkXj6JlrowPh6rqIPfjC19V5MxrTZ-sT-zKgqSSoH2j-5lf55Q4w-448nCaUUw42fEqQbaoZ-yIy1gMMreQrXyGBdZ3gl6MeoRwQv7r0hCILSN6sXBdM-yshQscdc0zeqBzGZGt5GkLJEdEKJwxMvcb-W2NT_9PoyNSwJ73QCfrIgyKHqdQdttUz8vb0R5cUtjrcK2ofp4fgJ0GLJLPfCcuu8V9kRYy_QkQudQ"
  },
  {
    id: "spices",
    name: "Spices",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_pRIMeeudwcg_PA3kTrojl45ZZT_md2MDlecXVFWSKrdj7PjnPfbUmm4PIDgmN5SYZQLd2rq1pCYY0KwHqvpUQp_dL_pAso6NBD-AP8Ullj7zqLZr6BQyp0hDWAamBu4TncLOG9wSv5fkxE7K8fKHRzUJAMDctckYsE46K-zb8CMoQOiW2u_5bE1FJFzHE4eVKHzaivbqYeCgClv-yqY5kKoTAltZK29V3DfDQPKdfTy9xuNkZNleip-0ZeV0BTKCpiZF19YAPQi5"
  },
  {
    id: "combos",
    name: "Combos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDI1TceXqWHKPbFTNt-6XrDAXdNdjEoZE-QDTapL0UWJOsILz0FBD7TxQ77JpC1ZR16k_1ffS8_yb1-PJKmzzYqM8FXhkfnXBs8s0NjAN7Fi0PG8AwmDB7ETddhsnwXZcql9cP8OThOCh0XdEGYJRcD3bVQidWaddmuTreNqpzfFInCRgGDueTe6n80vbHxCSVT-jbghBrq-8ZmelUPn4mqybUCrJ_uL1kJjRJmny9VJUAC5pdJ4clrOGCv9jVQg4sPYk5d2tizwUiS"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "almonds-1",
    name: "Jumbo Roasted Almonds",
    price: 849,
    originalPrice: 1099,
    description: "Hand-picked from the sun-drenched orchards of California, our premium almonds are roasted to perfection without any added oils. Each nut is selected for its size, crunch, and naturally sweet profile. Perfect for healthy snacking or elevating your culinary creations.",
    category: "Almonds",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9psC-RopflqXjIk87O3dM7VcGjMtNRWS4ld8b-Bqg_o3hleSfxDdsdY5SbwCUyHVe4DV3dk-4frWk4x_NEtBOOkA9FJnHx0d3Uh_WyiZwnZ2PgZX3xduKHgUodMGad7RHk49UM0KLLCIYa2Lshum1LG3SAeplPWcC08dsMAQyR3-Hs-RjSAlbSHN9vlLPb23GqwNQ-daY--n-R5pPaloVUjSejVKiZKUWqxmlRFPwUqI_fsGF8duWzufh4gSlswpBecPBt1aMAFXx",
    rating: 4.8,
    reviewsCount: "2.4k",
    organic: true,
    weightOptions: ["250g", "500g", "1kg"],
    specs: [
      { label: "Nutritional Info", value: "Per 100g serving: Energy 579kcal, Protein 21g, Total Fat 50g, Dietary Fiber 12.5g. Rich in Vitamin E, Magnesium, and Riboflavin." },
      { label: "Origin", value: "Sourced from sustainable orchards in Central Valley, California. Our growers prioritize water conservation and bee-friendly farming practices." },
      { label: "Sustainable Packaging", value: "Delivered in compostable kraft paper pouches with a high-barrier cellulose lining to maintain freshness while respecting the Earth." }
    ]
  },
  {
    id: "walnuts-1",
    name: "Premium Chilean Walnuts",
    price: 1535,
    originalPrice: 1826,
    description: "Premium light-toned walnut halves from Chile's fertile valleys, shelled with exceptional care. Known for their exceptionally mild, buttery flavor and high Omega-3 fatty acid content.",
    category: "Walnuts",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_pRIMeeudwcg_PA3kTrojl45ZZT_md2MDlecXVFWSKrdj7PjnPfbUmm4PIDgmN5SYZQLd2rq1pCYY0KwHqvpUQp_dL_pAso6NBD-AP8Ullj7zqLZr6BQyp0hDWAamBu4TncLOG9wSv5fkxE7K8fKHRzUJAMDctckYsE46K-zb8CMoQOiW2u_5bE1FJFzHE4eVKHzaivbqYeCgClv-yqY5kKoTAltZK29V3DfDQPKdfTy9xuNkZNleip-0ZeV0BTKCpiZF19YAPQi5",
    rating: 4.7,
    reviewsCount: "1.2k",
    weightOptions: ["250g", "500g", "1kg"]
  },
  {
    id: "dates-1",
    name: "Medjool Dates Royal",
    price: 1299,
    originalPrice: 1599,
    description: "The King of Dates. Large, plump, and deeply sweet, our Royal Medjool dates carry a natural caramel flavor and a melt-in-the-mouth texture. Rich in essential minerals, dietary fiber, and natural energy.",
    category: "Combos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMc5AQ1lSNtNrW5SuAlad_OLlEs1W3XUzPFbMb4QsBmiux2JhDUhrv36fqD6PbyXEEUzWh7C1KvmoA9uljKxX-i878tvh8u1N7eMErWtnALtzLxNjpeXhLKyfPoZK2S1iHW-QzmD0M5Xh2SIeIjMUxSeNT6xheRfGW8J0TyuVlBF4SrGE4Y3uabkIvuqocCFZw10_FmTyQXva59lQu_0UChF7QI2fYCCKbnHbrw6UMy0qFjLyYBx43AY8kXc-LapjinshQZBIq4Wlc",
    rating: 4.9,
    reviewsCount: "1.8k",
    bestSeller: true,
    weightOptions: ["250g", "500g", "1kg"]
  },
  {
    id: "pistachios-1",
    name: "Turkish Roasted Pistachios",
    price: 1825,
    originalPrice: 2158,
    description: "Premium Antep-style pistachios slow-roasted with a touch of sea salt. Renowned for their vibrant green hue, distinct savory depth, and unforgettable satisfying crunch.",
    category: "Pistachios",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD40kPDROr6F7ktdLGnBpuyMHsmF-bNytIMb4Qh0cUng-eXKaIjSKWtgvAXV8JiKZ1DivLf-fVLch_w0NSxVZMIPzWxqpyxLQUUoVcPL7JOeZ66xACyAc8zfchW0HDbA2p5tTxDP58YrqhgOQeM5_fWL3KLacNNWzT5gdZZTbJf2AyrKT7ebr4YjaoM-NiNrQJeS9BLJsGpNZfQJMtPfOOT8tjc8oZDuBAuMphHN66uH9c8zNYFDlBNOOCwNSLKRwzqbs98dpnQLDfZ",
    rating: 4.8,
    reviewsCount: "3.1k",
    weightOptions: ["250g", "500g", "1kg"]
  },
  {
    id: "walnuts-kashmiri",
    name: "Kashmiri Walnuts",
    price: 950,
    originalPrice: 1200,
    description: "Shelled extra-light halves directly from the organic orchards of Kashmir. Unmatched sweetness, delicate crunch, and rich nutrient profiles.",
    category: "Walnuts",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuLIeTwOOuq7TpRCFgHgTS9nl5APkbWI2i41V0gFDE9xVPpsa7vYuVn3_dx1D5aNrPzcqtUK_Fk6m_o4CChGb10n0BAK5MG2RmV_NQOMoSbhJenGpgAzEkXy3hcRC-oN2iNwN4qqmwEPRQIbSY8hhgk8JA1Kwb4GgyjO-nTtBdM9ecke7jCGNcxdJfqGIC3VZaVcCojiy9u6DQCvpv-MYor3A9Z5TG3Rs_tHZMvAodtT-Dz1bhJGxoBZSqnECtKGaOx43axdEQ78SV",
    rating: 4.6,
    reviewsCount: "920",
    weightOptions: ["250g", "500g", "1kg"]
  },
  {
    id: "figs-1",
    name: "Sun-Dried Figs",
    price: 720,
    originalPrice: 850,
    description: "Preservative-free premium sun-dried figs sliced and packed to perfection. A soft, jammy center with a natural sweetness and rich mineral content.",
    category: "Combos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAre_rpLDiDNReobFQqRSi9ePmfL6ee529veWfK7ZrrUGc6iFscyOf8b9-POMG9Ee7LsW9gW1NSgEyDIuobg_blBHRV7-ToNYw1ZudAIc8g_urJRhazAelE-9_JLvCYlsz9xcWabG34ZVMh5e4rDKX4trT4Y5zU-23CWsdnqVeXv6gcSsh11_v7qbohOJKIfOhbXvWoL5iEJfWWJsyx_t1FmqtAaMpjlsL6J3kgEqWT4vvRBs8doqqo3yGwnKu82fl-B-w-mEIu86JW",
    rating: 4.7,
    reviewsCount: "1.1k",
    weightOptions: ["250g", "500g", "1kg"]
  },
  {
    id: "cashews-1",
    name: "Creamy Whole Cashews",
    price: 1245,
    originalPrice: 1450,
    description: "Jumbo sized whole white cashews, naturally creamy and rich. Perfect for roasting, baking, or absolute direct healthy snacking enjoyment.",
    category: "Cashews",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDl1PePvxEI4NB19bQ4Qt2MUDvAZ4CDAv_fAJkYIjlhK1pjJgv02giUjWsfG0OmmCcUnYSjtUbSIPBwhEGy23cR9C73kSfBX_MSi4sTKdrDxZzPHQrsyl7I8hCMQGbM5m4jAoWLfLc0gc2-LzVI8xL8-ZNyZXhCn_bHPTegIHZ30MEDIIlzAYwF6OFKLAANCuA2AyLoobFO2tKCZp1IVoqeuYuFdXvU4zNHL4Og2RJInVavHORcVzzJ5i8-Zs5znusOtStoAxoNkrz9",
    rating: 4.9,
    reviewsCount: "1.5k",
    weightOptions: ["250g", "500g", "1kg"]
  },
  {
    id: "trailmix-1",
    name: "Energy Trail Mix",
    price: 1079,
    originalPrice: 1300,
    description: "A luxury blend of California almonds, Chilean walnuts, seedless raisins, sun-dried apricot bits, and creamy cashews.",
    category: "Combos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ7yg827xIqMzfWzt88Bp2IfCF-iNdFalgEACtT21rM8LX9ZnKFtK8a45NqMxjSAIBS43SNxuO311waP5JDx0gxhd3rK33wftJDcgntkS8jrW4-09VsoQbYbQAcVuq5AsT1j2xob4HAvxVmWOSox-kV7MAYaXzQ-r4OL4A1XSUsJC8txxmx8U8-m_3WB8_w-jj9F46dm_RsiS6Mil8204T_QL_nLHBc8kmeeCqiO7eoA2hdutQJZljlS3noM7HWeiIKmrn8cV8MYcU",
    rating: 4.5,
    reviewsCount: "820",
    weightOptions: ["250g", "500g", "1kg"]
  }
];

export const SAVED_ITEMS_INITIAL = ["almonds-1", "dates-1", "walnuts-kashmiri", "figs-1"];

export const ORDERS_MOCK: Order[] = [
  {
    id: "FN-92834",
    status: "Out for Delivery",
    date: "Today",
    expectedTime: "Today, 4:00 PM - 6:00 PM",
    itemsCount: 3,
    totalAmount: 2450,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyvHoGvJ7i3ScRF0paQKOgqPfP3YrXfJK32Uhsuw2_FJO9HUKL3nGHlp2TXnC4GksecBr_TTMn1oD9eMyHKtJLUtEbd2YSuWPTtr-pqAf2--0-I4RblUDA0euPSteAfnDcHGDzwhgwR6b9xle5Bjiti1uvEQ-t_eLMYCVTC4Dwi_0rYIXMeMROriCZMzA6n15WZcs_gocL9Mz80spGBATi2mXSS6uNP1y2Xk3cdfKx61XdIdmWBtU1vtJdBAHTzBWFdkebkiClEAZ2",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDI1TceXqWHKPbFTNt-6XrDAXdNdjEoZE-QDTapL0UWJOsILz0FBD7TxQ77JpC1ZR16k_1ffS8_yb1-PJKmzzYqM8FXhkfnXBs8s0NjAN7Fi0PG8AwmDB7ETddhsnwXZcql9cP8OThOCh0XdEGYJRcD3bVQidWaddmuTreNqpzfFInCRgGDueTe6n80vbHxCSVT-jbghBrq-8ZmelUPn4mqybUCrJ_uL1kJjRJmny9VJUAC5pdJ4clrOGCv9jVQg4sPYk5d2tizwUiS"
    ]
  },
  {
    id: "FN-92811",
    status: "Order Processing",
    date: "Oct 24, 2023",
    itemsCount: 1,
    totalAmount: 1280,
    images: [],
    singleItemName: "Premium Chilean Walnuts (Bulk)",
    singleItemDetails: "1.5 kg • Standard Grade",
    singleItemImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_pRIMeeudwcg_PA3kTrojl45ZZT_md2MDlecXVFWSKrdj7PjnPfbUmm4PIDgmN5SYZQLd2rq1pCYY0KwHqvpUQp_dL_pAso6NBD-AP8Ullj7zqLZr6BQyp0hDWAamBu4TncLOG9wSv5fkxE7K8fKHRzUJAMDctckYsE46K-zb8CMoQOiW2u_5bE1FJFzHE4eVKHzaivbqYeCgClv-yqY5kKoTAltZK29V3DfDQPKdfTy9xuNkZNleip-0ZeV0BTKCpiZF19YAPQi5"
  },
  {
    id: "FN-91002",
    status: "Delivered",
    date: "Oct 12, 2023",
    itemsCount: 3,
    totalAmount: 3900,
    images: []
  },
  {
    id: "FN-88921",
    status: "Delivered",
    date: "Sep 28, 2023",
    itemsCount: 1,
    totalAmount: 650,
    images: []
  },
  {
    id: "FN-87654",
    status: "Delivered",
    date: "Aug 15, 2023",
    itemsCount: 5,
    totalAmount: 5120,
    images: []
  }
];

export const FORMAT_CURRENCY = (amount: number) => {
  return "₹" + amount.toLocaleString("en-IN");
};
