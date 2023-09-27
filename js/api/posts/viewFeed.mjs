import { API_BASE_URL } from "../base-url.mjs";
import { formatDate } from "./date-formatter.mjs";

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
    //Create div element for a single post
    const postElement = document.createElement("div");
    postElement.classList.add("post", "card", "mb-3");

    let imageHTML = "";
    if (post.media) {
      imageHTML = `
        <img src="${post.media} class="post-image card-img-top img-fluid" alt="${post.title}" onerror="this.style.display='none'"/>`;
    }

    // Use formatDate function
    const createdDateString = formatDate(post.created);
    const updatedDateString = formatDate(post.updated);

    postElement.innerHTML = `
    ${imageHTML}
    <div class="card-body ps-3">
    <h3 class="card-title">${post.title}</h3>
    <p class="card-text">${post.body}</p>
    </div>
    <div class="card-footer text-muted">
    <p>Posted: ${createdDateString}</p>
    <p>Edited: ${updatedDateString}</p>
    <p>Comments: ${post._count.comments} | Reactions: ${post._count.reactions}</p>
    </div>
    `;

    postContainer.appendChild(postElement);
  });
}

renderPosts();
