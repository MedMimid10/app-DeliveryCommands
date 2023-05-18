import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-paiment-online',
  templateUrl: './paiment-online.component.html',
  styleUrls: ['./paiment-online.component.css']
})
export class PaimentOnlineComponent {
  constructor(private router:Router){}

  activeTab: string = 'credit-card';


  onSelectTab(tab: string) {
    this.activeTab = tab;
  }

  onSubmit() {
    // Handle the form submission
    // ...
  }
  cancelPayment(){
    this.router.navigate(['/shippement-page'])
  }
}
