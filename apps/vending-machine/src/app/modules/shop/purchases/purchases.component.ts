import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPurchase } from '@vending-machine/api-interfaces';
import { AccountService } from '../../../core/services/account.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'vending-machine-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss'],
})
export class PurchasesComponent implements OnInit {
  purchases: IPurchase[] | undefined;

  constructor(
    private accountService: AccountService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchPurchaseHistory();
  }

  fetchPurchaseHistory() {
    this.accountService.getPurchases().subscribe({
      next: (data) => {
        this.purchases = data.purchases;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.showError('Whoops', error?.error?.message);
      },
    });
  }
}
