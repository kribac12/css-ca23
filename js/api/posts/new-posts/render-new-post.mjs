import { deletePost, updateLocalStorageDeleted } from "../delete-posts/delete-post.mjs";
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
    const deleteButton = document.createElement("button");

    // Setting content
    titleElement.textContent = title;
    bodyElement.textContent = body;
    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";

    // Style edit and delete buttons

    editButton.className = "btn btn-primary";
    deleteButton.className = "btn btn-secondary m-4";

    // Handling media element

    const mediaElement = document.createElement("img");
    if (media) {
      mediaElement.src = media;
      postElement.appendChild(mediaElement);
    }

    // Appending child elements
    postElement.appendChild(titleElement);
    postElement.appendChild(bodyElement);

    // Creating and handling edit form and delete
    const editForm = createEditForm(newPost.title, newPost.body, newPost.media, newPost.id, handleEditFormSubmission, titleElement, bodyElement, mediaElement);
    editButton.onclick = () => toggleEditForm(editForm);
    deleteButton.onclick = () => showDeleteModal(id);

    postElement.appendChild(editButton);
    postElement.appendChild(editForm);
    postElement.appendChild(deleteButton);

    document.getElementById("myPostsContainer").appendChild(postElement);

    createDeleteModal(id, postElement); // modal for the delete action
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

function createDeleteModal(postId, postElement) {
  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.id = `deleteModal${postId}`;
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("aria-labelledby", `deleteModalLabel${postId}`);
  modal.setAttribute("aria-hidden", "true");

  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  const modalTitle = document.createElement("h5");
  modalTitle.classList.add("modal-title");
  modalTitle.id = `deleteModalLabel${postId}`;
  modalTitle.textContent = "Delete post";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  modalBody.textContent = "Are you sure you want to delete your post?";

  const modalFooter = document.createElement("div");
  modalFooter.classList.add("modal-footer");

  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.classList.add("btn", "btn-secondary");
  cancelButton.setAttribute("data-bs-dismiss", "modal");
  cancelButton.textContent = "Cancel";

  const confirmDeleteButton = document.createElement("button");
  confirmDeleteButton.type = "button";
  confirmDeleteButton.classList.add("btn", "btn-danger");
  confirmDeleteButton.id = `confirmDeleteButton${postId}`;
  confirmDeleteButton.textContent = "Delete";

  modalFooter.appendChild(cancelButton);
  modalFooter.appendChild(confirmDeleteButton);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);

  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  document.body.appendChild(modal);

  document.getElementById(`confirmDeleteButton${postId}`).onclick = async () => {
    console.log(`Trying to delete a post with ID: ${postId}`);
    try {
      await deletePost(postId);
      postElement.remove();
      updateLocalStorageDeleted(postId);
      const deleteModalElement = document.getElementById(`deleteModal${postId}`);
      const deleteModal = new bootstrap.Modal(deleteModalElement);
      console.log(deleteModal);
      deleteModal.hide();
      console.log("Your post was deleted.");
    } catch (error) {
      console.error("There was an error deleting post:", error);
    }
  };
}

function showDeleteModal(postId) {
  const deleteModal = new bootstrap.Modal(document.getElementById(`deleteModal${postId}`));
  deleteModal.show();
}
