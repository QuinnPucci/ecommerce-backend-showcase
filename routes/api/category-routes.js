const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // Includes associated Products.
  Category.findAll({
    attributes: ["id", "category_name"],
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((category) => res.json(category))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Find category by its i
router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((category) => {
      if (!category) {
        res.status(400).json({ message: "No category found with that id." });
        return;
      }
      res.json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Creates a new category.
router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((category) => res.json(category))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a category by id
router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      if (!category[0]) {
        res
          .status(400)
          .json({ message: "There is no category found with that id." });
        return;
      }
      res.json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a category by id
router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      if (!category) {
        res.status(400),
          json({ message: "There is no category found with that id." });
      }
      res.json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;