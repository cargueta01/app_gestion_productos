import {
  Component,
  computed,
  inject,
  OnInit,
  signal
} from '@angular/core';

import {
  CurrencyPipe
} from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { AuthService } from '../../../core/services/auth.service';
import { ProductService } from '../../../core/services/product.service';
import {
  Product,
  ProductRequest,
  ProductType
} from '../../../core/models/product.models';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  readonly authService = inject(AuthService);

  private readonly formBuilder = inject(FormBuilder);
  private readonly productService = inject(ProductService);

  readonly products = signal<Product[]>([]);
  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');
  readonly editingId = signal<number | null>(null);
  readonly isEditing = computed(() => this.editingId() !== null);

  readonly productTypes: ProductType[] = [
    'ELECTRONICS',
    'CLOTHING',
    'FOOD',
    'HOME',
    'OTHER'
  ];

  readonly productForm = this.formBuilder.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(120)
      ]
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.maxLength(1000)
      ]
    ],
    price: [
      0,
      [
        Validators.required,
        Validators.min(0.01)
      ]
    ],
    stock: [
      0,
      [
        Validators.required,
        Validators.min(0)
      ]
    ],
    productType: [
      'OTHER' as ProductType,
      Validators.required
    ]
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.productService.findAll().subscribe({
      next: products => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.errorMessage.set(
          'No fue posible cargar los productos.'
        );
      }
    });
  }

  submit(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);

    const request: ProductRequest =
      this.productForm.getRawValue();

    const productId = this.editingId();
    const operation = productId === null
      ? this.productService.create(request)
      : this.productService.update(productId, request);

    operation.subscribe({
      next: () => {
        this.saving.set(false);
        this.successMessage.set(
          productId === null
            ? 'Producto creado correctamente.'
            : 'Producto actualizado correctamente.'
        );
        this.resetForm();
        this.loadProducts();
      },
      error: error => {
        this.saving.set(false);

        if (error.status === 400) {
          this.errorMessage.set(
            'Revisa los datos ingresados.'
          );
        } else {
          this.errorMessage.set(
            'No fue posible guardar el producto.'
          );
        }
      }
    });
  }

  editProduct(product: Product): void {
    this.errorMessage.set('');
    this.successMessage.set('');
    this.editingId.set(product.id);

    this.productForm.setValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      productType: product.productType
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  deleteProduct(product: Product): void {
    if (!confirm(`¿Eliminar el producto "${product.name}"?`)) {
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set('');

    this.productService.delete(product.id).subscribe({
      next: () => {
        this.successMessage.set(
          'Producto eliminado correctamente.'
        );
        this.loadProducts();
      },
      error: error => {
        if (error.status === 403) {
          this.errorMessage.set(
            'No tienes permisos para eliminar productos.'
          );
        } else {
          this.errorMessage.set(
            'No fue posible eliminar el producto.'
          );
        }
      }
    });
  }

  resetForm(): void {
    this.editingId.set(null);

    this.productForm.reset({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      productType: 'OTHER'
    });
  }

  productTypeLabel(type: ProductType): string {
    const labels: Record<ProductType, string> = {
      ELECTRONICS: 'Electrónica',
      CLOTHING: 'Ropa',
      FOOD: 'Alimentos',
      HOME: 'Hogar',
      OTHER: 'Otro'
    };

    return labels[type];
  }
}
