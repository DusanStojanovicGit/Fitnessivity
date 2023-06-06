import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private readonly http: HttpClient) { }

  uploadImage(formData: FormData){
    this.http.post<any>('http://10.241.185.86:3000/images/upload', formData, {withCredentials: true}).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
