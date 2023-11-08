import { displayError } from "../../../utilities/error-handler.mjs";
import { makeApiRequest } from "../../api-service.mjs";

/**
 * Create new post by sending POST request to the API.
 *
 * @async
 * @function
 * @param {string} title - Post title.
 * @param {string} body - Post body content.
 * @param {string} media - Post media content.
 * @returns {Promise<Object>} - Promise that resolves with the created post.
 *
 * @example
 * createPost('Post title', 'This is the post's content.', 'mediaurl')
 */

export async function createPost(title, body, media) {
  try {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      throw new Error("Token not found");
    }

    const postData = { title, body, media };
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
    };

    const newPost = await makeApiRequest(`/posts`, "POST", postData, headers);
    return newPost;
  } catch (error) {
    console.error("Failed creating post:", error);
    displayError(`Failed to create post. Please try again later.`);
    throw error;
  }
}

/**
 * Adds event listener to form element to handle post submission.
 * When submitted, the `createPost` function is called with form data,
 * and if successful, `onPostCreated` callback is executed.
 *
 * @async
 * @function
 * @param {HTMLFormElement} formElement - Form element to which the submit event listener is attached.
 * @param {function(Object):void} onPostCreated - Callback function after success.
 *
 * @example
 * const form = document.getElementById('createPostForm');
 * const onPostCreated = (newPost) => {
 * };
 * handleCreatePostSubmission(form, onPostCreated);
 */
export async function handleCreatePostSubmission(formElement, onPostCreated) {
  formElement.addEventListener("submit", async function (event) {
    event.preventDefault();

    const { title, body, media } = event.target.elements;

    try {
      const newPost = await createPost(title.value, body.value, media.value);

      if (typeof onPostCreated === "function") {
        onPostCreated(newPost);
        formElement.reset();
      }
    } catch (error) {
      console.error("Error:", error);
      displayError(`Failed to create the post. Please try again later.`);
    }
  });
}
