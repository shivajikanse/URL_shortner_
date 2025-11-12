import express from "express";
import urlSchema from "../models/shortUrl.model.js";
import { nanoid } from "nanoid";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Request received:", req.body);
    const { full_url } = req.body;

    if (!full_url) {
      console.log("No full_url found in body");
      return res.status(400).json({ message: "full_url is required" });
    }

    const shortUrl = nanoid(7);
    // console.log("Generated short URL:", shortUrl);

    const newUrl = new urlSchema({
      full_url,
      short_url: shortUrl,
    });

    await newUrl.save();
    console.log(" URL saved to database:", newUrl);

    res.status(201).json({
      message: "Short URL created successfully",
      data: newUrl,
    });
  } catch (error) {
    console.error(" Error creating short URL:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
