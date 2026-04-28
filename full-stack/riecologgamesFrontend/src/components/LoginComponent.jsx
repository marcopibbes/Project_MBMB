import React, { useState } from "react";
import { login } from "../services/AuthService";

const LoginComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ username, password })
            .then((res) => {
                localStorage.setItem("token", res.data);
                setIsLoggedIn(true);
                setErrorMessage("");
            })
            .catch((err) => {
                console.error(err);
                setErrorMessage("Credenziali errate. Riprova.");
                setIsLoggedIn(false);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card p-4">
                        {isLoggedIn ? (
                            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                                <div style={{
                                    width: '64px', height: '64px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #b142fe33, #00e5ff33)',
                                    border: '1px solid #2a2a40',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.8rem', margin: '0 auto 16px'
                                }}>
                                    🎮
                                </div>
                                <h2 className="mb-0">Bentornato, {username}!</h2>
                                <p style={{ color: '#5a5a7a', marginTop: '6px', marginBottom: '24px' }}>
                                    Sessione attiva
                                </p>
                                <button className="btn btn-danger" onClick={handleLogout}>
                                    Disconnetti
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 className="mb-0">Accedi</h2>
                                <p style={{ color: '#8888a0', fontSize: '0.95rem', marginTop: '6px' }}>
                                    Inserisci le tue credenziali
                                </p>

                                {errorMessage && (
                                    <div className="alert alert-danger mt-3">{errorMessage}</div>
                                )}

                                <form onSubmit={handleSubmit} className="mt-3">
                                    <div className="form-group mb-3">
                                        <label className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Il tuo username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="form-group mb-4">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">
                                        Accedi
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;