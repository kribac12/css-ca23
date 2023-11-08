import { updatePost } from "./edit-post.mjs";
import { displayError } from "../../../utilities/error-handler.mjs";

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

export async function handleEditFormSubmission(event, postId) {
  console.log("Parameters inside handleEditFormSubmission:", event, postId);
  event.preventDefault();
  const { title, body, media } = event.target.elements;

  if (!title || !body || !media) {
    console.error("Form input(s) not found:", { title, body, media });
    return;
  }
  try {
    const updatedPost = await updatePost(postId, title.value, body.value, media.value);

    updateUIWithPostData(updatedPost, title, body, media);
    updateLocalStorageWithPostData(updatedPost);

    event.target.style.display = "none";
  } catch (error) {
    console.error("Error updating post:", error);
    displayError(`Error updating post. Please try again later.`);
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

function updateUIWithPostData(updatedPost, title, body, media) {
  if (!title || !body || !media) {
    console.error("Title or body element is null:", title, body);
  }
  console.log(updatedPost);
  title.textContent = updatedPost.title;
  body.textContent = updatedPost.body;
  if (media && updatedPost.media) {
    media.src = updatedPost.media;
  } else if (!media && updatedPost.media) {
    console.error("Media element is null but post has media data:", updatedPost.media);
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
