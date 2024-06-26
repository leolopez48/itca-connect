import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";



@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const usuarioJSON = localStorage.getItem('user');
    const usuario = usuarioJSON ? JSON.parse(usuarioJSON) : null;

    // console.log(usuario)

    if (usuario === null) {
      localStorage.clear();
      this.router.navigate(["/login"]);
      return false;
    }

    return true;
  }
}
