import Joi from 'joi';

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production').required(),
  RPC_URL: Joi.string().required(),
  PRIVATE_KEY: Joi.string().required(),
  CONTRACT_ADDRESS: Joi.string().required(),
  PORT: Joi.number().default(3000)
});

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Env validation error: ${error.message}`);
}

export default value;