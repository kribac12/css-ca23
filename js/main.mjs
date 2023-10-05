import { handleCreatePostSubmission } from "./api/posts/new-posts/create-post.mjs";
import { renderMyPost, savePost } from "./api/posts/new-posts/render-new-post.mjs";

const createPostForm = document.getElementById("createPostForm");

handleCreatePostSubmission(createPostForm, async (newPost) => {
  try {
    await renderMyPost(newPost);
    savePost(newPost);
    console.log("New post rendered:", newPost);
  } catch (error) {
    console.error("Error rendering new post:", error);
  }
});

function renderSavedPosts(userId) {
  let savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  savedPosts.forEach((post) => renderMyPost(post));
}

renderSavedPosts();
