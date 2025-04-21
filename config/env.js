import { config } from "dotenv";

config({ path: `.env` });

export const {
	PORT,
	SECRET_KEY,
	PRICE_ID,
	ENDPOINT_SECRET
} = process.env;