import mongoose from "mongoose";
const suggestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Suggestion = mongoose.model("Suggestion", suggestionSchema);
export default Suggestion;
