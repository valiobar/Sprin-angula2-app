package com.spring.controllers;

import com.spring.Domain.Entities.User;
import com.spring.Domain.dto.binding.LoginAttemptModel;
import com.spring.Domain.dto.binding.RegisterUserModel;
import com.spring.Domain.dto.view.LoggedUserDataModel;
import com.spring.security.utils.JwtAuthenticationResponse;
import com.spring.security.utils.JwtTokenUtil;
import com.spring.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

import static com.sun.org.apache.xalan.internal.xsltc.compiler.sym.error;
import static sun.audio.AudioDevice.device;

/**
 * Created by UserX on 3/13/2017.
 */
@RestController
@RequestMapping("/users")
public class UserRESTController {

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    UserService userService;

    @CrossOrigin
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<?> getUser() {

        return new ResponseEntity<>(this.userService.getAllUsers(), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/{userName}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserById(@PathVariable("userName") String userName) {
        LoggedUserDataModel loggedUserDataModel = this.userService.get(userName);

        if (loggedUserDataModel != null) {
            return new ResponseEntity<>(loggedUserDataModel, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


    }

    @CrossOrigin
    @RequestMapping(value = "/", method = RequestMethod.POST)


    public ResponseEntity<?> createUser(HttpServletResponse response, @RequestBody RegisterUserModel user, Device device) {
        RegisterUserModel model = user;
        List<String> errors = userService.persist(user);
        if (errors.size() > 0) {
            return new ResponseEntity(errors, HttpStatus.CONFLICT);
        } else {

            // Reload password post-security so we can generate token
            final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
            final String token = jwtTokenUtil.generateToken(userDetails, device);
            return new ResponseEntity<JwtAuthenticationResponse>(new JwtAuthenticationResponse(token), HttpStatus.CREATED);
        }

    }

    /*  @CrossOrigin
      @RequestMapping(value = "/login", method = RequestMethod.POST)
      public ResponseEntity<?> login(@RequestBody LoginAttemptModel user ,@RequestParam(required = false) String error) {
          HttpHeaders headers = new HttpHeaders();
          headers.add("Access-Control-Allow-Origi", "*");
          List<String>errors =  new ArrayList<>();
          LoggedUserDataModel loggedUserDataModel= this.userService.login(user,errors);
          if (errors.size()>0) {
              return new ResponseEntity(errors, HttpStatus.CONFLICT);
          }else{
              return new ResponseEntity<>(loggedUserDataModel, HttpStatus.ACCEPTED);
          }

      }*/
    @CrossOrigin
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody LoginAttemptModel user, Device device) throws AuthenticationException {
        // Perform the security
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Reload password post-security so we can generate token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails, device);

        // Return the token
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }
}
