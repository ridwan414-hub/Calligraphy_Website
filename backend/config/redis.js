import Redis from 'ioredis';

// Redis Configuration
const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
});

redis.on("connect", () => {
    console.log("Redis connected ");
});

redis.on("error", (error) => {
    console.error("Redis connection error :", error);
});

export default redis;