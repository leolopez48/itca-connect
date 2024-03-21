package sv.edu.itca.itcaconnectauthldap.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin-zone")
public class AdminController {

    @GetMapping
  public ResponseEntity<String> adminMethod() {
      return ResponseEntity.ok("You have ADMIN role...");
  }

}
