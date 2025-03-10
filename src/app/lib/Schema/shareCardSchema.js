import mongoose from "mongoose";

const shareCardSchema = new mongoose.Schema({
    daily: [{
        date: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    weekly: [{
        date: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    monthly: [{
        date: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }]
});

export default mongoose.models.shareCardSchema || mongoose.model("shareCardSchema", shareCardSchema);
