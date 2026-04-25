import express from 'express';

import { createPost , getAllPosts , getPostById , updatePost } from '../controllerrs/postController.js';
import { checkAuthorization  } from '../controllerrs/userController.js';

const PostRouter = express.Router();


PostRouter.get('/', checkAuthorization, getAllPosts);
PostRouter.post('/', checkAuthorization, createPost);
PostRouter.get('/:id', checkAuthorization, getPostById);
PostRouter.put('/:id', checkAuthorization, updatePost);


export default PostRouter;