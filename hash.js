import bcrypt from 'bcrypt';
async function registerUser(plainTextPassword) {
    try {
        const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
        return hashedPassword;
    } catch (error) {
        console.error("Hashing failed:", error);
    }
}


console.log(await registerUser('admin1234'));