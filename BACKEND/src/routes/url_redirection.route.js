import express from "express";
import urlSchema from "../models/shortUrl.model.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("Redirect request for:", id);

    const url = await urlSchema.findOne({ short_url: id });

    if (!url) {
      console.log("URL not found for:", id);
      return res.status(404).send("Not found");
    }

    // console.log("Redirecting to:", url.full_url);
    return res.redirect(url.full_url);
  } catch (error) {
    console.error("Error during redirect:", error);
    res.status(500).send("Server error");
  }
});

export default router;
