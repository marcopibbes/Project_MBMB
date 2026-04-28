import React, { useState } from "react";
import { registerCustomer } from "../services/UserService";

const RegisterCustomerComponent = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = { username, email, firstName, lastName, password };

        registerCustomer(user)
            .then(() => {
                setSuccessMessage('Account creato con successo!');
                setErrorMessage('');
                setUsername(''); setEmail(''); setFirstName(''); setLastName(''); setPassword('');
            })
            .catch(error => {
                console.error('Error registering user:', error);
                setErrorMessage('Registrazione fallita. Riprova.');
                setSuccessMessage('');
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <h2 className="mb-0">Nuovo Account</h2>

                        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

                        <form onSubmit={handleSubmit} className="mt-3">
                            <div className="form-group mb-3">
                                <label className="form-label" htmlFor="username">Username</label>
                                <input type="text" id="username" className="form-control"
                                    placeholder="es. DarkLoL98"
                                    value={username} onChange={e => setUsername(e.target.value)} required />
                            </div>

                            <div className="form-group mb-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input type="email" id="email" className="form-control"
                                    placeholder="alattucci@virgilio.it"
                                    value={email} onChange={e => setEmail(e.target.value)} required />
                            </div>

                            <div className="row mb-3">
                                <div className="col form-group">
                                    <label className="form-label" htmlFor="firstName">Nome</label>
                                    <input type="text" id="firstName" className="form-control"
                                        placeholder="Alessio"
                                        value={firstName} onChange={e => setFirstName(e.target.value)} required />
                                </div>
                                <div className="col form-group">
                                    <label className="form-label" htmlFor="lastName">Cognome</label>
                                    <input type="text" id="lastName" className="form-control"
                                        placeholder="Ebani"
                                        value={lastName} onChange={e => setLastName(e.target.value)} required />
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label" htmlFor="password">Password</label>
                                <input type="password" id="password" className="form-control"
                                    placeholder="••••••••"
                                    value={password} onChange={e => setPassword(e.target.value)} required />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Crea Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterCustomerComponent;