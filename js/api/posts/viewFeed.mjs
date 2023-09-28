/*import { API_BASE_URL } from "../base-url.mjs";
import { formatDate } from "./date-formatter.mjs";

/**
 * Fetches posts from API
 * @async
 * @function
 * @returns {Promise<Object[]>} - The promise resolves to an array of objects.
 * @throws - Error if network request fails / if the user is not registered.
 */

/*
async function fetchPosts() {
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("No token retrieved. User must log in to fetch posts. Redirecting to login page");
      window.location.href = "/index.html";
      return;
    }
    //Fetch post feed from API
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    console.log(token);

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error("Failed to fetch the post feed", error);
    return null;
  }
}

/**
 * Renders an array of post objects to the DOM
 * showing the posts on the page.
 * @async
 * @function
 */

/*

async function renderPosts() {
  const posts = await fetchPosts();

  if (!posts) {
    //Handle if no posts are fetched
    console.error("No posts fetched.");
    return;
  }

  //Get post contained element by ID
  const postContainer = document.getElementById("postContainer");
  if (!postContainer) return;

  //Loop through every post in the array
  posts.forEach((post) => {
    const { title, body, media, created, updated, _count } = post;

    //Create div element for a post
    const postElement = document.createElement("div");
    postElement.classList.add("post", "card", "mb-3");

    // Use formatDate function
    const createdDateString = formatDate(created);
    const updatedDateString = formatDate(updated);

    const imageHTML = media ? `<img src="${media}" alt="${title}" class="post-image card-img-top" onerror="this.style.display='none'"/>` : "";
    const bodyHTML = `
      <div class="card-body">
        <h3 class="card-title">${title}</h3>
        <p class="card-text">${body}</p>
        <p>Posted: ${createdDateString}</p>
        <p>Edited: ${updatedDateString}</p>
      </div>
      <div class="card-footer">
        <p>Comments: ${_count.comments}</p>
        <p>Reactions: ${_count.reactions}</p>
      </div>
    `;

    postElement.innerHTML = imageHTML + bodyHTML;

    postContainer.appendChild(postElement);
  });
}

renderPosts(); */
