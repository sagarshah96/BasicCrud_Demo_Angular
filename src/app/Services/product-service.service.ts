import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../Models/product';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  url: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.url = 'https://localhost:44379/api';
  }

  Save(pm: Product): Observable<any> {
    return this.http.post(this.url + "/Product/Save", JSON.stringify(pm), this.httpOptions).pipe(
      catchError(this.ErrorHendler)
    );
  }

  Update(pm: Product): Observable<any> {
    return this.http.put(this.url + "/Product/Update", JSON.stringify(pm), this.httpOptions).pipe(
      catchError(this.ErrorHendler)
    );
  }

  GetByID(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + "/Product/GetProductsByID/" + id).pipe(
      catchError(this.ErrorHendler)
    );
  }

  Delete(id: number): Observable<any> {
    return this.http.delete(this.url + "/Product/Delete/" + id).pipe(
      catchError(this.ErrorHendler)
    );
  }

  GetAll(): Observable<Product[]> {
    //return this.http.get(this.url + "/Admin/Product/GetAllProducts")
    return this.http.get<Product[]>(this.url + '/Product/GetAllProducts')
  }

  ErrorHendler(msg: any) {
    return throwError(msg);
  }
}
