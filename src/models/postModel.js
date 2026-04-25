import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User-Test',
        required: true,
    },
}, { timestamps: true });   

const PostModel = mongoose.model('Post-Test', postSchema);


export default PostModel;