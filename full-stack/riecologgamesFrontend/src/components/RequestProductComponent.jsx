import React, { useState } from "react";
import { requestProduct } from "../services/ProductService";

const RequestProductComponent = () => {
    const [targetId, setTargetId] = useState('');
    const [storeId, setStoreId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRequest = (e) => {
        e.preventDefault();

        if (!targetId || !storeId) {
            setErrorMessage("Inserisci sia il Game ID che lo Store ID.");
            setSuccessMessage('');
            return;
        }

        requestProduct(targetId, quantity, storeId)
            .then(() => {
                setSuccessMessage(`Richiesta inviata: ${quantity} unità ordinate per lo Store #${storeId}.`);
                setErrorMessage('');
                setTargetId(''); setStoreId(''); setQuantity(1);
            })
            .catch(error => {
                console.error('Error requesting product:', error);
                setErrorMessage('Errore durante la richiesta. Verifica i dati inseriti.');
                setSuccessMessage('');
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <h2 className="mb-0">Richiedi Stock</h2>
                        <p style={{ color: '#8888a0', fontSize: '0.95rem', marginTop: '6px' }}>
                            Ordina unità di un gioco per un negozio
                        </p>

                        <form onSubmit={handleRequest} className="mt-2">
                            <div className="form-group mb-3">
                                <label className="form-label">Game ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Es. 42"
                                    value={targetId}
                                    onChange={(e) => setTargetId(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label">Store ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Es. 7"
                                    value={storeId}
                                    onChange={(e) => setStoreId(e.target.value)}
                                />
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label">Quantità</label>
                                <select
                                    className="form-select"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                >
                                    {[...Array(10).keys()].map(num => (
                                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Invia Richiesta
                            </button>
                        </form>

                        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestProductComponent;