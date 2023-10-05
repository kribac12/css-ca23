import { API_BASE_URL } from "../../../utilities/base-url.mjs";

document.addEventListener("DOMContentLoaded", function () {
  const userName = localStorage.getItem("userName");
  if (userName) {
    document.getElementById("userNameDisplay").innerText = userName;
    fetchUserPosts(userName);
  } else {
    throw new Error("No token received");
  }
});

async function fetchUserPosts(userName) {
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await fetch(`${API_BASE_URL}/profiles/${userName}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const posts = await response.json();
    displayUserPosts(posts);
  } catch (error) {
    console.error("Failed to fetch posts", error);
  }
}

function displayUserPosts(posts) {
  const postsContainer = document.getElementById("userPosts");
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.innerText = `
    <h2>${post.title}</h2>
    <p>${post.body}</p>
    <img src="${post.media}" alt="${post.title}">
    <p>Created: ${new Date(post.created).toLocaleString()}</p>
    <p>Updated: ${new Date(post.updated).toLocaleString()}</p>`;
    postsContainer.appendChild(postElement);
  });
}
