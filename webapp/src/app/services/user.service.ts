import { Platform, AlertController, ToastController } from "@ionic/angular";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CrudService } from "./crud.service";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

export interface User {
  id: BigInteger;
  state: string;
  name: string;
  mobileno: string;
  email: string;
  photo: string;
  password: string;
  role: BigInteger;
  lastname : string;
  firstname : string;
  middlename : string;
  birthdate : Date;
  gender : string;
  civilstatus : string;
  region_code : string;
  province_code : string;
  municipality_code : string;
  barangay_code : string;
  street : string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  crudService: CrudService<User>;
  constructor(protected http: HttpClient, protected toastController: ToastController, private alertController: AlertController) {
    this.crudService = new CrudService<User>(this.http, this.toastController, "users");
  }

  apiUrl = `${environment.backend}/api`;
  getUserProfile(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/userprofile/' + id).pipe(
      tap(res => {
        return res;
      }),
      catchError(e => {
        this.crudService.showToast(e.error);
        throw new Error(e);
      })
    );
  }

  resetPassword(query?: { [key: string]: string }): Observable<any> {
    const params = new HttpParams({ fromObject: query });
    return this.http.get<any>(this.apiUrl + '/resetpassword', { params }).pipe(
      tap(res => {
        return res;
      }),
      catchError(e => {
        this.crudService.showToast(e.error);
        throw new Error(e);
      })
    );
  }

  validateOTP(body: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/validateotp', body).pipe(
      tap(res => {
        return res;
      }),
      catchError(e => {
        this.crudService.showToast(e.error);
        throw new Error(e);
      })
    );
  }

  changepassword(body: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/changepassword', body).pipe(
      tap(res => {
        return res;
      }),
      catchError(e => {
        this.crudService.showToast(e.error);
        throw new Error(e);
      })
    );
  }

 
}
