package vv.com.auth.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vv.com.auth.model.Hero;
import vv.com.auth.repository.HeroRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/hero")
public class HeroController {


    @Autowired
    private HeroRepository heroRepository;


    @PostMapping("/")
    public Hero addHero(@RequestBody Map<String, String> body){

         String firstName =body.get("firstName");
         String lastName =body.get("lastName");
         String dateOfBirth =body.get("dateOfBirth");
         String maritalStatus =body.get("maritalStatus");
         String address =body.get("address");
         String placeOfBirth =body.get("placeOfBirth");
         String occupation =body.get("occupation");
         String dateOfDeath =body.get("dateOfDeath");
         String reaasonOfDeath =body.get("reaasonOfDeath");
         String dateOfInjuiry =body.get("dateOfInjuiry");
         String description =body.get("description");
        String imgUrl =body.get("imgUrl");

        return heroRepository.save(new Hero(imgUrl,firstName,lastName,dateOfBirth,maritalStatus,address,placeOfBirth,occupation,dateOfDeath,reaasonOfDeath,dateOfInjuiry,description));
    }

    @GetMapping("/{id}")
    public Optional<Hero> show(@PathVariable Long id){

       return heroRepository.findById(id);
    }

    @GetMapping("/heros")
    public List<Hero> index(){
        return heroRepository.findAll();
    }




}
