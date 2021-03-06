import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NavigationService {

  private _navigations: BehaviorSubject<any>;
  private apiUrl = 'http://127.0.0.1:8360/api';

  get navigations() {
    return this._navigations.asObservable();
  }

  constructor(private http: Http) {
    this._navigations = new BehaviorSubject<any>([]);
  }

  getNavs(topicId:any = '', page:any = 1) {
    const url = `${this.apiUrl}/link?topicId=${topicId}&page=${page}`;
    this.http.get(url)
      .map(res => res.json())
      .do(res => console.log(res))
      .subscribe(res => {
        this._navigations.next(res);
      });
  }

  getCategorys() {
    const url = `${this.apiUrl}/topic`;
    return this.http.get(url)
      .map(res => res.json())
      .do(res => console.log(res));
  }
}
