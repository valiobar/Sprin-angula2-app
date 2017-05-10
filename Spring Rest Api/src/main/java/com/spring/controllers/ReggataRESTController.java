package com.spring.controllers;

import com.spring.Domain.dto.binding.ReggataBindingModel;
import com.spring.Domain.dto.view.LoggedUserDataModel;
import com.spring.Domain.dto.view.ReggataViewModel;
import com.spring.services.interfaces.ReggataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/reggatas")
public class ReggataRESTController {

@Autowired
    private ReggataService reggataService;

    @CrossOrigin
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserById(@PathVariable("id") long id){
        ReggataViewModel reggataViewModel= this.reggataService.get(id);

        if (reggataViewModel!=null){
            return new ResponseEntity<>(reggataViewModel,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


    }

    @CrossOrigin
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<?> getAllReggatas(){
        return new ResponseEntity<>(this.reggataService.getAllReggata(), HttpStatus.OK);
    }
    @CrossOrigin
    @RequestMapping(value = "/last5", method = RequestMethod.GET)
    public ResponseEntity<?> getLastFive(){
        return new ResponseEntity<>(this.reggataService.getLastFive(), HttpStatus.OK);
    }
    @CrossOrigin
    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<?> createReggat(@RequestBody ReggataBindingModel reggataBindingModel) {
         this.reggataService.persist(reggataBindingModel);


         return new ResponseEntity<String>( HttpStatus.CREATED);

    }
    @CrossOrigin
    @RequestMapping(value = "addUser/{Userid}/{reggataID}", method = RequestMethod.GET)
    public ResponseEntity<?> addParticipent(@PathVariable("Userid") long userId,@PathVariable("reggataID") long reggataID){
        ArrayList<String> errors=this.reggataService.addParticipent(userId,reggataID);
  if(errors.size()==0){
      return new ResponseEntity<String>( HttpStatus.CREATED);
  }else
      return new ResponseEntity(errors, HttpStatus.CONFLICT);
    }
}
