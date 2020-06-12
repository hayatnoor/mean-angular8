import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { NgForm } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  pageTitle = '';
  pageEdit = false;
  jobs: any = [{
    id: 1,
    name: 'Plumbing'
  },
  {
    id: 2,
    name: 'Painting'
  }];

  user: any = <any>{};
  message = 'Saved!';



  constructor(private http: HttpClient, private route: ActivatedRoute, private _location: Location, public snackBar: MatSnackBar) { }

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

  save (contactForm: NgForm) {
    if (contactForm.invalid) {
      return;
    } else {
      if (this.pageEdit) {
        this.http.put('/api/contractor/', this.user)
          .subscribe(
            data => {
              console.log('PUT Request is successful ', data);
              this.openSnackBar(this.message, 'pizza-party');
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
              this.openSnackBar(this.message, 'pizza-party');
              this.user = {};
              contactForm.resetForm();
            },
            error => {
              console.log('Error', error);
            }
          );
      }
    }
  }

  back() {
    this._location.back();
  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      panelClass: panelClass,
      duration: 3000
    });
  }


}
