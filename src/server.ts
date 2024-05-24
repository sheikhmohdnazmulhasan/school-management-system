import mongoose from "mongoose";
import app from "./app"
import config from "./app/config"

(
    async function () {

        try {
            await mongoose.connect(config.MONGODB_URI as string);
            console.log("Pinged your deployment. You successfully connected to MongoDB!")

            app.listen(5000, () => {
                console.log(`PH university app listening on port ${5000}`);
            });

        } catch (error) {
            console.log('There was a problem starting the server', error);
        }
    }
)();