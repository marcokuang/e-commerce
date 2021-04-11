import express from "express";

const router = express.Router();

// Sign out route will empty all the cookie session for the request
router.post("/api/users/signout", (req, res) => {
  // destroy the session object
  req.session = null;
  res.send({});
});

// use the 'as' keyword to rename the export object
export { router as signoutRouter };
