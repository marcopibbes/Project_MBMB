package com.riecologgames.riecologgames.service.impl;

import org.springframework.stereotype.Service;
import java.util.List;

import com.riecologgames.riecologgames.dto.GameDTO;
import com.riecologgames.riecologgames.repository.GameRepository;
import com.riecologgames.riecologgames.service.GameService; 
import com.riecologgames.riecologgames.mapper.GameMapper;
import com.riecologgames.riecologgames.domainmodel.Game;


@Service
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;
    private final GameMapper gameMapper;


    public GameServiceImpl(GameRepository gameRepository , GameMapper gameMapper    ) {
        this.gameRepository = gameRepository;
        this.gameMapper = gameMapper;  
    }   
    
    @Override
    public GameDTO createGame(GameDTO gameDTO) {
        Game game = gameMapper.toEntity(gameDTO);
        Game savedGame = gameRepository.save(game);
        return gameMapper.toDTO(savedGame);
    }


    @Override
    public GameDTO getGameById(Long id) {  
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + id));
        return gameMapper.toDTO(game);
    } 

    @Override
    public List<GameDTO> getAllGames() {
      
        List<Game> games = gameRepository.findAll();
        return games.stream().map(gameMapper::toDTO).toList();
        

    }

    @Override
    public GameDTO updateGame(Long id, GameDTO gameDTO) {

        Game existingGame = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found with id: " + id));
        
        existingGame.setTitle(gameDTO.title());
        existingGame.setGenre(gameDTO.genre());
        existingGame.setPlatform(gameDTO.platform());
        existingGame.setPrice(gameDTO.price());

        Game updatedGame = gameRepository.save(existingGame);
        return gameMapper.toDTO(updatedGame);

    }

    @Override
    public void deleteGame(Long id) {
        Game existingGame = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found with id: " +id));
        gameRepository.delete(existingGame);
    }
    
  
}
