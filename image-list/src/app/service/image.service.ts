import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  getImageListData(): Observable<object> {
    return this.http.get('https://db.ezobooks.in/kappa/image/task');
  }
}
