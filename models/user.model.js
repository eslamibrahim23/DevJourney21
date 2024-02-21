const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      // required: true,
      min: 12,
      max: 80,
    },
    address: {
      country: {
        type: String,
        // required: true,
      },
      city: {
        type: String,
        // required: true,
      },
    },
    gender: {
      type: String,
      // required: true,
      enum: ["male", "female"],
    },
    role: {
      type: String,
      // required: true,
      enum: ["admin", "user"],
    },
    phoneNumber: {
      type: String,
      // required: true,
      validate: {
        validator: function (number) {
          return /^[0-9]{11}$/.test(number);
        },
      },
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

// Joi validation schema
const validationSchema = Joi.object({
  _id: Joi.required(),
  firstname: Joi.string().min(3).max(20).required(),
  lastname: Joi.string().min(3).max(20).required(),
  email: Joi.string().max(40).required(),
  password: Joi.string().required(),
  age: Joi.number(),
  address: Joi.object(),
  gender: Joi.string(),
  role: Joi.string(),
  phoneNumber: Joi.number().max(11),
  isActive: Joi.boolean(),
  createdAt:Joi.date(),
  updatedAt:Joi.date(),
});

// Mongoose pre-save hook for validation
userSchema.pre("save", function (next) {
  const validation = validationSchema.validate(this.toObject());
  if (validation.error) {
    const err= validation.error.details[0].message;

    return Promise.reject('Validation Error: ' + validation.error.details[0].message); // Reject the Promise with the validation error
    // Handle validation error (throw an error or handle it based on your application logic)
    next(res.json({ err, status: "failed! " }));
  } else {
    // Validation successful, continue with the save operation
    next();
  }
});

module.exports = mongoose.model("User6", userSchema);
