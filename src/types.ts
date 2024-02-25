export interface ProductDetails {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

interface Image {
  id: number;
  sort_order: number | null;
  attachment_type: string;
  class_name: string;
  created_at: string;
  thumbnail: string;
  large: string;
  small: string;
  extra_small: string;
  original: string;
  extra_props: {
    identified: boolean;
  };
}

export interface ProductCategory {
  id: number;
  parent_category_id: number;
  title: string;
  category_type: string;
  class_name: string;
  created_at: string;
  images: Image[];
}

export interface Product {
  id: number;
  title: string;
  brand: string | null;
  sap_id: string;
  sku: string;
  class_name: string;
  created_at: string;
  favorite: boolean;
  categories: ProductCategory[];
  original_price: string;
  discounted_price: string;
  price: string;
  quantity: number;
  max_allowed_quantity: number;
  shelf_zone: string;
  shelf_section: string;
  storage_shelf_zone: string;
  storage_shelf_section: string;
  sap_quantity: number;
  store_id: number;
  tax_percentage: string;
  properties: any[];
  store_product_id: number;
  images: Image[];
}
export interface Category {
  id: number;
  title: string;
}
