import db from '../db/database.js'

export const findByOriginalUrl = (url) => {
    return db.prepare('SELECT * FROM links WHERE originalUrl = ?').get(url);
};

export const findByShortId = (shortId) => {
    return db.prepare('SELECT * FROM links WHERE shortId = ?').get(shortId);
};

export const createLink = (originalUrl, shortId) => {
    const stmt = db.prepare(`
    INSERT INTO links (originalUrl, shortId)
    VALUES (?, ?)
  `);
    stmt.run(originalUrl, shortId);

    return findByShortId(shortId);
};

export const incrementClicks = (shortId) => {
    db.prepare('UPDATE links SET clicks = clicks + 1 WHERE shortId = ?')
        .run(shortId);
};

export const removeLink = (id) => {
    db.prepare('DELETE FROM links WHERE id = ?').run(id)
}

export const printAllLinks = () => {
    const rows = db.prepare('SELECT * FROM links').all();
    console.log(rows);
};