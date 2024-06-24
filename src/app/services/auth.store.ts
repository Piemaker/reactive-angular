import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../model/user";
import { map, shareReplay, tap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AuthStore {
  private userSubject = new BehaviorSubject<User>(null);
  user$: Observable<User> = this.userSubject.asObservable();
  isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient) {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      this.userSubject.next(user);
    }
    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));
  }

  login(data: { email: string; password: string }): Observable<User> {
    return this.http.post<User>("/api/login", data).pipe(
      tap((user) => {
        this.userSubject.next(user);
        localStorage.setItem("user", JSON.stringify(user));
      }),
      shareReplay()
    );
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem("user");  
  }
}
