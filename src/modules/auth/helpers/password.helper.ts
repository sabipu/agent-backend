import bcrypt from 'bcrypt';

const saltRounds = 16;

// Function to hash a password
export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

// Function to compare a password with its hash
export async function comparePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
}