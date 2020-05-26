import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  words: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/word/')
      .subscribe(
        data  => {
          console.log('GET Request is successful ', data);
          this.words = data;
        },
        error  => {
          console.log('Error', error);
        }
      );
  }

  submitData(text: string) {
    this.http.post('/api/word/',
      {
        word: text
      })
      .subscribe(
        data  => {
          console.log('POST Request is successful ', data);
          this.words.push(data);
        },
        error  => {
          console.log('Error', error);
        }
      );
  }

  delete(i: number) {
    console.log(this.words[i]);
    let httpParams = new HttpParams().set('_id', this.words[i]._id);
    let options = { params: httpParams };
    this.http.delete('/api/word/', options)
      .subscribe((s) => {
        console.log(s);
        this.words.splice(i, 1);
      });
  }

}
