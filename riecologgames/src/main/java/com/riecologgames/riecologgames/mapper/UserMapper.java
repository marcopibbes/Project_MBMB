package com.riecologgames.riecologgames.mapper;
import org.springframework.stereotype.Component;

import com.riecologgames.riecologgames.domainmodel.User;
import com.riecologgames.riecologgames.dto.UserDTO;

@Component
public class UserMapper {

    public UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }
        return new UserDTO(
            user.getId(),
            user.getUsername(),
            user.getRole()
        );
    }       


}
