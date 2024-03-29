const Story = require("../models/post.model");

//4-filter???????/////wait and pagination/////////

//end for catrogies
// const getAllUserPosts = async (req, res, next) => {
//   try {
//     const idd = req.userOrAdmin._id;
//     console.log(idd);

//     const finnnnnnd = await Story.find().populate("createdBy");

//     // const findAll = await Story.find();
//     // const findAll = await Story.find().limit(10);
//     return res.json({ findAll, message: "api is working!" });
//   } catch (error) {
//     res.json({ status: "failed! can`t fetch storeis" });
//     next();
//   }
// };

let count = 10;
const createStories = async (req, res, next) => {
  try {
    const { title, body, category, coverfile, covertype } = req.body;

    console.log(coverfile);
    const createstory = await Story.create({
      title,
      body,
      createdBy: req.userOrAdmin._id,
      category,
      coverfile,
      covertype,
      // covertype,
    });

    return res.json({ createstory, status: "success" });
  } catch (error) {
    console.log(error);
    next();
  }
};

const getStories = async (req, res, next) => {
  try {
    const findAll = await Story.find();
    // const findAll = await Story.find().limit(10);
    return res.json({ findAll, message: "api is working!" });
  } catch (error) {
    res.json({ status: "failed! can`t fetch storeis" });
    next();
  }
};

const getStoryById = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);

    const findById = await Story.findById(id).populate("createdBy");
    res.json({ findById });
    console.log(findById);
  } catch (error) {
    return (
      console.log(error),
      res.json({
        error: console.log(error),
        statud: "Story Not found go to Create page",
      })
    );
    next();
  }
};
const updateStory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated = await Story.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.send({ updated, message: "story Updated successfully!" });
  } catch (error) {
    res.json({
      statud: "Story Not found go to Create page",
    });
    next();
  }
};
const deleteStory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteUser = await Story.findByIdAndDelete(id);
    return res.json({ deleteUser, message: "story Deleted successfully!" });
  } catch (error) {
    res.json({
      statud: "Story Not found go to Create page",
    });
    next();
  }
};

const filterByTitle = async (req, res, next) => {
  try {
    const title = req.params.title;
    console.log(title);
    //findone must have an object
    const findById = await Story.find({ title }).sort({ title: 1 });
    return res.json({ findById });
  } catch (error) {
    console.log(error);
    next();
  }
};

const onpagination = async (req, res, next) => {
  try {
    const noOfStories = await Story.find().count();
    if (count > noOfStories) {
      count = 0;
    }
    const storeisPerPage = await Story.find().skip(count).limit(10);
    count = count + 10;
    console.log(storeisPerPage);
    return res.json({ storeisPerPage, message: "api is working!" });
  } catch (error) {
    console.log(error);
    next();
  }
};

const getAllUserPosts = async (req, res) => {
  try {
    const id = req.params.id;
    const findpostsofuser = await Story.find({ createdBy: id });
    res.json(findpostsofuser);
  } catch (eror) {
    console.log(eror);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createStories,
  getStories,
  getStoryById,
  updateStory,
  deleteStory,
  filterByTitle,
  onpagination,
  getAllUserPosts,
};
