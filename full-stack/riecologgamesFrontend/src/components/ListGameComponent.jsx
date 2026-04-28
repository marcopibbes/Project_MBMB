import React, { useEffect, useState } from "react";
import { listGames } from "../services/GameService";

const ListGameComponent = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        listGames()
            .then(response => setGames(response.data))
            .catch(error => console.error("Errore nel fetch dei giochi:", error));
    }, []);

    return (
        <div className="container mt-5">
            <h2 style={{
                fontFamily: "'Orbitron', sans-serif",
                color: '#fff',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontSize: '1.75rem',
                marginBottom: '20px'
            }}>
                Catalogo Giochi
                <span style={{
                    marginLeft: '12px',
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#cc3300',
                    
                    border: '1px solid #cc3300',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    letterSpacing: '1px'
                }}>
                    {games.length} titoli
                </span>
            </h2>

            <div style={{
                background: 'rgba(18,18,28,0.85)',
                border: '1px solid #222230',
                borderRadius: '14px',
                overflow: 'hidden'
            }}>
                <table className="table mb-0" style={{ color: '#e0e0e0' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #2a2a3a' }}>
                            {['ID', 'Titolo', 'Genere', 'Piattaforma', 'Prezzo'].map(h => (
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
                        {games.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{
                                    textAlign: 'center',
                                    padding: '40px',
                                    color: '#3a3a55',
                                    border: 'none'
                                }}>
                                    Nessun gioco nel catalogo
                                </td>
                            </tr>
                        ) : (
                            games.map((game, i) => (
                                <tr key={game.id} style={{
                                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                                    borderBottom: '1px solid #1a1a28',
                                    transition: 'background 0.15s ease'
                                }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,229,255,0.04)'}
                                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'}
                                >
                                    <td style={{ padding: '12px 16px', border: 'none', color: '#5a5a7a', fontSize: '0.9rem' }}>{game.id}</td>
                                    <td style={{ padding: '12px 16px', border: 'none', fontWeight: 600, color: '#000000' }}>{game.title}</td>
                                    <td style={{ padding: '12px 16px', border: 'none', color: '#000000' }}>{game.genre}</td>
                                    <td style={{ padding: '12px 16px', border: 'none',fontWeight: 600, color: '#000000' }}>{game.platform}</td>
                                    <td style={{
                                        padding: '12px 16px', border: 'none',
                                        fontFamily: " sans-serif",
                                        fontSize: '1rem',
                                        color: '#000000',
                                        fontWeight: 700
                                    }}>€{game.price}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListGameComponent;