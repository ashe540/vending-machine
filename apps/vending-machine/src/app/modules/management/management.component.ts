import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { IProduct } from '@vending-machine/api-interfaces';
import { ProductService } from '../../core/services/product.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'vending-machine-seller',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
  products: IProduct[] = [];
  page = 1;
  limit = 10;

  @ViewChild('deleteProductModal') deleteProductModal:
    | SwalComponent
    | undefined;

  selectedProductId: string | undefined;

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastService: ToastService,
    public readonly swalTargets: SwalPortalTargets
  ) {}

  ngOnInit(): void {
    this.fetchProductsBySeller();
  }

  fetchProductsBySeller() {
    this.productService.getAllBySeller(this.page, this.limit).subscribe({
      next: (data) => {
        this.products = data.results;
      },
      error: () => {
        this.toastService.showError(
          'Whoops',
          'Something went wrong when fetching your products'
        );
      },
    });
  }

  addProduct() {
    this.router.navigate([`/app/management/new`]);
  }

  editProduct(productId: string) {
    this.router.navigate([`/app/management/edit/${productId}`]);
  }

  deleteProduct(productId: string, force: boolean = false) {
    if (!force) {
      this.selectedProductId = productId;
      this.deleteProductModal?.fire();
    }
  }

  confirmDeletionProduct() {
    if (this.selectedProductId) {
      this.productService.deleteProductById(this.selectedProductId).subscribe({
        next: () => {
          this.toastService.showSuccess(
            'Product deleted successfully',
            'The selected product has been removed'
          );

          // Refresh product list
          this.fetchProductsBySeller();
        },
        error: () => {
          this.toastService.showError(
            'Whoops',
            'Something went wrong when trying to delete the product'
          );
        },
      });
    }
  }

  resetSelectedProduct() {
    this.selectedProductId = undefined;
  }
}
