import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../service/data-service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-paiment-online',
  templateUrl: './paiment-online.component.html',
  styleUrls: ['./paiment-online.component.css']
})
export class PaimentOnlineComponent implements OnInit {
  paymentForm!: FormGroup;
  activeTab: string = 'credit-card';
  cardType: string = '';
  pendingPayment=false;

  constructor(
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
      expMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      expYear: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
      cvv: ['', [Validators.required, Validators.pattern('[0-9]{3}')]]
    });

    this.paymentForm.get('cardNumber')?.valueChanges.subscribe(cardNumber => {
      this.cardType = this.detectCardType(cardNumber);
    });
  }

  onSelectTab(tab: string) {
    this.activeTab = tab;
  }


  submitPayment() {
    if (this.paymentForm.valid) {
      // Handle the form submission
      this.pendingPayment=true;
      this.dataService.createShipment(this.dataService.bodyToSend).subscribe(response => {
        console.log(response);
        this.pendingPayment=false;

      });
      this.snackBar.open('Payment confirmed', 'Close', {
        duration: 2500, // Duration in milliseconds
      });
      this.router.navigate(['/']);
      this.dataService.bodyToSend={code:"",fname:"",lname:"",tel:"",address:"",city:"",postalCode:"",zip:"",email:"",status:"",shipmentType:"",products:[],paiement:{}};
    } else {
      // Display validation errors
      this.validateAllFormFields(this.paymentForm);
      this.pendingPayment=false;
    }

  }

  cancelPayment() {
    this.router.navigate(['/shippement-page']);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control) {
        if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        } else {
          control.markAsTouched({ onlySelf: true });
        }
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.paymentForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return 'This field is required.';
      }
      if (control.errors['minlength']) {
        return `Minimum length should be ${control.errors['minlength'].requiredLength}.`;
      }
      if (control.errors['maxlength']) {
        return `Maximum length should be ${control.errors['maxlength'].requiredLength}.`;
      }
      if (control.errors['pattern']) {
        return 'Invalid format.';
      }
      if (control.errors['min']) {
        return `Minimum value should be ${control.errors['min'].min}.`;
      }
      if (control.errors['max']) {
        return `Maximum value should be ${control.errors['max'].max}.`;
      }
    }
    return '';
  }

  detectCardType(cardNumber: string): string {
    const visaPattern = /^4/;
    const mastercardPattern = /^5[1-5]/;
    const amexPattern = /^3[47]/;
    const discoverPattern = /^6(?:011|5)/;

    if (cardNumber.match(visaPattern)) {
      return 'Visa';
    } else if (cardNumber.match(mastercardPattern)) {
      return 'Mastercard';
    } else if (cardNumber.match(amexPattern)) {
      return 'American Express';
    } else if (cardNumber.match(discoverPattern)) {
      return 'Discover';
    } else {
      return 'Unknown';
    }
  }
}
