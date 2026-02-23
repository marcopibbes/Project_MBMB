import React, { useEffect, useState } from "react";
import { createGame } from "../services/GameService";

const GameComponent = () => {  
    const [title, setTitle] = useState('')
    const [genre, setGenre] = useState('')
    const [price, setPrice] = useState(0)
    const [platform, setPlatform] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const game = { title, genre, price, platform };
        createGame(game)
            .then(response => {
                setSuccessMessage('Game created successfully!');
            
                setTitle('');
                setGenre('');
                setPrice(0);
                setPlatform('');
            })
            .catch(error => {
                console.error('Error creating game:', error);
                setErrorMessage('Failed to SEX game.');
                setSuccessMessage('');
            });
    };
    
    return (
        <div className="container mt-4">
            <h2>Create New Game</h2>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>
                 <div className="form-group">
                    <label htmlFor="platform">Platform</label>
                    <input
                        type="text"
                        id="platform"
                        className="form-control"
                        value={platform}
                        onChange={e => setPlatform(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre</label>
                    <input
                        type="text"
                        id="genre"
                        className="form-control"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        className="form-control"
                        value={price}
                        onChange={e => setPrice(parseFloat(e.target.value))}
                        min="0"
                        step="0.01"
                        required
                    />
                    
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Save
                </button>
            </form>
        </div>
    );
}
    
export default GameComponent;