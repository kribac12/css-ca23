import { handleCreatePostSubmission } from "./api/posts/new-posts/create-post.mjs";
import { renderMyPost, savePost } from "./api/posts/new-posts/render-new-post.mjs";
import { fetchUserPosts } from "./api/posts/profile-posts/fetch-user-posts.mjs";
import "./api/login_signup/logout.mjs";

const createPostForm = document.getElementById("createPostForm");

document.addEventListener("DOMContentLoaded", async function () {
  const userNameElement = document.getElementById("userName");
  const userName = localStorage.getItem("userName");
  if (userName) {
    await renderSavedPosts(userName);
    userNameElement.innerText = userName;
  } else {
    throw new Error("No token received");
  }
});

handleCreatePostSubmission(createPostForm, async (newPost) => {
  try {
    await renderMyPost(newPost);
    savePost(newPost);
    console.log("New post rendered:", newPost);
  } catch (error) {
    console.error("Error rendering new post:", error);
  }
});

async function renderSavedPosts(userId) {
  const savedPosts = await fetchUserPosts(userId);
  savedPosts.forEach((post) => renderMyPost(post));
}
