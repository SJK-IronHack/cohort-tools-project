const User = require("../models/User.model");
const router = require('express').Router();

// GET /api/users/:userId - Retrieves a specific user by id
router.get("/:userId", async (req, res) => {
    let userId
    try {
      userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error, message: `User with id ${userId} not found.` })
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error, message: `Failed to get the user with id ${userId}.` });
    }
  });

module.exports = router;