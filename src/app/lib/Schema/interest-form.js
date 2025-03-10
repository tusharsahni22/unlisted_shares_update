import mongoose from "mongoose";

const InterestFormSchema = new mongoose.Schema({
    name:{
          type: String,
          required: true
    },
    email:{
         type: String,
         required: true
    },
    phone:{
          type: Number,
          required: true
    },
    investmentAmount:{
          type: String,
          required: true
    },
    interestType:{
            type: String,
            required: true
    },
    message:{
            type: String,
    }
});

const InterestForm = mongoose.models.InterestForm || mongoose.model('InterestForm', InterestFormSchema);

export default InterestForm;
