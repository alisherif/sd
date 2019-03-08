package vv.com.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vv.com.auth.model.Hero;


public interface  HeroRepository extends JpaRepository<Hero, Long> {




}
