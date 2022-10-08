import mongoose from "mongoose";

/*
* This function connects to the mongoose DB with the url provided in paramaters.
* @param: connectionURI {string} --> the url of mongoDB connection
* @returns: {Promise<void>}
*/

export const connectionToMongoDB = async (connectionURI: string): Promise<void> => {
    try {
        const connection = await mongoose.connect(connectionURI);
        console.log(`Connection establised with mongoDB on ${connection.connection.host}`);
    } catch (err) {
        console.log(`Can't connect to mongoDB, uri=${connectionURI}\nError: ${err}`);
    }
};