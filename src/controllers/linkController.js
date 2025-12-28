import { nanoid } from 'nanoid';
import validUrl from 'valid-url';
import { findByOriginalUrl, findByShortId, createLink, incrementClicks, removeLink, printAllLinks } from '../models/linkModel.js';
import { parseJsonBody } from '../utils.js'

export const minifyUrl = async (req, res) => {
    try {
        const body = await parseJsonBody(req);
        const { url } = body;

        if (!url || !validUrl.isWebUri(url)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Invalid URL' }));
            return;
        }

        const existing = findByOriginalUrl(url);
        if (existing) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                shortUrl: `${process.env.BASE_URL}/${existing.shortId}`
            }));
            return;
        }

        let shortId;
        do {
            shortId = nanoid(8);
        } while (findByShortId(shortId));

        createLink(url, shortId);

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            shortUrl: `${process.env.BASE_URL}/${shortId}`
        }));
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Server error' }));
        console.error(err);
    }
};

export const redirect = (req, res) => {
    const { shortId } = req.params;
    const link = findByShortId(shortId);

    printAllLinks();

    if (link) {
        const timeFromCreation = (new Date() - new Date(link.createdAt + 'Z')) / 1000
        if (timeFromCreation > 600) {
            removeLink(link.id)
            res.statusCode = 302;
            res.setHeader('Location', `http://localhost:5173/expired`);
            res.end();
        } else {
            incrementClicks(shortId);
            res.statusCode = 302;
            res.setHeader('Location', link.originalUrl);
            res.end();
        }
    } else {
        res.statusCode = 302;
        res.setHeader('Location', `http://localhost:5173/no-page`);
        res.end();
    }
}