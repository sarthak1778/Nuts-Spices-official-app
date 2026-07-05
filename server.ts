/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { PRODUCTS, SAVED_ITEMS_INITIAL, ORDERS_MOCK } from "./src/data";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Initialize Firebase using the client SDK with API keys
  let db: any = null;
  let firebaseProjectId = "";

  try {
    const configPath = path.join(process.cwd(), "firebase-applet-config.json");
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      firebaseProjectId = config.projectId;
      const databaseId = config.firestoreDatabaseId || "(default)";
      const firebaseApp = initializeApp(config);
      db = getFirestore(firebaseApp, databaseId);
      console.log(`[Backend] Firebase initialized successfully on Project: ${firebaseProjectId} (Database: ${databaseId})`);
    } else {
      console.warn("[Backend] firebase-applet-config.json not found! Running in non-persistent mock mode.");
    }
  } catch (err) {
    console.error("[Backend] Failed to initialize Firebase:", err);
  }

  // ── Database Seeding on boot ──
  async function seedDatabase() {
    if (!db) return;
    try {
      console.log("[Backend] Checking database state...");
      
      // Seed products if collection is empty
      const productsCol = collection(db, "products");
      const productsSnap = await getDocs(productsCol);
      if (productsSnap.empty) {
        console.log("[Backend] No products found in Firestore. Seeding products...");
        for (const product of PRODUCTS) {
          await setDoc(doc(db, "products", product.id), product);
        }
        console.log("[Backend] Products collection seeded successfully!");
      }

      // Seed default user profile if document is empty
      const defaultUserEmail = "julian.a@luxuryorganic.com";
      const userRef = doc(db, "users", defaultUserEmail);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        console.log(`[Backend] User profile not found for ${defaultUserEmail}. Seeding default profile...`);
        await setDoc(userRef, {
          name: "Julian Alexander",
          email: defaultUserEmail,
          membershipStatus: "Gilded Member",
          rewardsPoints: 1250,
          savedIds: SAVED_ITEMS_INITIAL,
          cart: [
            {
              product: PRODUCTS[0], // Jumbo Roasted Almonds
              quantity: 1,
              selectedWeight: "500g"
            },
            {
              product: PRODUCTS[2], // Medjool Dates Royal
              quantity: 1,
              selectedWeight: "250g"
            }
          ],
          orders: ORDERS_MOCK
        });
        console.log("[Backend] User profile seeded successfully!");
      }
    } catch (err) {
      console.error("[Backend] Error seeding database:", err);
    }
  }

  // Seed on launch
  await seedDatabase();

  // ── API ROUTES ──

  // 1. Healthcheck
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", firebaseConnected: !!db, projectId: firebaseProjectId });
  });

  // 2. Fetch Products
  app.get("/api/products", async (req, res) => {
    if (!db) {
      return res.json(PRODUCTS);
    }
    try {
      const productsCol = collection(db, "products");
      const productsSnap = await getDocs(productsCol);
      const productsList: any[] = [];
      productsSnap.forEach((docSnap) => {
        productsList.push(docSnap.data());
      });
      res.json(productsList);
    } catch (err) {
      console.error("[Backend] Error fetching products from Firestore:", err);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // 3. Fetch User Profile
  app.get("/api/profile", async (req, res) => {
    const defaultUserEmail = "julian.a@luxuryorganic.com";
    if (!db) {
      return res.json({
        name: "Julian Alexander",
        email: defaultUserEmail,
        membershipStatus: "Gilded Member",
        rewardsPoints: 1250,
        savedIds: SAVED_ITEMS_INITIAL,
        cart: [],
        orders: ORDERS_MOCK
      });
    }
    try {
      const userRef = doc(db, "users", defaultUserEmail);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        res.json(userSnap.data());
      } else {
        res.status(404).json({ error: "Profile not found" });
      }
    } catch (err) {
      console.error("[Backend] Error fetching profile:", err);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // 4. Update Cart
  app.post("/api/profile/cart", async (req, res) => {
    const defaultUserEmail = "julian.a@luxuryorganic.com";
    const { cart } = req.body;
    if (!db) {
      return res.json({ success: true, message: "Mock saved" });
    }
    try {
      const userRef = doc(db, "users", defaultUserEmail);
      await updateDoc(userRef, { cart });
      res.json({ success: true, cart });
    } catch (err) {
      console.error("[Backend] Error updating cart:", err);
      res.status(500).json({ error: "Failed to update cart" });
    }
  });

  // 5. Update Saved Selections
  app.post("/api/profile/saved", async (req, res) => {
    const defaultUserEmail = "julian.a@luxuryorganic.com";
    const { savedIds } = req.body;
    if (!db) {
      return res.json({ success: true, message: "Mock saved" });
    }
    try {
      const userRef = doc(db, "users", defaultUserEmail);
      await updateDoc(userRef, { savedIds });
      res.json({ success: true, savedIds });
    } catch (err) {
      console.error("[Backend] Error updating saved items:", err);
      res.status(500).json({ error: "Failed to update saved selections" });
    }
  });

  // 6. Create / Add New Order
  app.post("/api/profile/orders", async (req, res) => {
    const defaultUserEmail = "julian.a@luxuryorganic.com";
    const { order } = req.body;
    if (!db) {
      return res.json({ success: true, message: "Mock order placed" });
    }
    try {
      const userRef = doc(db, "users", defaultUserEmail);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData) {
          const currentOrders = userData.orders || [];
          const currentPoints = userData.rewardsPoints || 0;
          
          // Add new order at the beginning of the list
          const updatedOrders = [order, ...currentOrders];
          // Earn rewards points: 10% of total amount
          const pointsEarned = Math.round(order.totalAmount * 0.1);
          const updatedPoints = currentPoints + pointsEarned;

          await updateDoc(userRef, {
            orders: updatedOrders,
            rewardsPoints: updatedPoints,
            cart: [] // Clear cart upon checkout completion
          });

          res.json({ success: true, orders: updatedOrders, rewardsPoints: updatedPoints });
        } else {
          res.status(500).json({ error: "Failed to read user data" });
        }
      } else {
        res.status(404).json({ error: "User profile not found" });
      }
    } catch (err) {
      console.error("[Backend] Error submitting order:", err);
      res.status(500).json({ error: "Failed to submit order" });
    }
  });

  // 7. Upgrade Membership
  app.post("/api/profile/upgrade", async (req, res) => {
    const defaultUserEmail = "julian.a@luxuryorganic.com";
    if (!db) {
      return res.json({ success: true, membershipStatus: "Gilded Gold Member" });
    }
    try {
      const userRef = doc(db, "users", defaultUserEmail);
      await updateDoc(userRef, {
        membershipStatus: "Gilded Gold Member"
      });
      res.json({ success: true, membershipStatus: "Gilded Gold Member" });
    } catch (err) {
      console.error("[Backend] Error upgrading membership:", err);
      res.status(500).json({ error: "Failed to upgrade membership" });
    }
  });


  // ── VITE / STATIC FILE SERVING ──
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Backend] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
