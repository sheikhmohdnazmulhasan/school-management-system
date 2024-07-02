import mongoose from "mongoose";
import app from "./app"
import config from "./app/config"
import { Server } from 'http';

let server: Server;

(
    async function () {

        try {
            await mongoose.connect(config.MONGODB_URI as string);
            console.log("Pinged your deployment. You successfully connected to MongoDB!")

            server = app.listen(config.port, () => {
                console.log(`PH university app listening on port ${config.port}`);
            });

        } catch (error) {
            console.log('There was a problem starting the server', error);
        }
    }
)();

// async error handle
process.on('unhandledRejection', () => {
    console.log('🥱 unhandledRejection is detected! shutting down the server...');

    if (server) {
        server.close(() => {
            process.exit(1);

        });
    };

    process.exit(1);
});


// synchronies error handle
process.on('uncaughtException', () => {
    console.log('🥱 uncaughtException is detected! shutting down the server...');
    process.exit();
});





