package com.riecologgames.riecologgames.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.riecologgames.riecologgames.service.GameService;
import com.riecologgames.riecologgames.dto.GameDTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PutMapping;



@CrossOrigin("*")
@RestController
@RequestMapping("/api/games")
public class GameController {
    private final GameService gameService;
    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    // Build create Game REST API sextion
    @PostMapping("/create")
    public ResponseEntity<GameDTO> createGame(@RequestBody GameDTO gameDTO) {
        GameDTO savedGame=gameService.createGame(gameDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGame);
    }

    @GetMapping("/{id}")    
    public ResponseEntity<GameDTO> getGameById(@PathVariable Long id) {
        GameDTO gameDTO = gameService.getGameById(id);
        return ResponseEntity.ok(gameDTO);
    }  

    @GetMapping
    public ResponseEntity<List<GameDTO>> getAllGames() {
        java.util.List<GameDTO> games = gameService.getAllGames();
        return ResponseEntity.ok(games);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameDTO> updateGame(@PathVariable Long id, @RequestBody GameDTO gameDTO) {
        GameDTO updatedGame = gameService.updateGame(id, gameDTO);
        return ResponseEntity.ok(updatedGame);
    }   
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGame(@PathVariable Long id) {
        gameService.deleteGame(id);
        return ResponseEntity.ok("Game deleted successfully");
    }

}
