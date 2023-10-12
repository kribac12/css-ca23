import { commentOnPost } from "./comment-API.mjs";

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
      const comment = await commentOnPost(postId, input.value);

      const newCommentElement = createCommentElement(comment);
      const commentContainer = document.querySelector(`#post-${postId} .comments-list`);

      if (!commentContainer) {
        console.error(`No comment container found for post ${postId}`);
        console.log("Post element:", document.querySelector(`#post-${postId}`));
        console.log("HTML:", document.documentElement.innerHTML);
        return;
      }
      commentContainer.appendChild(newCommentElement);

      input.value = "";
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  });
  return form;
}

function createCommentElement(comment) {
  const commentElement = document.createElement("li");
  commentElement.innerText = comment.body;
  return commentElement;
}
