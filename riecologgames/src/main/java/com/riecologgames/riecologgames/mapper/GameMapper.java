package com.riecologgames.riecologgames.mapper;

import org.springframework.stereotype.Component;
import com.riecologgames.riecologgames.domainmodel.Game;
import com.riecologgames.riecologgames.dto.GameDTO;


@Component
public class GameMapper {

    public GameDTO toDTO(Game game) {
        if (game == null) {
            return null;
        }
        return new GameDTO(
            game.getId(),
            game.getTitle(),
            game.getGenre(),
            game.getPlatform(),
            game.getPrice() 
        );
    }       

    public Game toEntity(GameDTO gameDTO) {
        if (gameDTO == null) {
            return null;
        }
        return new Game(
            gameDTO.title(),
            gameDTO.genre(),
            gameDTO.platform(),
            gameDTO.price()
        );
    }

}
