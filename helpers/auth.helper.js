// we use bcrypt to hash our fxns.we made 2 helper fxns, one to hash our passwordd and other to compare it and decrypt

// as no.of salts rounds increases, cpu usage utna hi badega


import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};