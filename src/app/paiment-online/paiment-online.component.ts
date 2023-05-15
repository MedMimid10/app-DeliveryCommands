import { Component, AfterViewInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-paiment-online',
  templateUrl: './paiment-online.component.html',
  styleUrls: ['./paiment-online.component.css']
})
export class PaimentOnlineComponent {
  activeTab: string = 'credit-card';

  onSelectTab(tab: string) {
    this.activeTab = tab;
  }

  onSubmit() {
    // Handle the form submission
    // ...
  }
}
