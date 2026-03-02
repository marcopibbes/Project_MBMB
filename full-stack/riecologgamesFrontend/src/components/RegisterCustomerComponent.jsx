import React, { useState } from "react";
import { registerCustomer    } from "../services/UserService";

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

        const user = { 
            username, 
            email, 
            firstName, 
            lastName, 
            password 
        };

        registerCustomer(user)
            .then(response => {
                setSuccessMessage('User registered successfully!');
                setErrorMessage('');

                // Reset campi
                setUsername('');
                setEmail('');
                setFirstName('');
                setLastName('');
                setPassword('');
            })
            .catch(error => {
                console.error('Error registering user:', error);
                setErrorMessage('Failed to register user.');
                setSuccessMessage('');
            });
    };

    return (
        <div className="container mt-4">
            <h2>Register New User</h2>

            {successMessage && 
                <div className="alert alert-success">{successMessage}</div>
            }

            {errorMessage && 
                <div className="alert alert-danger">{errorMessage}</div>
            }

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        className="form-control"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        className="form-control"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Register
                </button>

            </form>
        </div>
    );
};

export default RegisterCustomerComponent;
