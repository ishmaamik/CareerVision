package CareerVision.controller;

import CareerVision.model.Company;
import CareerVision.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "*")
public class CompanyController {

    @Autowired
    CompanyRepository companyRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createCompany(@RequestBody Company company){
        try{
            if(company.getName()==null || company.getName().isEmpty()){
               return ResponseEntity.badRequest().body("Title is missing");
            }

            Company savedCompany= companyRepository.save(company);
            return ResponseEntity.ok(company);
        }
        catch(Exception e){
            return ResponseEntity.internalServerError().body("Error creating company" + e.getMessage());
        }
    }

    @GetMapping("/getCompany")
    public ResponseEntity<?> getCompany (@RequestBody String name){
        try{
            if(name==null || name.isEmpty()){
                ResponseEntity.badRequest().body("Name is required");
            }

            Optional<Company> company= companyRepository.findByName(name);
            return ResponseEntity.ok(company);
        }
        catch(Exception e){
            return ResponseEntity.internalServerError().body("Error: "+ e.getMessage() );
        }
    }

    @GetMapping("/getAllCompanies")
    public ResponseEntity<?> getAllCompanies (){
        try{
            List<Company> Companies= companyRepository.findAll();
            return ResponseEntity.ok(Companies);
        }
        catch(Exception e){
            return ResponseEntity.internalServerError().body("Error: "+ e.getMessage() );
        }
    }
}
