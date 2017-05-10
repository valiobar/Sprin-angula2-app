package com.spring.services.interfaces;

import com.spring.Domain.dto.binding.ReggataBindingModel;
import com.spring.Domain.dto.view.LoggedUserDataModel;
import com.spring.Domain.dto.view.ReggataViewModel;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by UserX on 3/18/2017.
 */
public interface ReggataService {
    List<ReggataViewModel> getAllReggata();
    ReggataViewModel get(Long id);
    void persist(ReggataBindingModel reggataBindingModel);
    List<ReggataViewModel> getLastFive();
   ArrayList<String> addParticipent(Long userId, Long reggataId);
}
