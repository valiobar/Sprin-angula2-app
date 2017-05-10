package com.spring.services;

import com.spring.Domain.Entities.Port;
import com.spring.Domain.Entities.Reggata;
import com.spring.Domain.Entities.User;
import com.spring.Domain.dto.binding.ReggataBindingModel;
import com.spring.Domain.dto.view.LoggedUserDataModel;
import com.spring.Domain.dto.view.ReggataViewModel;
import com.spring.Domain.repository.PortRepository;
import com.spring.Domain.repository.ReggataRepository;
import com.spring.Domain.repository.UserRepository;
import com.spring.services.interfaces.ReggataService;
import com.spring.utils.modelParser.ModelParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReggataServiceImpl implements ReggataService {

    @Autowired
    private ModelParser modelParser ;

    @Autowired
    private ReggataRepository reggataRepository;

    @Autowired
    private PortRepository portRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public List<ReggataViewModel> getAllReggata() {
       List<Reggata> reggatas= this.reggataRepository.findAll();
        List<ReggataViewModel> reggataViewModels = new ArrayList<>();
        for (Reggata reggata : reggatas) {
             ReggataViewModel reggataViewModel = modelParser.convert(reggata,ReggataViewModel.class);
            reggataViewModel.setUsername(reggata.getUser_id().getUsername());
            reggataViewModels.add(reggataViewModel);
        }

        return reggataViewModels;
    }

    @Override
    public ReggataViewModel get(Long id) {
        Reggata reggata=this.reggataRepository.findOne(id);
        ReggataViewModel reggataViewModel = modelParser.convert(reggata,ReggataViewModel.class);
        reggataViewModel.setUsername(reggata.getUser_id().getUsername());
     return  reggataViewModel ;
    }

    @Override
    public void persist(ReggataBindingModel reggataBindingModel) {
        Reggata reggata = new Reggata();
        List<Port> port = this.portRepository.findByName(reggataBindingModel.getPort().getName());
         User user = this.userRepository.findOneByUsername(reggataBindingModel.getUsername());
        reggata.setUser_id(user);
        reggata.setPort(port.get(0));
        reggataBindingModel.getReggataPoints().forEach(point -> point.setReggata(reggata));
        reggata.setReggataPoints(reggataBindingModel.getReggataPoints());
        reggata.setReggataDate(reggataBindingModel.getReggataDate());
        this.reggataRepository.save(reggata);
    }

    @Override
    public List<ReggataViewModel> getLastFive() {
        List<Reggata> reggatas= this.reggataRepository.findTop5ByOrderByCreatedDesc();
        List<ReggataViewModel> reggataViewModels = new ArrayList<>();
        for (Reggata reggata : reggatas) {
            ReggataViewModel reggataViewModel = modelParser.convert(reggata,ReggataViewModel.class);
            reggataViewModel.setUsername(reggata.getUser_id().getUsername());
            reggataViewModels.add(reggataViewModel);
        }

        return reggataViewModels;

    }

    @Override
    public ArrayList<String> addParticipent(Long userID,Long reggataId) {
        User user = this.userRepository.findOne(userID);
        Reggata reggata= this.reggataRepository.findOne(reggataId);
        ArrayList<String> errors = new ArrayList<>();
        if(user==null){
            errors.add("no such user");
        };
        if(reggata==null){
            errors.add("no such reggata");
        }
        reggata.getParticipents().add(user);
        this.reggataRepository.save(reggata);
        return errors;


    }
}
//    public List<LoggedUserDataModel> getAllUsers() {
//        List<User>users = this.userRepository.findAll();
//        List<LoggedUserDataModel> loggedUserDataModels =new ArrayList<>();
//        for (User user : users) {
//            loggedUserDataModels.add(modelParser.convert(user,LoggedUserDataModel.class));
//        }
//
//        return loggedUserDataModels;
//    }