import { makeApiRequest } from "../../api-service.mjs";
import { displayError } from "../../../utilities/error-handler.mjs";

export async function fetchUserPosts(userName) {
  try {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("No authentication token found");
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const posts = await makeApiRequest(`/profiles/${userName}/posts?_author=true&_comments=true&_reactions=true`, "GET", null, headers);
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts", error);
    displayError(`Failed to load the posts. Please try again later.`);
  }
}
