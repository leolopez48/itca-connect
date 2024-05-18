package sv.edu.itca.spring.embedded.ldap.controller;

import java.util.Arrays;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sv.edu.itca.spring.embedded.ldap.dto.db.ItcaUserIp;
import sv.edu.itca.spring.embedded.ldap.dto.ldap.PersonResponseDto;
import sv.edu.itca.spring.embedded.ldap.model.Person;
import sv.edu.itca.spring.embedded.ldap.service.PersonRepoImpl;
import sv.edu.itca.spring.embedded.ldap.service.itca_user.ItcaUserServiceImpl;

@RestController
public class LdapBindController {

	@Autowired
	private PersonRepoImpl personRepo;

	@Autowired
	ModelMapper mapper;

	@Autowired
	ItcaUserServiceImpl itcaUserService;

	@PostMapping("/add-user")
	public ResponseEntity<String> bindLdapPerson(@RequestBody Person person) {
		String result = personRepo.create(person);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PutMapping("/update-user")
	public ResponseEntity<String> rebindLdapPerson(@RequestBody Person person) {
		String result = personRepo.update(person);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/retrieve-users")
	public ResponseEntity<List<PersonResponseDto>> retrieve() {
		var responseEntityList = personRepo.retrieve();

		return new ResponseEntity<>(Arrays.asList(mapper.map(responseEntityList, PersonResponseDto[].class)), HttpStatus.OK);
	}

	@GetMapping("/retrieve-user/{userId}")
	public ResponseEntity<PersonResponseDto> retrieve(@PathVariable String userId) {
		var responseEntity = personRepo.retrieveByUserId(userId);

		return new ResponseEntity<>(mapper.map(responseEntity, PersonResponseDto.class), HttpStatus.OK);
	}

	@GetMapping("/remove-user")
	public ResponseEntity<String> unbindLdapPerson(@RequestParam(name = "userId") String userId) {
		String result = personRepo.remove(userId);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PutMapping("/persist-ip-user")
	public ResponseEntity<String> persistIpUser(@RequestBody ItcaUserIp itcaUserIp) {
		var response = itcaUserService.updateUserIp(itcaUserIp.getUserId(), itcaUserIp.getIpAddr());

		/*if (!StringUtils.hasLength(request.getHeader("X-Real-IP"))) {
			//ipAddr = request.getHeader("X-Real-IP");
			//ipAddr = InetAddress.getLocalHost().getHostAddress();
			ipAddr = request.getRemoteAddr();
		} */

		return new ResponseEntity<>(response == 1 ? HttpStatus.OK.toString() : HttpStatus.INTERNAL_SERVER_ERROR.toString(), HttpStatus.OK);
	}
}