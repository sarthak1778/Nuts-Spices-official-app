/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum AppScreen {
  Splash = "splash",
  Onboarding1 = "onboarding1",
  Onboarding2 = "onboarding2",
  Onboarding3 = "onboarding3",
  Login = "login",
  Home = "home",
  Categories = "categories",
  Saved = "saved",
  Profile = "profile",
  Orders = "orders",
  Payment = "payment",
  ProductDetails = "product_details" // Bonus screen for detail interaction!
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviewsCount: string;
  organic?: boolean;
  bestSeller?: boolean;
  proteinRich?: boolean;
  weightOptions: string[];
  specs?: { label: string; value: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: string;
}

export interface Order {
  id: string;
  status: "Out for Delivery" | "Order Processing" | "Delivered";
  date: string;
  expectedTime?: string;
  itemsCount: number;
  totalAmount: number;
  images: string[];
  singleItemName?: string;
  singleItemDetails?: string;
  singleItemImage?: string;
}
