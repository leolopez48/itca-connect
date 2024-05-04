import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

// import { AuthService } from "../service/auth.service";
// import { AuthenticationService } from "../service/authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const usuarioJSON = localStorage.getItem('usuario');
    const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : null;

    if (usuario === null) {
      localStorage.clear();
      this.router.navigate(["/login"]);
      return true;
    }

    return false;
  }
}
