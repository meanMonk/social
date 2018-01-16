import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  adsValue: any;

  constructor() { }

  setAdsValue(value: any) {
    this.adsValue = value;
  }

  getAdsValue() {
    return this.adsValue;
  }

}
