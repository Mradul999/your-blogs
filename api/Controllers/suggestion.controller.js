import Suggestion from "../Models/suggestion.model.js";

export const createSuggestion = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const suggestion=await Suggestion.findOne({email});
    if(suggestion){
        return res.status(400).json({
            success: false,
            message: "You have already submitted a suggestion with this email",
        });
    }
    const newSuggestion = new Suggestion({ name, email, message });
    await newSuggestion.save();
    res.status(201).json({ success: true, data: newSuggestion });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
