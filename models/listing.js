const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: {type: Number, require: true},
    location: String,
    country: String,

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          },
    },
    catagory: {
        type: String,
        enum: ["Mountain","Castles", "Farms","Iconic Cities","Amazing Pools"],
    }

});

listingSchema.post("findoneAndDelete", async (listing) => {
    if (listing) {
        await review.deleteMany({ _id: {$in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

