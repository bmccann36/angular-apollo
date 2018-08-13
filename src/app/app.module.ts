import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';

import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const uri = createHttpLink({
      uri: 'https://7irszyowfzfnfhxur4xmxle5uy.appsync-api.us-east-1.amazonaws.com/graphql',
    });

    const authLink = setContext((_, { headers }) => {
      const apiKey = `da2-vvbah3bfz5crzamjoxx4ynjrrq`;
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          'x-api-key': apiKey,
        }
      };
    });
    apollo.create({
      link: authLink.concat(uri),
      cache: new InMemoryCache()
    });
  }
}

