 
const Joi = require("@hapi/joi");

const productIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const productTagSchema = Joi.array().items(Joi.string().max(10));

const createProductSchema = Joi.object({
  name: Joi.string()
    .max(50)
    .required(),
  price: Joi.number()
    .min(1)
    .max(1000000),
  category: Joi.string()
    .max(50)
    .required(),
  type: Joi.string()
    .max(50)
    .required(),
  careLevel: Joi.string()
    .max(50)
    .required(),
  temperament: Joi.string()
    .max(500)
    .required(),
  description: Joi.string()
    .max(50),
  image: Joi.string().required(),
  tags: productTagSchema
});

const updateProductSchema = Joi.object({
  name: Joi.string()
    .max(50)
    .required(),
  price: Joi.number()
    .min(1)
    .max(1000000),
  category: Joi.string()
    .max(50),
  type: Joi.string()
    .max(50),
  careLevel: Joi.string()
    .max(50),
  temperament: Joi.string()
    .max(500),
  description: Joi.string()
    .max(50),
  image: Joi.string(),
  tags: productTagSchema
});

module.exports = {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema
};