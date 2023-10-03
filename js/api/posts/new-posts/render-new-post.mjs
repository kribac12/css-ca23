export async function renderMyPost(newPost) {
  try {
    const { title, body, media } = newPost;

    const postElement = document.createElement("div");
    const titleElement = document.createElement("h2");
    const bodyElement = document.createElement("p");
    const mediaElement = document.createElement("img");

    titleElement.textContent = title;
    bodyElement.textContent = body;
    if (media) mediaElement.src = media;

    postElement.appendChild(titleElement);
    postElement.appendChild(bodyElement);
    postElement.appendChild(mediaElement);

    document.getElementById("myPostsContainer").appendChild(postElement);
  } catch (error) {
    console.error("Error rendering post:", error);
  }
}

export function savePost(newPost) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));
}
