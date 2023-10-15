import { createPostElement } from "./postLogic.mjs";

export function renderSinglePost(post, containerId) {
  const postContainer = document.getElementById(containerId);
  if (!postContainer || !post) return;

  //Clear existing posts
  postContainer.innerHTML = "";

  postContainer.appendChild(createPostElement(post));
}

export async function renderPosts(posts, containerId) {
  const postContainer = document.getElementById(containerId);

  if (!postContainer || !posts) return;

  postContainer.innerHTML = "";

  posts.forEach((post) => {
    const postElement = createPostElement(post);
    postContainer.appendChild(postElement);
  });
}
