export type ProductType =
  | 'ELECTRONICS'
  | 'CLOTHING'
  | 'FOOD'
  | 'HOME'
  | 'OTHER';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  productType: ProductType;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  productType: ProductType;
}
