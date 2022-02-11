import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  private Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor() { 
  }

  ngOnInit(): void {
  }


  success(){
    this.Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
  }

  error(){
    this.Toast.fire({
      icon: 'error',
      title: 'Signed in error'
    })
  }
  
  


  // ngOnDestroy()



  // removeAlert(alert: Alert)



  // cssClass(alert: Alert)

}
