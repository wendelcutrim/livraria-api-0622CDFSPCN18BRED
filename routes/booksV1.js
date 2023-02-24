const express = require('express');
const router = express.Router();
const BooksController = require("../controllers/BooksController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", BooksController.index);
router.post("/", verifyToken, BooksController.store);
router.get("/:id", BooksController.show);
router.put("/:id", verifyToken, BooksController.edit);
router.delete("/:id", verifyToken, BooksController.delete);


module.exports = router;