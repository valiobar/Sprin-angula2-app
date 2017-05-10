package com.spring.services.interfaces;


import com.spring.Domain.dto.binding.LoginAttemptModel;
import com.spring.Domain.dto.binding.RegisterUserModel;
import com.spring.Domain.dto.view.LoggedUserDataModel;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    LoggedUserDataModel get(Long id);

    LoggedUserDataModel get(String email);

    LoggedUserDataModel getByUsernameAndPassword(String email, String password);

    List<LoggedUserDataModel> getAllUsers();

    List<String> persist(RegisterUserModel registerModel);

    boolean exists(RegisterUserModel registerModel);

    LoggedUserDataModel login(LoginAttemptModel loginAttemptModel,List<String> errors);
}
