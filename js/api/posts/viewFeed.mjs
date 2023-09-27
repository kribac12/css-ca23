import { API_BASE_URL } from "../base-url.mjs";

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

fetchPosts();

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
    postElement.classList.add("post");

    postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
    <img src="${post.media}" alt="${post.title}"/>
    <p>Posted: ${post.created}</p>
    <p>Edited: ${post.updated}</p>
    <p>Comments: ${post._count.comments}</p>
    <p>Reactions: ${post._count.reactions}</p>
    `;

    postContainer.appendChild(postElement);
  });
}

renderPosts();
