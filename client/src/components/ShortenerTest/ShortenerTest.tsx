import React, { useState } from "react";

export default function ShortenerTest() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showCopy, setShowCopy] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);

    const handleShorten = async () => {
        setLoading(true);
        setError(null);
        setShortUrl(null);

        try {
            const response = await fetch(`/api/minify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Произошла ошибка");
                return;
            }

            setShortUrl(data.shortUrl);
        } catch (err) {
            setError("Сервер недоступен");
        } finally {
            setLoading(false);
        }
    };

    const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (shortUrl) await navigator.clipboard.writeText(shortUrl);
        setShowCopy(true);
        setTimeout(() => setShowCopy(false), 2000);
    }

    return (
        <section className="content">
            <h1 className="content__title">Сократи ссылку </h1>

            <input
                type="text"
                className="content__input input"
                placeholder="Введите ссылку..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            < button
                onClick={handleShorten}
                disabled={loading}
                className="content__button button"
            >
                {loading ? "Загрузка..." : "Сократить"}
            </button>

            <div className="content__result result-section">
                {
                    shortUrl && (
                        <>
                            <strong>Сокращённая ссылка: </strong>
                            < p >
                                <a href={shortUrl} onClick={handleLinkClick} target="_blank" rel="noopener noreferrer" >
                                    {shortUrl}
                                </a>
                            </p>
                        </>
                    )
                }

                {
                    error && (
                        <div className="error-message">
                            <strong>Ошибка: </strong> {error}
                        </div>
                    )
                }
            </div>

            <div className={`content__modal modal-copy ${showCopy ? 'active' : ''}`}>
                <span className="modal-copy__text">Ссылка скопирована!</span>
            </div>
        </section >
    );
}
