import { minifyUrl, redirect } from "../controllers/main-controller.js";

export const routes = {
    '/api/minify': minifyUrl,
    '/:shortId': redirect,
}