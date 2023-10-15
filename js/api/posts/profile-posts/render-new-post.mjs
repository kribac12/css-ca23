import { deletePost, updateLocalStorageDeleted } from "../delete-posts/delete-post.mjs";
import { toggleEditForm } from "../edit-posts/edit-post.mjs";
import { handleEditFormSubmission } from "../edit-posts/post-ui-updates.mjs";
import { createPostElement } from "../postLogic.mjs";
import { handleEditSubmit } from "../edit-posts/edit-post.mjs";
import { displayError } from "../../../utilities/error-handler.mjs";

/**
 * Function for rendering new post
 * @param {Object} paramObj - New post data.
 * @param {string} paramObj.id - The post ID.
 * @param {string} paramObj.title - The post title.
 * @param {string} paramObj.body - The post body.
 * @param {string} [paramObj.media] - The post's media URL.
 *
 * @returns{Promise<void>}
 */
export async function renderMyPost(postData) {
  try {
    const { id, title, body, media } = postData;
    const postElement = createPostElement(postData);

    // Creating elements and setting functionality
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "btn btn-primary";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-secondary m-4";

    // Creating and handling edit form and delete
    const editForm = createEditForm(title, body, media, id, handleEditSubmit);
    editButton.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleEditForm(editForm);
    });

    deleteButton.addEventListener("click", function (event) {
      event.stopPropagation();
      showDeleteModal(postData.id, postElement);
    });

    postElement.appendChild(editButton);
    postElement.appendChild(editForm);
    postElement.appendChild(deleteButton);

    const container = document.getElementById("myPostsContainer");
    container.insertBefore(postElement, container.firstChild);

    createDeleteModal(postData.id, postElement); // modal for the delete action
  } catch (error) {
    console.error("Error rendering post:", error);
    displayError(`Failed to load the post. Please try again later.`);
  }
}

/**
 * Create edit form.
 * @param {string} title - Initial title value.
 * @param {string} body - Initial body value.
 * @param {string} media - Initial media value.
 * @param {string} postId - ID of the post being updated.
 * @param {function} submitHandler - Function to handle form submission.
 * @param {HTMLElement} titleElement - Displays the post title.
 * @param {HTMLElement} bodyElement - Displays the post body.
 * @param {HTMLElement} mediaElement - Displays the post media.
 * @returns {HTMLFormElement} - The edit form created.
 */

function createEditForm(title, body, media, postId, submitHandler) {
  const editForm = document.createElement("form");
  const editTitle = document.createElement("input");
  const editBody = document.createElement("textarea");
  const editMedia = document.createElement("input");
  const saveButton = document.createElement("button");

  editTitle.type = "text";
  editTitle.name = "title";
  editTitle.value = title;
  editTitle.classList.add("post-title", "form-control");

  editBody.name = "body";
  editBody.value = body;
  editBody.classList.add("post-body", "form-control");

  editMedia.type = "url";
  editMedia.name = "media";
  editMedia.value = media || "";
  editMedia.classList.add("post-media", "form-control");

  saveButton.textContent = "Save";
  saveButton.classList.add("btn", "btn-primary");

  editForm.appendChild(editTitle);
  editForm.appendChild(editBody);
  editForm.appendChild(editMedia);
  editForm.appendChild(saveButton);
  editForm.style.display = "none";

  [editTitle, editBody, editMedia, saveButton].forEach((control) => {
    control.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  editForm.onsubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    submitHandler(event, postId, editTitle, editBody, editMedia);
  };

  return editForm;
}

/**
 * Save new post to localStorage.
 * @param {Object} newPost - New post data.
 */
export function savePost(newPost) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
}

/**
 * Create and handle delete modal.
 * @param {string} postId - ID of the post to delete.
 * @param {HTMLElement} postElement - Element of the post to delete.
 */
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

  modal.bsModal = new bootstrap.Modal(modal);

  confirmDeleteButton.onclick = async () => {
    console.log(`Trying to delete a post with ID: ${postId}`);
    try {
      await deletePost(postId);

      postElement.remove();
      updateLocalStorageDeleted(postId);
      modal.bsModal.hide();
    } catch (error) {
      console.error("There was an error deleting post:", error);
      displayError(`Failed to delete the post. Please try again later.`);
    }
  };
}

/**
 * Show the delete modal.
 * @param {string} postId - ID of the post to delete.
 */
function showDeleteModal(postId) {
  const modal = document.getElementById(`deleteModal${postId}`);

  modal.bsModal.show();
}
