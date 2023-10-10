import { updatePost } from "./edit-post.mjs";

/**
 * Handles form submission for editing a post.
 *
 * Prevents default form submission event, sends update
 * request for post using data from the form, updates UI to show changes,
 * updates the post data in local storage.
 *
 * @async
 * @function
 * @param {Event} event - Form submission event.
 * @param {string} postId - ID of post to be updated
 * @param {HTMLElement} titleElement - Displays the post's title.
 * @param {HTMLElement} bodyElement - Displays the post's body.
 * @param {HTMLImageElement} mediaElement - Displays the post's media.
 * @returns {void}
 * @throws {Error}
 */

export async function handleEditFormSubmission(event, postId, titleElement, bodyElement, mediaElement) {
  event.preventDefault();
  const { title, body, media } = event.target.elements;

  try {
    const updatedPost = await updatePost(postId, title.value, body.value, media.value);
    console.log(updatedPost);

    updateUIWithPostData(updatedPost, titleElement, bodyElement, mediaElement);
    updateLocalStorageWithPostData(updatedPost);

    console.log("Post updated successfully.");

    event.target.style.display = "none";
  } catch (error) {
    console.error("Error updating post:", error);
  }
}

/**
 * Updates UI with post data.
 * @param {*} updatedPost - Updated post data.
 * @param {*} titleElement - Displays title.
 * @param {*} bodyElement - Displays body content.
 * @param {*} mediaElement - Displays image content.
 * @returns {void}
 */

function updateUIWithPostData(updatedPost, titleElement, bodyElement, mediaElement) {
  titleElement.textContent = updatedPost.title;
  bodyElement.textContent = updatedPost.body;
  if (updatedPost.media) {
    mediaElement.src = updatedPost.media;
  }
}

/**
 * Updates local storage with post data.
 *
 * @function
 * @param {*} updatedPost - The updated post data.
 * @returns {void}
 */
function updateLocalStorageWithPostData(updatedPost) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const postIndex = posts.findIndex((p) => p.id === updatedPost.id);
  if (postIndex !== -1) {
    posts[postIndex] = updatedPost;
    localStorage.setItem("posts", JSON.stringify(posts));
  }
}
