import React, { useState } from "react";
import { arrivedProduct } from "../services/ProductService";

const ArrivedProductComponent = () => {
    const [productId, setProductId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleArrived = (e) => {
        e.preventDefault();

        if (!productId) {
            setErrorMessage("Inserisci un ID prodotto valido.");
            setSuccessMessage('');
            return;
        }

        arrivedProduct(productId)
            .then(() => {
                setSuccessMessage('Prodotto segnato come arrivato in magazzino!');
                setErrorMessage('');
                setProductId('');
            })
            .catch(error => {
                console.error('Error marking product as arrived:', error);
                setErrorMessage('Impossibile aggiornare il prodotto. Verifica permessi e ID.');
                setSuccessMessage('');
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <h2 className="mb-0">Arrivo Merce</h2>
                        <p style={{ color: '#8888a0', fontSize: '0.95rem', marginTop: '6px' }}>
                            Registra l'arrivo di un prodotto in magazzino
                        </p>

                        <form onSubmit={handleArrived} className="mt-2">
                            <div className="form-group mb-4">
                                <label className="form-label">Codice Prodotto (ID)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Es. 1042"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Conferma Arrivo
                            </button>
                        </form>

                        {successMessage && <div className="alert alert-success mt-4">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger mt-4">{errorMessage}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArrivedProductComponent;