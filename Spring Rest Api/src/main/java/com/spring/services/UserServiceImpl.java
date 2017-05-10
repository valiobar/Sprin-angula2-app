package com.spring.services;


import com.spring.Domain.Entities.Role;
import com.spring.Domain.Entities.AuthorityName;
import com.spring.Domain.Entities.Port;
import com.spring.Domain.Entities.User;
import com.spring.Domain.dto.binding.LoginAttemptModel;
import com.spring.Domain.dto.binding.RegisterUserModel;
import com.spring.Domain.dto.view.LoggedUserDataModel;
import com.spring.Domain.repository.AuthorityRepository;
import com.spring.Domain.repository.PortRepository;
import com.spring.Domain.repository.UserRepository;

import com.spring.services.interfaces.UserService;
import com.spring.utils.modelParser.ModelParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private PortRepository portRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthorityRepository authorityRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private ModelParser modelParser;

    @Override
    public LoggedUserDataModel get(Long id) {

        User user = this.userRepository.findOne(id);
        LoggedUserDataModel loggedUser = null;
        if (user != null) {
            loggedUser = modelParser.convert(user, LoggedUserDataModel.class);
        }
        return loggedUser;
    }

    @Override
    public LoggedUserDataModel get(String userName) {
        User user = this.userRepository.findOneByUsername(userName);
        LoggedUserDataModel loggedUser = null;
        if (user != null) {
            loggedUser = modelParser.convert(user, LoggedUserDataModel.class);
        }

        return loggedUser;
    }

    @Override
    public LoggedUserDataModel getByUsernameAndPassword(String username, String password) {
        User user = this.userRepository.getOneByEmailAndPassword(username, password);
        LoggedUserDataModel loggedUser = null;
        if (user != null) {
            loggedUser = modelParser.convert(user, LoggedUserDataModel.class);

        }
        return loggedUser;
    }

    @Override
    public List<LoggedUserDataModel> getAllUsers() {
        List<User> users = this.userRepository.findAll();
        List<LoggedUserDataModel> loggedUserDataModels = new ArrayList<>();
        for (User user : users) {
            loggedUserDataModels.add(modelParser.convert(user, LoggedUserDataModel.class));
        }

        return loggedUserDataModels;
    }

    @Override
    public List<String> persist(RegisterUserModel registerModel) {
        List<String> errors = new ArrayList<>();
        String username = registerModel.getUsername();
        String email = registerModel.getEmail();
        String password = registerModel.getPassword();
        Port port =null;
        if(registerModel.getPortName()!=null){
             port=this.portRepository.findOneByName(registerModel.getPortName());
        }

        String confirmPassword = registerModel.getConfirmPassword();

        if (username == null) {
            errors.add("Name field was left empty");
        } else if (username.length() < 5 || username.length() > 50) {
            errors.add("Name must be between 5 and 50 chars");
        }
        if (email == null) {
            errors.add("Email field was left empty");
        } else if (!email.contains("@") || !email.split("@")[1].contains(".")) {
            errors.add("Invalid Email type");
        } else if (!this.exists(registerModel)) {
            errors.add("Email is already in use. ");
        }

        String capitalLetterPattern = ".*[A-Z]+.*";
        String smallLetterPattern = ".*[a-z]+.*";
        String digitPattern = ".*\\d+.*";
        Pattern smallLetter = Pattern.compile(smallLetterPattern);
        Pattern capitalLetter = Pattern.compile(capitalLetterPattern);
        Pattern digit = Pattern.compile(digitPattern);
        Matcher smallLetterMatcher = smallLetter.matcher(password);
        Matcher capitalLetterMatcher = capitalLetter.matcher(password);
        Matcher digitMatcher = digit.matcher(password);

        if (password == null || confirmPassword == null) {
            errors.add("Some password fields were left empty");
        }
        if (!password.equals(confirmPassword)) {
            errors.add("Passwords are not matching");
        }
        if (password.length() < 6) {
            errors.add("Password must be at least 6 symbols ");
        }
        if (!smallLetterMatcher.find()) {
            errors.add("Password must be contains at least one of  small letter");
        }
        if (!capitalLetterMatcher.find()) {
            errors.add("Password must be contains at least one cappital latetr");
        }
        if (!digitMatcher.find()) {
            errors.add("Password must be contains at least one digit");
        }


        if (errors.size() == 0) {
            Role authority = this.authorityRepository.findOneByName(AuthorityName.ROLE_USER);
            registerModel.setPassword(bCryptPasswordEncoder.encode(registerModel.getPassword()));
            User newUser = modelParser.convert(registerModel, User.class);
            newUser.getAuthorities().add(authority);
            if(port!=null){
                newUser.setPort(port);
            }
            this.userRepository.save(newUser);
            return errors;
        } else {
            return errors;
        }

    }

    @Override
    public boolean exists(RegisterUserModel registerModel) {
        User user = this.userRepository.getOneByEmail(registerModel.getEmail());
        boolean result = (user == null);
        return result;
    }

    @Override
    public LoggedUserDataModel login(LoginAttemptModel loginAttemptModel, List<String> errors) {


        String username = loginAttemptModel.getUsername();
        String password = loginAttemptModel.getPassword();

        LoggedUserDataModel loggedUser = null;
        if (username == null || password == null) {
            errors.add("A field was left empty");
        } else {
            loggedUser = this.getByUsernameAndPassword(username, password);
            if (loggedUser == null) {
                errors.add("Email or Password are invalid");
            }
        }


        return loggedUser;
    }


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user =  this.userRepository.findOneByUsername(s);
        if(user==null){
            throw  new UsernameNotFoundException("Invalid Credentials");
        }
        return user;
    }
}
