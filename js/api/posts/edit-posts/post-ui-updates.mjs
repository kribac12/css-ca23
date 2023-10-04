import { updatePost } from "./edit-post.mjs";

export async function handleEditFormSubmission(event, postId, titleElement, bodyElement, mediaElement) {
  event.preventDefault();
  const { title, body, media } = event.target.elements;

  try {
    const updatedPost = await updatePost(postId, title.value, body.value, media.value);
    console.log(updatedPost);
    // Update UI.
    console.log(titleElement);
    titleElement.textContent = updatedPost.title;
    console.log(titleElement);
    bodyElement.textContent = updatedPost.body;
    if (updatedPost.media) {
      mediaElement.src = updatedPost.media;
    }

    console.log("Post updated successfully.");

    // Local Storage update

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    const postIndex = posts.findIndex((p) => p.id === updatedPost.id);
    if (postIndex !== -1) {
      posts[postIndex] = updatedPost;
      localStorage.setItem("posts", JSON.stringify(posts));
    }

    event.target.style.display = "none";
  } catch (error) {
    console.error("Error updating post:", error);
  }
}
