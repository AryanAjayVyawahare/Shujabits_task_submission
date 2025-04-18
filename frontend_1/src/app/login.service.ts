import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(body: any) {
    return this.http.post("http://localhost:8200/api/v1/users/login", body);
  }

  signup(body: any) {
    return this.http.post("http://localhost:8200/api/v1/users/signup", body);
  }

  addContact(contactData: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post("http://localhost:8200/api/v1/contact/addcontacts", contactData, { headers });
  }

  getallcontact() {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`http://localhost:8200/api/v1/contact/allcontacts/${id}`, { headers });
  }

  deletcontact(userId: string, contactId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8200/api/v1/contact/users/${userId}/contacts/${contactId}`;
    return this.http.delete(url, { headers });
  }

  getcontact(userId: string, contactId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8200/api/v1/contact/users/${userId}/contacts/${contactId}`;
    return this.http.get(url, { headers });
  }

  updatecontact(userId: any, contactId: string, contactData: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `http://localhost:8200/api/v1/contact/users/${userId}/contacts/${contactId}`;
    return this.http.put(url, contactData, { headers });
  }

}
