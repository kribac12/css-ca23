import { toggleEditForm } from "../edit-posts/edit-post.mjs";
import { handleEditFormSubmission } from "../edit-posts/post-ui-updates.mjs";

export async function renderMyPost(newPost) {
  try {
    const { id, title, body, media } = newPost;

    // Creating elements
    const postElement = document.createElement("div");
    const titleElement = document.createElement("h2");
    const bodyElement = document.createElement("p");
    const editButton = document.createElement("button");

    // Setting content
    titleElement.textContent = title;
    bodyElement.textContent = body;
    editButton.textContent = "Edit";

    // Appending child elements
    postElement.appendChild(titleElement);
    postElement.appendChild(bodyElement);

    // Handling media element

    const mediaElement = document.createElement("img");
    if (media) {
      mediaElement.src = media;
      postElement.appendChild(mediaElement);
    }

    // Creating and handling edit Form
    const editForm = createEditForm(newPost.title, newPost.body, newPost.media, newPost.id, handleEditFormSubmission, titleElement, bodyElement, mediaElement);
    editButton.onclick = () => toggleEditForm(editForm);

    postElement.appendChild(editButton);
    postElement.appendChild(editForm);

    document.getElementById("myPostsContainer").appendChild(postElement);
  } catch (error) {
    console.error("Error rendering post:", error);
  }
}

function createEditForm(title, body, media, postId, submitHandler, titleElement, bodyElement, mediaElement) {
  const editForm = document.createElement("form");
  const editTitle = document.createElement("input");
  const editBody = document.createElement("textarea");
  const editMedia = document.createElement("input");
  const saveButton = document.createElement("button");

  editTitle.type = "text";
  editTitle.name = "title";
  editTitle.value = title;

  editBody.name = "body";
  editBody.value = body;

  editMedia.type = "url";
  editMedia.name = "media";
  editMedia.value = media || "";

  saveButton.textContent = "Save";

  editForm.appendChild(editTitle);
  editForm.appendChild(editBody);
  editForm.appendChild(editMedia);
  editForm.appendChild(saveButton);
  editForm.style.display = "none";

  editForm.onsubmit = (event) => submitHandler(event, postId, titleElement, bodyElement, mediaElement);

  return editForm;
}

export function savePost(newPost) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
}
