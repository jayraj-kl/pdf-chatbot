import z from "zod";

const envSchema = z.object({
  OPENAI_API_KEY: z.string().trim().min(1),
  PINECONE_API_KEY: z.string().trim().min(1),
  PINECONE_INDEX_NAME: z
    .string()
    .trim()
    .min(1)
    .regex(/^[a-z0-9-]+$/),
  PDF_PATH: z.string().trim().min(1),
  INDEX_INIT_TIMEOUT: z.coerce.number().min(1),
});

export const env = envSchema.parse(process.env);
