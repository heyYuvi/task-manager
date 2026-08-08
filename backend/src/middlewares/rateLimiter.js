import rateLimit from "express-rate-limit";


export const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 6,
    message: {
        success: false,
        message: "Too many login attemps. Please try again later."
    }
});

export const generalLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 100,
    message: {
        success: false,
        message: "Too many requests. Pease try again later."
    }
});

