package com.spring.services.interfaces;

import com.spring.Domain.dto.binding.PortBindingModel;
import com.spring.Domain.dto.binding.ReggataBindingModel;
import com.spring.Domain.dto.view.PortViewModel;
import com.spring.Domain.dto.view.ReggataViewModel;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

/**
 * Created by UserX on 4/1/2017.
 */
public interface PortService {
    List<PortViewModel> getAllPorts();
    //@PreAuthorize("hasRole('ROLE_ADMIN')")
    void persist(PortBindingModel portBindingModel);
}
