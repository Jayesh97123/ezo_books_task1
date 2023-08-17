import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.scss'],
})
export class AtmComponent {
  @ViewChild('withdrawalAmount') withdrawalAmount!: ElementRef;
  atmForm!: FormGroup;
  depositObject = {
    r2000: 0,
    r500: 0,
    r200: 0,
    r100: 0,
  };

  logArray: any = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.atmForm = this.fb.group({
      r2000: [''],
      r500: [''],
      r200: [''],
      r100: [''],
    });
  }

  updateDepositObject(val: any) {
    console.log(val);
    this.depositObject.r2000 = val.r2000 == '' ? 0 : val.r2000;
    this.depositObject.r500 = val.r500 == '' ? 0 : val.r500;
    this.depositObject.r200 = val.r200 == '' ? 0 : val.r200;
    this.depositObject.r100 = val.r100 == '' ? 0 : val.r100;
    this.logArray.unshift({
      title: 'Deposit',
      style: 'alert alert-info',
      r2000: this.depositObject.r2000,
      r500: this.depositObject.r500,
      r200: this.depositObject.r200,
      r100: this.depositObject.r100,
      date: new Date(),
    });
    this.atmForm.reset();
  }

  getWithdraw(val: any) {
    let initialVal = val;
    let r2000 = 0;
    let r500 = 0;
    let r200 = 0;
    let r100 = 0;
    let withdraw = false;
    if (this.depositObject.r2000 > 0 && val >= 2000) {
      while (val >= 2000 && val % 2000 >= 0) {
        ++r2000;
        val = val - 2000;
        withdraw = true;
      }
    }
    if (this.depositObject.r500 > 0 && val >= 500) {
      while (val >= 500 && val % 500 >= 0) {
        ++r500;
        val = val - 500;
        withdraw = true;
      }
    }
    if (this.depositObject.r200 > 0 && val >= 200) {
      while (val >= 200 && val % 200 >= 0) {
        ++r200;
        val = val - 200;
        withdraw = true;
      }
    }
    if (this.depositObject.r100 > 0 && val >= 100) {
      while (val >= 100 && val % 100 >= 0) {
        ++r100;
        val = val - 100;
        withdraw = true;
      }
    }

    if (val > 0) {
      withdraw = false;
    }

    if (withdraw) {
      this.logArray.unshift({
        title: 'Withdraw',
        style: 'alert alert-success',
        amount: initialVal,
        r2000: r2000,
        r500: r500,
        r200: r200,
        r100: r100,
        date: new Date(),
      });
      this.depositObject.r2000 = this.depositObject.r2000 - r2000;
      this.depositObject.r500 = this.depositObject.r500 - r500;
      this.depositObject.r200 = this.depositObject.r200 - r200;
      this.depositObject.r100 = this.depositObject.r100 - r100;
    } else {
      this.logArray.unshift({
        title: 'Cannot Withdraw',
        style: 'alert alert-danger',
        date: new Date(),
      });
    }
    this.withdrawalAmount.nativeElement.value = '';
  }
}
