import Joi from 'joi';

export const validateMarkFraud = (req, res, next) => {
  const schema = Joi.object({
    transactionId: Joi.number().integer().min(1).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  
  next();
};