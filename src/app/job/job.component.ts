import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  jobs: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/contractor/')
      .subscribe(
        data  => {
          console.log(data);
          this.jobs = data;
        },
        error  => {
          console.log('Error', error);
        }
      );
  }

}
