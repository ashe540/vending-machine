import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateEditProduct } from '@vending-machine/api-interfaces';
import { ProductService } from '../../../core/services/product.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'vending-machine-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  addProductForm: FormGroup;

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.addProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cost: new FormControl(0, [Validators.required]),
      amountAvailable: new FormControl(0, [Validators.required]),
    });
  }

  createProduct() {
    if (this.addProductForm.valid) {
      const product: ICreateEditProduct = {
        name: this.addProductForm.get('name')?.value,
        cost: this.addProductForm.get('cost')?.value,
        amountAvailable: this.addProductForm.get('amountAvailable')?.value,
      };
      this.productService.createProduct(product).subscribe({
        next: (data) => {
          this.toastService.showSuccess(
            'Product created successfully',
            data.message
          );

          this.router.navigate(['/app/management']);
        },
        error: () => {
          this.toastService.showError(
            'Something went wrong while creating the product'
          );
        },
      });
    } else {
      this.toastService.showError(
        'There are fields missing in order to create the product'
      );
    }
  }
}
