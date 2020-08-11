import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root'})
export class DataStorageService {

    constructor(private httpClient: HttpClient, private authService: AuthService) {}

    getAll(collection: string) {
        return this.httpClient.get<any[]>(
            'https://resto-firebase.firebaseio.com/'+collection+'.json'
        ); 
    }

    getObject(collection: string, id: string) {
        return this.httpClient.get<Object>(
            'https://resto-firebase.firebaseio.com/'+collection+'/'+id+'.json'
        ); 
    }

    post(collection: string, object: any) {
        return this.httpClient.post(
            'https://resto-firebase.firebaseio.com/'+collection+'.json?auth='+this.authService.getToken(),
            object); 
    }

    postUnsigned(collection: string, object: any) {
        return this.httpClient.post(
            'https://resto-firebase.firebaseio.com/'+collection+'.json',
            object); 
    }

    patch(collection: string, object: any) {
        console.log('https://resto-firebase.firebaseio.com/'+collection+'/'+object.id+'.json');
        
        return this.httpClient.patch(
            'https://resto-firebase.firebaseio.com/'+collection+'/'+object.id+'.json?auth='+this.authService.getToken(),
            object); 
    }

    delete(collection: string, objectId) {
        return this.httpClient.delete(
            'https://resto-firebase.firebaseio.com/'+collection+'/'+objectId+'.json?auth='+this.authService.getToken()
        ); 
    }

}