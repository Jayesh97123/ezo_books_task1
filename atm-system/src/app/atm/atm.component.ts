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
    let r2000D = val.r2000 == '' || val.r2000 == null ? 0 : val.r2000;
    let r500D = val.r500 == '' || val.r500 == null ? 0 : val.r500;
    let r200D = val.r200 == '' || val.r200 == null ? 0 : val.r200;
    let r100D = val.r100 == '' || val.r100 == null ? 0 : val.r100;
    this.depositObject.r2000 += r2000D;
    this.depositObject.r500 += r500D;
    this.depositObject.r200 += r200D;
    this.depositObject.r100 += r100D;

    this.logArray.unshift({
      title: 'Deposit',
      style: 'alert alert-info',
      r2000: r2000D,
      r500: r500D,
      r200: r200D,
      r100: r100D,
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
      do {
        ++r2000;
        val -= 2000;
        withdraw = true;
      } while (val >= 2000 && r2000 < this.depositObject.r2000);
    }
    if (this.depositObject.r500 > 0 && val >= 500) {
      do {
        ++r500;
        val -= 500;
        withdraw = true;
      } while (val >= 500 && r500 < this.depositObject.r500);
    }
    if (this.depositObject.r200 > 0 && val >= 200) {
      do {
        ++r200;
        val -= 200;
        withdraw = true;
      } while (val >= 200 && r200 < this.depositObject.r200);
    }
    if (this.depositObject.r100 > 0 && val >= 100) {
      do {
        ++r100;
        val -= 100;
        withdraw = true;
      } while (val >= 100 && r100 < this.depositObject.r100);
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
      this.depositObject.r2000 -= r2000;
      this.depositObject.r500 -= r500;
      this.depositObject.r200 -= r200;
      this.depositObject.r100 -= r100;
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
