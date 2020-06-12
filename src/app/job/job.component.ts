import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  jobs: any = [];
  filteredJobs: any = [];
  allJobs: any = [];
  search = '';
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/contractor/')
      .subscribe(
        data  => {
          console.log(data);
          this.jobs = data;
          this.allJobs = data;
        },
        error  => {
          console.log('Error', error);
        }
      );
  }


  filterJobs (e) {
    this.jobs = [];
    for (let i = 0; i < this.allJobs.length; i++) {
      if (this.allJobs[i].company.indexOf(this.search) > -1) {
        this.filteredJobs.push(this.allJobs[i]);
      }
    }

    this.jobs = this.filteredJobs;

  }

}
