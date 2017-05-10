package com.spring.controllers;

import com.spring.Domain.dto.binding.PortBindingModel;
import com.spring.Domain.dto.view.PortViewModel;
import com.spring.Domain.dto.view.ReggataViewModel;
import com.spring.services.interfaces.PortService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/port")
public class PortRESTController {

    @Autowired
    private PortService portService;

    @CrossOrigin
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public ResponseEntity<?> getUserById(){
        List<PortViewModel> portViewModels= this.portService.getAllPorts();

        if (portViewModels!=null){
            return new ResponseEntity<>(portViewModels, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


    }
    @CrossOrigin

    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<?> createPort(@RequestBody PortBindingModel portBindingModel){
           this.portService.persist(portBindingModel);
         return new ResponseEntity<>( HttpStatus.OK);


    }


}
