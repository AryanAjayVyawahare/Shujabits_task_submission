import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.scss']
})
export class ContactlistComponent implements OnInit {

  contacts: any[] = [];

  constructor(private router: Router, private login: LoginService) {}

  ngOnInit(): void {
    this.getContact();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['login']);
  }

  getContact(): void {
    this.login.getallcontact().subscribe({
      next: (res: any) => {
        console.log("Contact list fetched successfully", res);
        this.contacts = res;
      },
      error: (err) => {
        console.error("Error fetching contacts", err);
      }
    });
  }

  delete(userId: string, contactId: string): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.login.deletcontact(userId, contactId).subscribe({
        next: () => {
          console.log("Contact deleted successfully");
          // Remove the deleted contact from the local list
          this.contacts = this.contacts.filter(c => c._id !== contactId);
        },
        error: (err) => {
          console.error("Error deleting contact", err);
        }
      });
    }
  }

  edit(userId: string, contactId: string): void {
    this.router.navigate(['edit'], {
      queryParams: { id: userId, contact: contactId }
    });
  }

}
