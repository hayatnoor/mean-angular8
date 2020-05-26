import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  pageTitle = '';
  pageEdit = false;
  user: any = {
    firstName: '',
    lastName: '',
    company: '',
    job: 0
  };

  jobs: any = [{
    id: 1,
    name: 'Plumbing'
  },
  {
    id: 2,
    name: 'Painting'
  }];

  constructor(private http: HttpClient, private route: ActivatedRoute, private _location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.pageEdit = true;
      this.http.get('/api/contractor/' + id)
        .subscribe(
          data => {
            this.user = data;
            this.pageTitle = this.user.company;
          },
          error => {
            console.log('Error', error);
          }
        );
    } else {
      this.pageTitle = 'Add New Job';
      this.pageEdit = false;
    }
  }

  save () {
    if (this.pageEdit) {
      this.http.put('/api/contractor/', this.user)
        .subscribe(
          data => {
            console.log('PUT Request is successful ', data);
            //this.user = data;
          },
          error => {
            console.log('Error', error);
          }
        );
    } else {
      this.http.post('/api/contractor/', this.user)
        .subscribe(
          data => {
            console.log('POST Request is successful ', data);
            this.user = {};
          },
          error => {
            console.log('Error', error);
          }
        );
    }
  }

  back() {
    this._location.back();
  }

}
