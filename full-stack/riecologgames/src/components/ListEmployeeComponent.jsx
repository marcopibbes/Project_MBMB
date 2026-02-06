import React, {useEffect, useState} from 'react'

const ListEmployeeComponent = () => {

   const [games,setGames] = useState([])
   useEffect(() => {

    listGames().then((response) => {
        setGames(response.data);
        console.log(response.data);
    }).catch((error) => {
        console.log(error);
    })

   }, [])

  return (
    <div>
        <h2>Game List</h2>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    games.map(
                        game =>
                        <tr key = {game.id}>
                            <td>{game.title}</td>
                            <td>{game.genre}</td>
                            <td>{game.price}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>


    </div>
  )
}

export default ListEmployeeComponent