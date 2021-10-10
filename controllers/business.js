const express = require("express");
const router = express.Router();
const Business = require("../models/Business");

// -- index --
router.get("/", async (req, res) => {
  try {
    const Businesses = await Business.find();
    res.status(200).json(Businesses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- show --
router.get("/:id", async (req, res) => {
  try {
    const foundBusiness = await Business.findById(req.params.id);
    res.status(200).json(foundBusiness);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- create --
router.post("/", async (req, res) => {
  try {
    const newBusiness = await Business.create(req.body);
    res.status(200).json(newBusiness);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- destory --
router.delete("/:id", async (req, res) => {
  try {
    const deletedBusiness = await Business.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedBusiness);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

// -- update --
router.put("/:id", async (req, res) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedBusiness);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
