import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
  title: String,
  video_link: String,
  description: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
export default mongoose.model('Course', courseSchema);
