const express = require("express");
const router = express.Router();
const Hotdesk = require("../models/Hotdesk");
const {
  handleValidateOwnership,
  requireToken,
  createBisToken,
} = require("../middleware/auth");

// -- index --
router.get("/", requireToken, async (req, res, next) => {
  try {
    const Hotdesks = await Hotdesk.find();
    res.status(200).json(Hotdesks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- show --
router.get("/:id", requireToken, async (req, res, next) => {
  try {
    const foundHotdesk = await Hotdesk.findById(req.params.id);
    res.status(200).json(foundHotdesk);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- create --
router.post("/", requireToken, async (req, res, next) => {
  try {
    const newHotdesk = await Hotdesk.create(req.body);
    res.status(200).json(newHotdesk);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- destory --
router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    const deletedHotdesk = await Hotdesk.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedHotdesk);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

// -- update --
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    const updatedHotdesk = await Hotdesk.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedHotdesk);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
