import bcrypt from "bcryptjs";
export const Hash = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};
export const Compare = async (password, userPassword) => {
    const passwordValid = await bcrypt.compare(password, userPassword);
    return passwordValid;
};

