import mongoose from "mongoose";

// MongoDB main structure
const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  cellphone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
}, {
  // Automatically include createdAt and updatedAt timestamps
  timestamps: true
});

// Export the Profile model to be used in other parts of the app
export default mongoose.model("Profile", ProfileSchema);
