import express from "express";

const router = express.Router();
router.post("/api/users/signout", (req, res) => {
  res.send("Hi there!");
});

// use the 'as' keyword to rename the export object
export { router as signoutRouter };
