import { API_BASE_URL } from "../baseUrl.mjs";

const name = document.querySelector("#registerName");
const email = document.querySelector("#registerEmail");
const password = document.querySelector("#registerPassword");
const register_error = document.querySelector("#registerErrorMessage");

/**
 * Register a new user
 */

async function registerUser() {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify ({
                name:name.value,
                email:email.value,
                password: password.value,
            }),
    };
    try {
        const response = await fetch (`${API_BASE_URL}/api/v1/social/auth/register`, postData);
        
    }
}
