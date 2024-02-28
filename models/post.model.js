const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User6",
      required: true,
    },
    category: {
      type: String,
      enum: ["General", "Personal", "Education", "Historical", "Technology"],
      required: true,
    },
    coverfile: {
      type: String,
    },
    covertype: {
      type: String,
    },
  },
  // for automatic createdAt and updatedAt
  { timestamps: true }
);

// Joi validation schema
const validationSchema = Joi.object({
  _id: Joi.required(),
  title: Joi.string().required(),
  body: Joi.string().required(),
  createdBy: Joi.object().required(),
  category: Joi.string().required(),
  ///if i need to receive empty 
  coverfile: Joi.string().allow(''),
    ///if i need to receive empty or this
  covertype: Joi.string()
  .empty('')
  .default('default value'),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

// Mongoose pre-save hook for validation
postSchema.pre("save", function (next) {
  const validation = validationSchema.validate(this.toObject());
  if (validation.error) {
    // console.log("joy error",err);
    const err = validation.error.details[0].message;
    console.log("joy error", err);
    // Handle validation error (throw an error or handle it based on your application logic)
    return Promise.reject(
      "Validation Error: " + validation.error.details[0].message
    ); // Reject the Promise with the validation error
    next(res.json({ err, status: "failed! " }));
  } else {
    // Validation successful, continue with the save operation
    next();
  }
});

const Post = mongoose.model("Post112", postSchema);

module.exports = Post;
