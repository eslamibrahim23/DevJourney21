const router = require("express").Router();
const {
  createStories,
  getStories,
  getStoryById,
  deleteStory,
  updateStory,
  filterByTitle,
  onpagination,
  getAllUserPosts,
} = require("../controllers/stories.controller");

router.route("/create").post(createStories);
router.route("/getAll").get(getStories);

router.route("/pagination").get(onpagination);

router.route("/:id").get(getStoryById);
router.patch("/:id", updateStory);
router.delete("/:id", deleteStory);

router.route("/filter/:title").get(filterByTitle);

router.route("/nooott").get(getAllUserPosts);
module.exports = router;
