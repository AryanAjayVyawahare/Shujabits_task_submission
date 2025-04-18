import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.scss']
})
export class AddcontactComponent implements OnInit {

  // Form group definition with validation
  contactform = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    description: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  });

  // Constructor injecting login service and router
  constructor(private add: LoginService, private router: Router) { }

  ngOnInit(): void {}

  // Method to handle form submission and save contact
  contacts() {
    if (this.contactform.valid) {
      // Call the service to add contact
      this.add.addContact(this.contactform.value).subscribe(
        (success) => {
          console.log('Success:', success);
          alert('Contact Saved Successfully!');
          this.contactform.reset();
          // Navigate to the contact list after saving the contact
          this.router.navigate(['/contactlist']);
        },
        (error) => {
          console.error('Error:', error);
          alert('Something went wrong while saving contact.');
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  // Method to handle close action and navigate to the contact list
  close() {
    // Navigate to the contact list page when close is clicked
    this.router.navigate(['/contactlist']);
  }
}
