import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndPoints } from '../constants/apiEndpoints';
import { ValidationTestModel } from '../model/validation-test.model';
@Injectable({
  providedIn: 'root',
})
export class ValidationTestService {
  constructor(private http: HttpClient) {}

  insert(data: ValidationTestModel): Observable<any> {
    const headers = { Accept: 'text/plain' };
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.ValidationTest_Insert, data, {
      headers: headers,
    });
  }
  update(data: ValidationTestModel): Observable<any> {
    const headers = { Accept: 'text/plain' };
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.ValidationTest_Update, data, {
      headers: headers,
    });
  }
  delete(id: string) {
    const headers = { Accept: 'text/plain' };
    localStorage.setItem('isauth', '0');
    return this.http.post<any>(ApiEndPoints.ValidationTest_Delete + id, {
      headers: headers,
    });
  }
  getAll(): Observable<any> {
    const headers = { Accept: 'text/plain' };
    localStorage.setItem('isauth', '0');
    return this.http.get<any>(ApiEndPoints.ValidationTest_GetAll, {
      headers: headers,
    });
  }
  getById(id: string): Observable<any> {
    const headers = { Accept: 'text/plain' };
    localStorage.setItem('isauth', '0');
    return this.http.get<any>(ApiEndPoints.ValidationTest_GetById + id, {
      headers: headers,
    });
  }
}
