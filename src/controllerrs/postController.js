import  PostModel  from "../models/postModel.js";


export const getAllPosts = async (req, res) => {
    try {

        console.log(req.user.id)
        const posts = await PostModel.find({ userId: req.user.id }).populate({
            path: 'userId',
            select: '_id email username'
        });
        res.status(200).json({ posts });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Lỗi khi fetching bài viết !' });
    }
};

export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        console.log(req.user)
        const newPost = new PostModel({ content, userId: req.user.id });
        await newPost.save();
        res.status(201).json({ message: 'Bài viết đã được tạo thành công', post: newPost });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tạo bài viết !' });
    }
}

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostModel.findOne({ _id: id, userId: req.user.id }).populate({
            path: 'userId',
            select: '_id email username'
        });
        if (!post) {
            return res.status(404).json({ message: 'Bài viết không tồn tại !' });
        }
        res.status(200).json({ post });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi fetching bài viết !' });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const post = await PostModel.findOneAndReplace({ _id: id, userId: req.user.id }, { content , userId: req.user.id }, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Bài viết không tồn tại !' });
        }
        res.status(200).json({ message: 'Bài viết đã được cập nhật !', post });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Lỗi khi cập nhật bài viết !' });
    }
}