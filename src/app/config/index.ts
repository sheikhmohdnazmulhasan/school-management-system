import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    port: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    default_pass: process.env.DEFAULT_PASS
}