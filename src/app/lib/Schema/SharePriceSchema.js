import mongoose from "mongoose";

const SharePriceSchema = new mongoose.Schema({
   name:{
         type: String,
         required: true
   },
   currentPrice:{
        type: Number,
        required: true
   },
    priceChange:{
          type: Number,
          required: true
    },
    percentChange:{
          type: Number,
          required: true
    },
    lastUpdated:{
          type: String,
          required: true
    }
});

const SharePrice = mongoose.models.SharePrice || mongoose.model('SharePrice', SharePriceSchema);

export default SharePrice;