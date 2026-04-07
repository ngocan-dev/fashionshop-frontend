export type ProductImage = {
  id?: string;
  url: string;
  alt?: string;
};

export type Product = {
  id: string;
  slug?: string;
  name: string;
  description?: string;
  price: number;
  color?: string;
  size?: string;
  colors?: string[];
  sizes?: string[];
  compareAtPrice?: number;
  stock: number;
  categoryId?: string;
  categoryName?: string;
  images: ProductImage[];
  active?: boolean;
};

export type ProductFilter = {
  keyword?: string;
  categoryId?: string;
  sortBy?: string;
};

export type UpsertProductRequest = {
  name: string;
  slug?: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  categoryId?: string;
  imageUrls: string[];
  active?: boolean;
};
