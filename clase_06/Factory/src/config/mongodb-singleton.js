import mongoose from "mongoose";
import config from "./config.js";

export default class MongoSingleton {
    static #instance;

    constructor() {
        this.#connectMongDB();
    }


    static getInstance() {
        if (this.#instance) {
            console.log('MongoSingleton instance already exists');
        } else {
            this.#instance = new MongoSingleton();
        }
        return this.#instance;
    }


    #connectMongDB = async () => {
        try {
            await mongoose.connect(config.mongoUrl);
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            process.exit(1); // Exit the process with an error code
        }
    }

}

