package com.riecologgames.riecologgames.service;

import com.riecologgames.riecologgames.dto.GameDTO;
import java.util.List;  

public interface GameService {

    GameDTO createGame(GameDTO gameDTO);

    GameDTO getGameById(Long id);

    List<GameDTO> getAllGames();

    GameDTO updateGame(Long id, GameDTO gameDTO);

    void deleteGame(Long id);
    
    
}
