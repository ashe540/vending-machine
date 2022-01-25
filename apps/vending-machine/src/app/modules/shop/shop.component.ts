import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct, IPurchaseResult } from '@vending-machine/api-interfaces';
import { AccountService } from '../../core/services/account.service';
import { ProductService } from '../../core/services/product.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'vending-machine-buyer',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  depositAmount = 0;

  constructor(
    private accountService: AccountService,
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.fetchDepositAmount();
    this.fetchProducts();
  }

  fetchDepositAmount() {
    this.accountService.getDeposit().subscribe((data) => {
      this.depositAmount = data.deposit;
    });
  }

  fetchProducts() {
    this.productService.getAll().subscribe((data) => {
      this.products = data.results;
    });
  }

  purchaseProduct(productId: string) {
    this.productService.purchaseById(productId).subscribe({
      next: (data: IPurchaseResult) => {
        if (data.message) {
          this.toastService.showWarning('', data.message);
        } else {
          const foundProduct = this.products.find((el) => el._id === productId);

          if (foundProduct) {
            this.toastService.showSuccess(
              'Wohoo!',
              `${foundProduct.name} has been purchased successfully`
            );
          }

          // Refresh the deposit amount after purchase
          this.fetchDepositAmount();
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.toastService.showError(
          'Something went wrong during the purchase',
          err?.error?.message
        );
      },
    });
  }
}
