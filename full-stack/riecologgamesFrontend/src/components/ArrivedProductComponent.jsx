import React, { useState } from "react";
import { arrivedProduct } from "../services/ProductService";

const ArrivedProductComponent = () => {  
    // Aggiunto stato per raccogliere l'ID digitato dall'utente
    const [productId, setProductId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleArrived = (e) => {
        e.preventDefault(); // Previene il ricaricamento della pagina
        
        if(!productId) {
            setErrorMessage("Per favore, inserisci un ID prodotto valido.");
            setSuccessMessage('');
            return;
        }

        arrivedProduct(productId)
            .then(response => {
                setSuccessMessage('Product marked as arrived successfully!');
                setErrorMessage('');
                setProductId(''); // Svuota il campo dopo il successo
            })
            .catch(error => {
                console.error('Error marking product as arrived:', error);
                setErrorMessage('Failed to mark product as arrived. Assicurati di avere i permessi e che l\'ID esista.');
                setSuccessMessage('');
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3 p-4">
                    <h2 className="text-center">Mark Product as Arrived</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-3">
                                <label className="form-label">Product ID:</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    placeholder="Enter Product ID"
                                    value={productId}
                                    onChange={(e) => setProductId(e.target.value)}
                                />
                            </div>
                            
                            <button onClick={handleArrived} className="btn btn-primary w-100">
                                Mark as Arrived
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

export default ArrivedProductComponent;