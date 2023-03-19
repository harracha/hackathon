import path from "path";
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const customConfig = {
  port: process.env.PORT || 4000,
  origin: process.env.ORIGIN as unknown as string,
  secret: process.env.JWT_SECRET_KEY || "secret_key",
  // dbUri: process.env.DATABASE_URL || 'file:./db.sqlite',
};

export default customConfig;
