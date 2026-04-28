import React, { useState } from "react";
import { createGame } from "../services/GameService";

const GameComponent = () => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [price, setPrice] = useState(0);
    const [platform, setPlatform] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const game = { title, genre, price, platform };

        createGame(game)
            .then(() => {
                setSuccessMessage(`"${title}" aggiunto al catalogo!`);
                setErrorMessage('');
                setTitle(''); setGenre(''); setPrice(0); setPlatform('');
            })
            .catch(error => {
                console.error('Error creating game:', error);
                setErrorMessage('Errore durante la creazione del gioco.');
                setSuccessMessage('');
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <h2 className="mb-0">Aggiungi Gioco</h2>
                        <p style={{ color: '#8888a0', fontSize: '0.95rem', marginTop: '6px' }}>
                            Inserisci un nuovo titolo nel catalogo
                        </p>

                        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

                        <form onSubmit={handleSubmit} className="mt-2">
                            <div className="form-group mb-3">
                                <label className="form-label" htmlFor="title">Titolo</label>
                                <input type="text" id="title" className="form-control"
                                    placeholder="Es. The Ganjeros of Riecolog: Ultimate Arena"
                                    value={title} onChange={e => setTitle(e.target.value)} required />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label" htmlFor="platform">Piattaforma</label>
                                <input type="text" id="platform" className="form-control"
                                    placeholder="Es. Wii, NDS, 3DS, PS4"
                                    value={platform} onChange={e => setPlatform(e.target.value)} required />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label" htmlFor="genre">Genere</label>
                                <input type="text" id="genre" className="form-control"
                                    placeholder="Es. Action RPG"
                                    value={genre} onChange={e => setGenre(e.target.value)} required />
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="price">Prezzo (€)</label>
                                <input type="number" id="price" className="form-control"
                                    value={price}
                                    onChange={e => setPrice(parseFloat(e.target.value))}
                                    min="0" step="0.01" required />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Salva Gioco
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameComponent;