import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private login:LoginService , private activate: ActivatedRoute, private router:Router) { }


  editform = new FormGroup({
    //id: new FormControl(''),
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(''),
      // edit: new FormControl(''),
    
  })


userId:any
contactId:any

  ngOnInit(): void {
    this.activate.queryParams.subscribe(params=>{
      console.log('params',params);
      this.userId=params['id']
      this.contactId=params['contact']
      
    })
    this.contact()
  }

contact(){
  this.login.getcontact(this.userId, this.contactId).subscribe(success=>{
    console.log('success', success)
    let d:any=success
    console.log(d)
    this.editform.patchValue(d)

  })
}



  contacts:any=[]

  update( ){
    
    const contactData = this.editform.value
    this.login.updatecontact(this.userId,this.contactId,contactData ).subscribe(success=>{
      console.log("updated contact successfully",success)
      let data:any = success
      //this.contacts=data
      this.router.navigate(['contactlist'])
    })


  }

}
