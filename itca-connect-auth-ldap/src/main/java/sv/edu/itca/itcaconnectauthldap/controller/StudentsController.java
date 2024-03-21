package sv.edu.itca.itcaconnectauthldap.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/students-zone")
public class StudentsController {

    @GetMapping
  public ResponseEntity<String> studentsMethod() {
      return ResponseEntity.ok("you have STUDENT role...");
  }

}
