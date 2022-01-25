import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '@vending-machine/api-interfaces';

@Component({
  selector: 'vending-machine-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  @Input() products: IProduct[] = [];
  @Input() showManagementButtons = false;
  @Input() showPurchaseButtons = false;

  @Output() editProduct: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteProduct: EventEmitter<string> = new EventEmitter<string>();
  @Output() purchaseProduct: EventEmitter<string> = new EventEmitter<string>();

  handleEditProduct(productId: string) {
    this.editProduct.emit(productId);
  }

  handleDeleteProduct(productId: string) {
    this.deleteProduct.emit(productId);
  }

  handlePurchaseProduct(productId: string) {
    this.purchaseProduct.emit(productId);
  }
}
