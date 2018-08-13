import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import gql from 'graphql-tag';

import { Course, Query } from '../types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  events: Observable<any>;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.events = this.apollo.watchQuery<any>({
      query: gql`
        query listEvents {
          listEvents(limit: 10){
            items{
              id
              name
              description
            }
          }
        }
      `
    })
      .valueChanges
      .pipe(
        map(result => {
          console.log(result.data.listEvents);
          return result.data.listEvents.items;
        })
      );
  }

}
