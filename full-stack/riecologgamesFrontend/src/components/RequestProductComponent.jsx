import React, { useState } from "react";
import { requestProduct } from "../services/ProductService";

const RequestProductComponent = () => {  
    const [targetId, setTargetId] = useState('');
    const [storeId, setStoreId] = useState(''); // Stato per lo Store ID
    const [quantity, setQuantity] = useState(1); 
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRequest = (e) => {
        e.preventDefault();
        
        // Verifica che l'utente abbia compilato entrambe le caselle di testo
        if(!targetId || !storeId) {
            setErrorMessage("Per favore, inserisci sia il Game ID che lo Store ID.");
            setSuccessMessage('');
            return;
        }

        requestProduct(targetId, quantity, storeId)
            .then(response => {
                setSuccessMessage(`Richiesta completata: ${quantity} unità ordinate per lo Store ${storeId}!`);
                setErrorMessage('');
                setTargetId(''); 
                setStoreId('');  
                setQuantity(1);  
            })
            .catch(error => {
                console.error('Error requesting product:', error);
                setErrorMessage('Errore durante la richiesta. Verifica i dati inseriti.');
                setSuccessMessage('');
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="card col-md-6 offset-md-3 p-4 shadow">
                    <h2 className="text-center mb-4">Request Product Stock</h2>
                    <div className="card-body">
                        <form onSubmit={handleRequest}>
                            
                            {/* CASELLA 1: ID del Gioco */}
                            <div className="form-group mb-3">
                                <label className="form-label fw-bold">Game ID:</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Scrivi l'ID del gioco"
                                    value={targetId}
                                    onChange={(e) => setTargetId(e.target.value)}
                                />
                            </div>

                            {/* CASELLA 2: Store ID (Quella che cercavi) */}
                            <div className="form-group mb-3">
                                <label className="form-label fw-bold">Store ID:</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Scrivi l'ID dello Store"
                                    value={storeId}
                                    onChange={(e) => setStoreId(e.target.value)}
                                />
                            </div>

                            {/* TENDINA: Quantità */}
                            <div className="form-group mb-4">
                                <label className="form-label fw-bold">Quantity:</label>
                                <select 
                                    className="form-select" 
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                >
                                    {[...Array(10).keys()].map(num => (
                                        <option key={num + 1} value={num + 1}>
                                            {num + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <button type="submit" className="btn btn-success w-100">
                                Invia Richiesta
                            </button>
                        </form>

                        {successMessage && 
                            <div className="alert alert-success mt-3">{successMessage}</div>
                        }

                        {errorMessage && 
                            <div className="alert alert-danger mt-3">{errorMessage}</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestProductComponent;