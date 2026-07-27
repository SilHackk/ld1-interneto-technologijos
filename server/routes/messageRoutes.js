import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// CREATE - sukurti naują žinutę
router.post("/", async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// READ - gauti visas žinutes
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ONE - gauti vieną žinutę pagal ID
router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Žinutė nerasta" });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE - atnaujinti žinutę
router.put("/:id", async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({ message: "Žinutė nerasta" });
    }

    res.json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - ištrinti žinutę
router.delete("/:id", async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Žinutė nerasta" });
    }

    res.json({ message: "Žinutė ištrinta" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;