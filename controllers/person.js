const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const {
  handleValidateOwnership,

  createBisToken,
} = require("../middleware/auth");

// -- index --
router.get("/", async (req, res, next) => {
  try {
    const Persons = await Person.find();
    res.status(200).json(Persons);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- show --
router.get("/:id", async (req, res) => {
  try {
    const foundPerson = await Person.findById(req.params.id);
    res.status(200).json(foundPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- create --
router.post("/", async (req, res, next) => {
  try {
    const newPerson = await Person.create(req.body);
    res.status(200).json(newPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- destory --
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedPerson = await Person.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedPerson);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
});

// -- update --
router.put("/:id", async (req, res, next) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
