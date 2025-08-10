package CareerVision.controller;

import CareerVision.dto.LocationDTO;
import CareerVision.model.Company;
import CareerVision.model.User;
import CareerVision.repository.CompanyRepository;
import CareerVision.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    CompanyRepository companyRepository;

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> userLocation(@RequestBody LocationDTO locationDTO, @PathVariable Long userId){
        try{
            Optional<User> optionalUser= userRepository.findById(userId);
            User user= optionalUser.get();

            user.setLocation(locationDTO.getLocation());
            user.setLat(locationDTO.getLatitude());
            user.setLon(locationDTO.getLongitude());
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }
        catch(Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @PostMapping("/company/{companyId}")
    public ResponseEntity<?> companyLocation(@RequestBody LocationDTO locationDTO, @PathVariable Long companyId){
        try{
            Optional<Company> optionalCompany= companyRepository.findById(companyId);
            Company company= optionalCompany.get();

            company.setLocation(locationDTO.getLocation());
            company.setLat(locationDTO.getLatitude());
            company.setLon(locationDTO.getLongitude());
            companyRepository.save(company);
            return ResponseEntity.ok().body(company);
        }
        catch(Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

}
