package com.spring.services;

import com.spring.Domain.Entities.Point;
import com.spring.Domain.Entities.Port;
import com.spring.Domain.dto.binding.PortBindingModel;
import com.spring.Domain.dto.view.PortViewModel;
import com.spring.Domain.repository.PortRepository;
import com.spring.services.interfaces.PortService;
import com.spring.utils.modelParser.ModelParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PortServiceImpl implements PortService {
    @Autowired
    private ModelParser modelParser;
    @Autowired
    private PortRepository portRepository;


    @Override
    public List<PortViewModel> getAllPorts() {
        List<Port> ports = this.portRepository.findAll();
        List<PortViewModel> portViewModels = new ArrayList<>();
        for (Port port : ports) {
            portViewModels.add(this.modelParser.convert(port, PortViewModel.class));
        }
        return portViewModels;
    }

    @Override
    public void persist(PortBindingModel portBindingModel) {
        Port newPort = new Port();
        newPort.setName(portBindingModel.getName());
        newPort.setPoint(this.modelParser.convert(portBindingModel.getPoint(), Point.class));
        this.portRepository.save(newPort);
    }
}
