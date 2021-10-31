const express = require("express");
const router = express.Router();
const Conference = require("../models/Conference");
const {
  handleValidateOwnership,
  requireToken,
  createBisToken,
} = require("../middleware/auth");

// -- index --
router.get("/", requireToken, async (req, res, next) => {
  try {
    const Conferences = await Conference.find();
    res.status(200).json(Conferences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- show --
router.get("/:id", requireToken, async (req, res, next) => {
  try {
    const foundConference = await Conference.findById(req.params.id);
    res.status(200).json(foundConference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- create --
router.post("/", requireToken, async (req, res, next) => {
  try {
    const newConference = await Conference.create(req.body);
    res.status(200).json(newConference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- destory --
router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    const deletedConference = await Conference.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedConference);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

// -- update --
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    const updatedConference = await Conference.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedConference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
