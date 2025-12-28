import { minifyUrl, redirect } from "../controllers/linkController.js";
import { home } from "../controllers/static.js";

export const routes = {
    '/': home,
    '/api/minify': minifyUrl,
    '/:shortId': redirect,
    // '/favicon.ico': favicon,
}