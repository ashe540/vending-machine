import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'vending-machine-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  depositForm: FormGroup;
  depositAmount: number | undefined;

  constructor(
    private accountService: AccountService,
    private toastService: ToastService
  ) {
    this.depositForm = new FormGroup({
      amount: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.fetchAvailableDeposit();
  }

  fetchAvailableDeposit() {
    this.accountService.getDeposit().subscribe((data) => {
      this.depositAmount = data.deposit;
    });
  }

  deposit() {
    if (this.depositForm.valid) {
      const amount = this.depositForm.get('amount')?.value;
      console.log('amount', amount);
      this.accountService.deposit(amount).subscribe({
        next: (data) => {
          // Refresh available balance
          this.fetchAvailableDeposit();

          // Clear the input
          this.depositForm.reset();

          this.toastService.showSuccess('Nice!', data.message);
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.showError(
            'An error has occurred processing your deposit',
            error?.error?.message
          );
        },
      });
    } else {
      this.toastService.showError(
        'Whoops',
        'The deposit amount is required. Please enter an amount and try again.'
      );
    }
  }

  resetBalance(): void {
    this.accountService.resetDeposit().subscribe({
      next: () => {
        this.fetchAvailableDeposit();
        this.toastService.showInfo(
          'Deposit cleared',
          'You have reset your deposit balance'
        );
      },
      error: (err: HttpErrorResponse) => {
        this.toastService.showError(
          'Something went wrong',
          err?.error?.message
        );
      },
    });
  }
}
