import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'vending-machine-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;

  productId = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    this.editProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cost: new FormControl(0, [Validators.required]),
      amountAvailable: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.productId = productId;
      this.fetchAndInitProduct();
    } else {
      this.router.navigate(['/app/management']);
    }
  }

  fetchAndInitProduct() {
    this.productService.getById(this.productId).subscribe({
      next: (product) => {
        this.editProductForm.setValue({
          name: product.name,
          cost: product.cost,
          amountAvailable: product.amountAvailable,
        });
      },
      error: () => {
        this.toastService.showError(
          'Whoops',
          'An error has ocurred when fetching the product'
        );
      },
    });
  }

  updateProduct() {
    this.productService
      .updateProductById(this.productId, this.editProductForm.value)
      .subscribe({
        next: () => {
          this.toastService.showSuccess(
            'Product updates successfully',
            'The product has been updated'
          );

          this.router.navigate(['/app/management']);
        },
        error: () => {
          this.toastService.showError(
            'Whoops',
            'An error has ocurred when updating the product'
          );
        },
      });
  }
}
