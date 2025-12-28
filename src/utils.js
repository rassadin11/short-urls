export function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
        let raw = '';

        req.on('data', chunk => {
            raw += chunk;
        });

        req.on('end', () => {
            if (!raw) {
                resolve({});
                return;
            }

            try {
                resolve(JSON.parse(raw));
            } catch (err) {
                reject(err);
            }
        });

        req.on('error', reject);
    });
}

export function matchRoute(req, parsedUrl, routes) {
    for (const route of routes) {
        if (route.method !== req.method) continue;

        const routeParts = route.path.split('/').filter(item => item);
        const urlParts = parsedUrl.pathname.split('/').filter(item => item);

        if (routeParts.length !== urlParts.length) continue;

        const params = {};
        let matched = true;

        for (let i = 0; i < routeParts.length; i++) {
            const rp = routeParts[i];
            const up = urlParts[i];

            if (rp.startsWith(':')) {
                params[rp.slice(1)] = up;
            } else if (rp !== up) {
                matched = false;
                break;
            }
        }

        if (matched) {
            return { handler: route.handler, params };
        }
    }

    return null;
}
