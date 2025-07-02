import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            // slug is added to make website SEO friendly
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            // category and product both have diff ids. the ids get created automtic by mongoose
            type: mongoose.ObjectId,
            ref: "Category",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        photo: {
            // we are saving photos not in any cloud service but in mongodb itself, the mongodb has a limit on how much data you can store
            data: Buffer,//Buffer is a special type in Node.js used to store binary data (like images, audio, video, etc.).Here, data will store the actual image in binary format inside MongoDB.
            contentType: String,
            // contentType will store the MIME type of the image (like image/jpeg, image/png, etc.)
            // MIME( Multipurpose Internet Mail Extensions.) type tells the browser or application what kind of file it is — like an image, video, PDF, or plain text.
        },
        shipping: {
            // shipping is used to check whether the product can be shipped or not to show order status
            type: Boolean,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Products", productSchema);