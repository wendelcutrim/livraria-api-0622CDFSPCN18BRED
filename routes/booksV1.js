const express = require('express');
const router = express.Router();
const BooksController = require("../controllers/BooksController");

router.get("/", BooksController.index);
router.post("/", BooksController.store);
router.get("/:id", BooksController.show);
router.put("/:id", BooksController.edit);
router.delete("/:id", BooksController.delete);


module.exports = router;