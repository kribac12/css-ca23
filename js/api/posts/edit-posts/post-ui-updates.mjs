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

    // Notify user.
    console.log("Post updated successfully.");
  } catch (error) {
    console.error("Error updating post:", error);
  }
}
