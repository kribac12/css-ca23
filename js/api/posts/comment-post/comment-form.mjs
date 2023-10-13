import { commentOnPost } from "./comment-API.mjs";
import { createCommentElement } from "./comment-element.mjs";
import { displayError } from "../../../utilities/error-handler.mjs";

/**
 * Creates and returns comment form element.
 * Attaches event listener to handle comment posting.
 *
 * @function
 * @export
 * @param {string} postId - Id of the post to create the comment form.
 * @returns {HTMLFormElement} Form element to be appended to the DOM.
 * @example
 *
 * ```js
 * const commentForm = createCommentForm('hellohello');
 * document.querySelector('#comment-section').appendChild(commentForm);
 * ```
 */
export function createCommentForm(postId) {
  const form = document.createElement("form");
  const input = document.createElement("input");
  input.type = "text";
  input.name = "comment";
  input.placeholder = "Add a comment...";
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.innerText = "Post comment";

  form.appendChild(input);
  form.appendChild(submit);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const { value: commentText } = input;
      const comment = await commentOnPost(postId, commentText);

      const newCommentElement = createCommentElement(comment);
      const commentContainer = document.querySelector(`#post-${postId} .comments-list`);

      if (!commentContainer) {
        console.error(`No comment container found for post ${postId}`);
        return;
      }
      commentContainer.appendChild(newCommentElement);

      input.value = "";
    } catch (error) {
      console.error("Failed to post comment", error);
      displayError(`Failed to post comment. Please try again later.`);
    }
  });
  return form;
}
