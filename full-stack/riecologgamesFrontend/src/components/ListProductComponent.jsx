import React, { useEffect, useState } from "react";
import { listProducts } from "../services/ProductService";

const ListProductComponent = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        listProducts()
            .then(response => {
                // AGGIUNGI QUESTA RIGA PER VEDERE I DATI REALI
                console.log("Dati ricevuti dal backend:", response.data); 
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Errore nel fetch dei giochi:", error);
            });
    }, []);

    return (
        <div>
            <h1>SELECT DISHTINCT * GAMES FROM GAMES WHEAR GAMES</h1>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Id Prodotto</th>
                        <th>Titolo</th>
                        <th>Piattaforma</th>
                        <th>Prezzo</th>
                        <th>Arrivato</th>
                        <th>Venduto</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td>{product.gameTitle}</td>
                            <td>{product.platform}</td>
                            <td>{product.price}$</td>
                                     
                        {/* 4. Corretto: Uso isArrived e lo trasformo in testo */}
                        <td>{product.isArrived ? "Sì" : "No"}</td> 
                        
                        {/* 5. Supponendo che il backend usi "isSold" per il venduto */}
                        <td>{product.isSold ? "Venduto" : "Disponibile"}</td> 
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListProductComponent;