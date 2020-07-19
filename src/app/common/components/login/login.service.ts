import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    public getUserLoggedIn = new Subject();
    constructor() { }
    login(status): Observable<boolean> {
        if (status) {
            this.getUserLoggedIn.next(true);
            return;
        } else {
            this.getUserLoggedIn.next(false);
            return;
        }
    }
    logout(): void {
        this.getUserLoggedIn.next(false);
    }
}
