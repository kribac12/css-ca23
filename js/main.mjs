import { handleCreatePostSubmission } from "./api/posts/new-posts/create-post.mjs";
import { renderMyPost } from "./api/posts/new-posts/render-new-post.mjs";

const createPostForm = document.getElementById("createPostForm");

handleCreatePostSubmission(createPostForm, async (newPost) => {
  try {
    await renderMyPost(newPost);
    console.log("New post rendered:", newPost);
  } catch (error) {
    console.error("Error rendering new post:", error);
  }
});
