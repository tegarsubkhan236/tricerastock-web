import jwtDecode from "jwt-decode";

export const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error(`Error decoding token: ${error.message}`);
        return null;
    }
};