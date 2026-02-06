import React, { useEffect, useState } from "react";
import { listGames } from "../services/GameService";

const ListGameComponent = () => {

    const [games, setGames] = useState([]);

    useEffect(() => {
        listGames()
            .then(response => {
                setGames(response.data);
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
                        <th>Id</th>
                        <th>Genre</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => (
                        <tr key={game.id}>
                            <td>{game.id}</td>
                            <td>{game.genre}</td>
                            <td>{game.title}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListGameComponent;
