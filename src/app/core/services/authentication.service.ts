import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

export class User {
  constructor(
    public status: string,
  ) {
  }

}

export class JwtResponse {
  constructor(
    public jwttoken: string,
  ) {
  }

}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  authenticate(username, password) {
    var formData: any = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.httpClient.post<any>('http://localhost:8080/searcher-api/v1/auth/authenticate', formData, {observe: 'response'}).pipe(
      map(
        resp => {
          sessionStorage.setItem('username', username);
          const tokenStr = resp.headers.get('Authorization');
          sessionStorage.setItem('token', tokenStr);
        }
      )
    );
  }


  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut(): void {
    sessionStorage.removeItem('username');
  }
}
