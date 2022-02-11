import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../_model';
import { catchError, map } from 'rxjs/operators';
import { Donor } from '../_model/donor';
import { BloodBag } from '../_model/bloodbag';
import { Product } from '../_model/product';
import { ProductBackEnd } from '../_model/productBackEnd';
import { OrderBlood } from '../_model/order-blood';
import { AlertService } from './alert.service';
// import { User } from '@app/_models';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    private Urlport = "http://localhost:8888/api-red-cross"

    httpHeaders = new HttpHeaders().set(
      'Content-Type','application/x-www-form-urlencoded'
    );

    constructor(private router:Router, private http:HttpClient, private route: ActivatedRoute, private alertService:AlertService) { 
      let localUser = localStorage.getItem('user')
      if (localUser === null){
        this.userSubject = new BehaviorSubject<User | null>(null);
        this.user = this.userSubject.asObservable();
      }
      else{
        this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localUser)); //
        this.user = this.userSubject.asObservable();
        // console.log(this.userSubject);
      }
      // this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user'))); //
      // this.user = this.userSubject.asObservable();
      // console.log(this.userSubject);
    }

////////////////// 1. Use in account //////////////////////////////////////////////////

  // userValue // return ค่า user จาก userSubject
    public get userValue(): User | null { // คือ user ที่กำลัง login อยู่
      return this.userSubject.value;
    }

    //login
    login(Username:string, Password:string) {
      const body = new HttpParams()
      .set('Username', Username)
      .set('Password', Password);
      return this.http.post<User>(`${this.Urlport}/login.php`,  body, {headers:this.httpHeaders} )
      .pipe(map((user:any) =>{
        catchError(this.handlerError)
        console.log(user)

        let str = user.EmployeeName;
        let res = str.split(" ");
        user.firstName = res[0]; // add firstName เข้า user
        user.lastName = res[1];
        delete user.EmployeeName; // ลบ key  EmployeeName ออก
        console.log(user.firstName)
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }))
    }

  // logout
    logout(){
      localStorage.removeItem('user');
      this.userSubject.next(null);
      
      // this.router.navigate(['/account/login']); // มันไม่ load component อะ // สังเกตได้ว่า ถ้าคุณกด save code ระหว่างที่คน login อยู่ แล้วจะนั้นคุณกด logout มันจะเกิด error นี้
      // this.router.navigate(['/']);
    }

  // register
    register(user:User):Observable<User>{
      // console.log(user);
      return this.http.post<User>(`${this.Urlport}/register.php`, user)
      .pipe(
        catchError(this.handlerError)
      );
    }

///////////////////////////// 2. Use in doctor and Profile///////////////////////////////


  //getById    // id:any ตอนแรกคุณไม่ผ่านidเข้าเป็นพารา ทำให้เมื่อต้องใส่ id ในกรณีอื่นที่ไม่ใช้ userValue ทำให้ทำไม่ได้
  readEmp(id:any):Observable<User>{
    return this.http.get<User>(`${this.Urlport}/readEmp.php?id=${id}`)
    .pipe(map((user:User)=>{ //emp:User เพราะมาเป็น first กับ last แล้ว ด้วย readEmp.php
      // console.log(user);

      // ตัด EmployeeName เอาเป็น firstName กับ lastName (ไม่ทำเพราะ readEmp.php แยก first กับ last ให้แล้ว)
      // let str = user.EmployeeName
      // let res = str.split(" ");
      // user.firstName = res[0];
      // user.lastName = res[1];
      // delete user.EmployeeName;

      // console.log(user.firstName)
      if(user.Employee_ID == this.userValue?.Employee_ID){
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      }
      
      return user
    }));
  }



  // update
    updateEmp(user:User):Observable<User>{
      console.log(user);
      return this.http.post<User>(`${this.Urlport}/update_emp.php`, user).pipe(
        
        catchError(this.handlerError)
      );
      
    }


    readDocAll():Observable<User[]>{
      return this.http.get<User[]>(`${this.Urlport}/readDoc.php`).pipe(
        catchError(this.handlerError)
        // console.log(this.users);
      );
    }

///////////////////////////// 3. use in Donor /////////////////////////////////////////////////

    // 3.1 ดึง donor ทั้งหมดมาแสดง
    readDonorAll():Observable<Donor[]>{
      return this.http.get<Donor[]>(`${this.Urlport}/readDonor.php`).pipe(
        catchError(this.handlerError)
      );
    }

    // get ข้อมูล Donor ด้วย id เอามาแสดงใน form เพื่อทำการแก้ไข
    readDonorById(id:any):Observable<Donor>{
      return this.http.get<Donor>(`${this.Urlport}/readDonorById.php?id=${id}`)
      .pipe(map((donor:Donor)=>{
        return donor;
      }))
    }

    // 3.2 update แก้ไขข้อมูล Donor (1 คน)
    updateDonor(donor:Donor):Observable<Donor>{
      return this.http.post<Donor>(`${this.Urlport}/update_donor.php`, donor).pipe(
        catchError(this.handlerError)
      );
    }

    // 3.3 เมื่อกดปุ่ม status จะ update status donor แล้ว สร้าง bloodbag แล้ว insert ลงตาราง Blood_Bag
    addBloodBag(bb:BloodBag):Observable<BloodBag>{
      return this.http.post<BloodBag>(`${this.Urlport}/createBB.php`, bb).pipe(
        
        catchError(this.handlerError)
      );
    }


    updateDonorStatus(id:any){
      return this.http.get(`${this.Urlport}/update_donor_status.php?id=${id}`).pipe( //update_donor_status.php`,id ใส่งี้แล้ว error 200
        catchError(this.handlerError)
      );
    }

    createDonor(donor:Donor){
      return this.http.post<Donor>(`${this.Urlport}/createDonor.php`, donor).pipe(
        catchError(this.handlerError)
      );
    }

////////////////////////////////////////// 4. use in BloodBag ///////////////////////////////////////

  // get BB All (ที่ยังไม่ได้คัดแยก status = 1)
  readbloodbagAll():Observable<BloodBag[]>{
    return this.http.get<BloodBag[]>(`${this.Urlport}/readBloodBagAll.php`).pipe(
      catchError(this.handlerError)
    );
  }

  // get BB by id
  readBloodBById(id:any):Observable<BloodBag>{
    return this.http.get<BloodBag>(`${this.Urlport}/readBloodBagById.php?id=${id}`)
    .pipe(map((bloodBag:BloodBag)=>{
      return bloodBag;
    }))
  }

  // update ถุงเลือด 1 ถุง
  updateBloodBag(bloodbag:BloodBag):Observable<BloodBag>{
    return this.http.post<BloodBag>(`${this.Urlport}/update_bloodbag.php`, bloodbag).pipe(
      catchError(this.handlerError)
    );
  }

  // เพื่อข้อมูล Product
  addProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(`${this.Urlport}/createProduct.php`, product).pipe(
      catchError(this.handlerError)
    );
  }

  // update status ของ BB (ให้จาก 1 เป็น 0)
  updateBBStatus(id:any){
    return this.http.get(`${this.Urlport}/update_bloodbag_status.php?id=${id}`).pipe(
      catchError(this.handlerError)
    );
  }


/////////////////////////////////////////// 5. Product /////////////////////////////////////

  getCountProduct():Observable<any>{
    return this.http.get<any>(`${this.Urlport}/count_product.php`).pipe(
      catchError(this.handlerError)
    )
  }



  readProductAll():Observable<ProductBackEnd[]>{
    return this.http.get<ProductBackEnd[]>(`${this.Urlport}/readProductAll.php`).pipe(
      catchError(this.handlerError)
    );
  }


/////////////////////////////////////////// 5. Order /////////////////////////////////////


  createOrder(order:OrderBlood):Observable<OrderBlood>{
    return this.http.post<OrderBlood>(`${this.Urlport}/createOrder.php`, order).pipe(
      catchError(this.handlerError)
    );
  }

  readOrderUserAll(id:any):Observable<OrderBlood[]>{
    return this.http.get<OrderBlood[]>(`${this.Urlport}/readOrderUserAll.php?id=${id}`).pipe(
      catchError(this.handlerError)
    )
  }


  readOrderWaiting():Observable<OrderBlood[]>{
    return this.http.get<OrderBlood[]>(`${this.Urlport}/readOrderWaitting.php`).pipe(
      catchError(this.handlerError)
    )
  }


  approveOrderWaiting(order:OrderBlood):Observable<any>{
    return this.http.post<OrderBlood>(`${this.Urlport}/approveOrder.php`, order).pipe(
      catchError(this.handlerError)
    )
  }

  cancelOrderWaiting(order:OrderBlood):Observable<any>{
    return this.http.post<OrderBlood>(`${this.Urlport}/cancelOrder.php`, order).pipe(
      catchError(this.handlerError)
    )
  }





////////////////////////////////////////// Error ///////////////////////////////////////////

  handlerError(error:HttpErrorResponse){
    let errMsg='';
    if(error.error instanceof ErrorEvent){
      errMsg = error.error.message;
    }else{
      errMsg = error.status + ',' + error.message;
    }
    return throwError(errMsg);
  }


}
