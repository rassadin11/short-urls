import { createServer } from 'http';
import { routes } from './src/routes/router.js';
import 'dotenv/config'

const app = createServer(async (request, response) => {
    const parsedUrl = new URL(request.url, process.env.BASE_URL)
    request.addParsedUrl = parsedUrl
    const pathname = parsedUrl.pathname;

    if (routes[pathname]) {
        await routes[pathname](request, response);
        return;
    }

    if (routes['/:shortId']) {
        const parts = pathname.split('/').filter(item => item);

        if (parts.length === 1) {
            request.params = { shortId: parts[0] };
            await routes['/:shortId'](request, response);
            return;
        }
    }

    response.statusCode = 404;
    response.end('404');
});

app.listen(process.env.PORT || 8080);
console.log('Server is now running')