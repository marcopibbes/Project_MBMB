import React, { useEffect, useState } from "react";
import { listProducts } from "../services/ProductService";

const ListProductComponent = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        listProducts()
            .then(response => {
                console.log("Dati ricevuti dal backend:", response.data);
                setProducts(response.data);
            })
            .catch(error => console.error("Errore nel fetch dei prodotti:", error));
    }, []);

    const cellStyle = { padding: '12px 16px', border: 'none', color: '#ffffff' };

    return (
        <div className="container mt-5">
            <h2 style={{
                fontFamily: "'Orbitron', sans-serif",
                color: '#ffffff',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontSize: '1.75rem',
                marginBottom: '20px'
            }}>
                Inventario Prodotti
                <span style={{
                    marginLeft: '12px',
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '0.8rem',
                    color: '#cc3300',
                    fontWeight: 600,
                    border: '1px solid #cc3300',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    letterSpacing: '1px'
                }}>
                    {products.length} unità
                </span>
            </h2>

            <div style={{
                background: 'rgba(18,18,28,0.85)',
                border: '1px solid #222230',
                borderRadius: '14px',
                overflow: 'hidden'
            }}>
                <table className="table mb-0" style={{ color: '#d30808' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #2a2a3a' }}>
                            {['ID', 'Titolo', 'Piattaforma', 'Prezzo', 'Arrivato', 'Stato'].map(h => (
                                <th key={h} style={{
                                    background: '#0d0d18',
                                    color: '#ffffff',
                                    fontFamily: "'Rajdhani', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '1.2rem',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                    padding: '14px 16px',
                                    border: 'none'
                                }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{
                                    textAlign: 'center',
                                    padding: '40px',
                                    color: '#3a3a55',
                                    border: 'none'
                                }}>
                                    Nessun prodotto in inventario
                                </td>
                            </tr>
                        ) : (
                            products.map((product, i) => (
                                <tr key={product.productId} style={{
                                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                                    borderBottom: '1px solid #1a1a28',
                                    transition: 'background 0.15s ease'
                                }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(177,66,254,0.04)'}
                                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'}
                                >
                                    <td style={{ ...cellStyle, color: '#5a5a7a', fontSize: '0.9rem' }}>{product.productId}</td>
                                    <td style={{ ...cellStyle, fontWeight: 600, color: '#000000' }}>{product.gameTitle}</td>
                                    <td style={{...cellStyle, fontWeight: 600,color: '#000000'}}>{product.platform}</td>
                                    <td style={{
                                        ...cellStyle,
                                        fontFamily: "'Orbitron' sans-serif",
                                        fontSize: '1rem',
                                        color: '#000000',
                                        fontWeight: 700
                                    }}>€{product.price}</td>
                                    <td style={cellStyle}>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '3px 10px',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            letterSpacing: '1px',
                                            textTransform: 'uppercase',
                                            ...(product.isArrived
                                                ? { background: 'rgba(0, 255, 85, 0.1)', color: '#0fbb09', border: '1px solid rgba(0, 255, 64, 0.3)' }
                                                : { background: 'rgba(255,170,0,0.1)', color: '#ffaa00', border: '1px solid rgba(255,170,0,0.3)' })
                                        }}>
                                            {product.isArrived ? 'Sì' : 'In transito'}
                                        </span>
                                    </td>
                                    <td style={cellStyle}>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '3px 10px',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            letterSpacing: '1px',
                                            textTransform: 'uppercase',
                                            ...(product.isSold
                                                ? { background: 'rgba(255,0,85,0.1)', color: '#ff3366', border: '1px solid rgba(255,0,85,0.3)' }
                                                : { background: 'rgba(0, 255, 85, 0.1)', color: '#0fbb09', border: '1px solid rgba(0, 255, 64, 0.3)' })
                                        }}>
                                            {product.isSold ? 'Venduto' : 'Non Venduto'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListProductComponent;