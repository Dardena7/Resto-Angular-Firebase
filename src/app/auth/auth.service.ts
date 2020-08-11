import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface AuthResponseData {
    idToken : string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    private user: User = null;
    private tokenExpirationTimer: any;

    constructor(private httpClient: HttpClient, private router: Router) {}

    login(email: string, password: string) {
        return this.httpClient.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.apiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleErrors),
            tap<AuthResponseData>(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user = user;
        this.autologout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    logout() {
        this.user = null;
        this.router.navigate(['/'])
        localStorage.removeItem("userData");
        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    autologout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleErrors(errorRes: HttpErrorResponse) {
        console.log(errorRes);
                
        let errorMessage = 'An unkonw error occured';
        if (!errorRes.error || !errorRes.error.error) {
            return errorMessage;
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email already exists !';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email not found !';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Password is invalid !';
                break;
        }

        return throwError(errorMessage);
    }

    autologin() {
        
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        
        if (loadedUser.token) {
            this.user = loadedUser;
            console.log("auto : " + this.user);
            
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autologout(expirationDuration);
        }
    }

    getUser(): User {
        return this.user;
    }

    getToken() {
        if (this.user) {
            return this.user.token;
        }
        return "";
    }

}