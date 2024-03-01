const router = require("express").Router();
const { getAllUserPosts } = require("../controllers/stories.controller");

router.route("/:id").get(getAllUserPosts);

module.exports = router;
