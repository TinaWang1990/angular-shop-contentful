import { Injectable } from '@angular/core';
import * as contentful from 'contentful';
import { environment } from '../environments/environment'
import { configuration } from './configuration'
import { Entry } from 'contentful';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config = configuration;

  items={}as any;
  private client = contentful.createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.token
  })
  constructor() { }
  //debug
  logContent() {
    this.client.getEntries()
      .then((entry) => console.log(entry))
  }

  getProducts(): Promise<Entry<any>[]>  {
    return this.client.getEntries()
    .then((entry) => entry.items)
  }
  getConfig() {
    return this.config;
  }
}
