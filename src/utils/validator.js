const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

const adminSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

const courseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  imgaeUrl: Joi.string().uri().optional(),
});

const purchaseSchema = Joi.object({
  courseId: Joi.string().required(),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports={
    validate,userSchema,adminSchema,purchaseSchema,courseSchema
}
