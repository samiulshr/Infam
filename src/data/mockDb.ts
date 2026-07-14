export type ProductStatus = 'draft' | 'active';

export interface ProductVariant {
  size: string;
  color: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  descriptionShort: string;
  descriptionLong: string;
  categoryId: string;
  price: number;
  salePrice?: number | null;
  sku: string;
  stockQuantity: number;
  lowStockThreshold: number;
  status: ProductStatus;
  images: string[];
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  parentId?: string | null;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  variant: { size: string; color: string };
  qty: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: string;
  shippingAddress: any;
  createdAt: string;
}

export const mockCategories: Category[] = [
  { id: 'c1', name: 'Outerwear', slug: 'outerwear', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&auto=format&fit=crop&q=80', description: 'Refined silhouettes crafted for the modern individual.' },
  { id: 'c2', name: 'Shirts & Tops', slug: 'shirts-tops', image: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=800&auto=format&fit=crop&q=80', description: 'Essential shirts and tops.' },
  { id: 'c3', name: 'Trousers', slug: 'trousers', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=80', description: 'Tailored trousers.' },
  { id: 'c4', name: 'Dresses', slug: 'dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80', description: 'Elegant dresses.' },
  { id: 'c5', name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop&q=80', description: 'Finishing touches.' },
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'The Sculpted Overcoat',
    slug: 'sculpted-overcoat',
    descriptionShort: 'An architectural silhouette crafted from pure virgin camel hair.',
    descriptionLong: 'An architectural silhouette crafted from pure virgin camel hair. The Sculpted Overcoat features a tailored shoulder and a subtle A-line drape, offering a modern interpretation of a timeless classic.\n\nHand-finished in our Italian atelier, this piece is designed for those who value heritage quality and sharp, modern lines.',
    categoryId: 'c1',
    price: 1850.00,
    salePrice: null,
    sku: 'OUT-001',
    stockQuantity: 24,
    lowStockThreshold: 5,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&auto=format&fit=crop&q=80',
    ],
    variants: [
      { size: 'XS', color: 'Camel', stock: 5 },
      { size: 'S', color: 'Camel', stock: 8 },
      { size: 'M', color: 'Camel', stock: 6 },
      { size: 'L', color: 'Camel', stock: 5 },
    ],
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
  },
  {
    id: 'p2',
    name: 'Essential Silk Blend Shirt',
    slug: 'essential-silk-shirt',
    descriptionShort: 'A fluid, tailored essential for everyday wear.',
    descriptionLong: 'Crafted from a luxurious silk and cotton blend, this shirt offers an impeccable drape and supreme comfort.',
    categoryId: 'c2',
    price: 420.00,
    salePrice: null,
    sku: 'SHI-001',
    stockQuantity: 112,
    lowStockThreshold: 20,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=800&auto=format&fit=crop&q=80',
    ],
    variants: [
      { size: 'S', color: 'Ivory', stock: 40 },
      { size: 'M', color: 'Ivory', stock: 42 },
      { size: 'L', color: 'Ivory', stock: 30 },
    ],
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
  },
  {
    id: 'p3',
    name: 'Pleated Wool Trouser',
    slug: 'pleated-wool-trouser',
    descriptionShort: 'Classic tailoring meets modern ease.',
    descriptionLong: 'Relaxed yet refined, these trousers feature a sharp pleat and are crafted from breathable tropical wool.',
    categoryId: 'c3',
    price: 780.00,
    salePrice: 620.00,
    sku: 'TRO-001',
    stockQuantity: 8,
    lowStockThreshold: 10,
    status: 'active',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=80',
    ],
    variants: [
      { size: '48', color: 'Wood Tan', stock: 3 },
      { size: '50', color: 'Wood Tan', stock: 5 },
    ],
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
  }
];

export const mockOrders: Order[] = [
  {
    id: 'o1',
    orderNumber: '#INF-92842',
    customerId: 'cust1',
    items: [
      { productId: 'p1', variant: { size: 'M', color: 'Camel' }, qty: 1, unitPrice: 1850.00 }
    ],
    subtotal: 1850.00,
    deliveryFee: 0,
    discountAmount: 0,
    total: 1850.00,
    status: 'delivered',
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    shippingAddress: { line1: '123 Luxury St', city: 'London', postalCode: 'W1' },
    createdAt: '2024-10-24T10:00:00Z'
  },
  {
    id: 'o2',
    orderNumber: '#INF-92841',
    customerId: 'cust2',
    items: [
      { productId: 'p3', variant: { size: '50', color: 'Wood Tan' }, qty: 1, unitPrice: 620.00 }
    ],
    subtotal: 620.00,
    deliveryFee: 20.00,
    discountAmount: 0,
    total: 640.00,
    status: 'processing',
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    shippingAddress: { line1: '456 High St', city: 'Paris', postalCode: '75001' },
    createdAt: '2024-10-24T12:00:00Z'
  }
];

export const mockCustomers: Customer[] = [
  { id: 'cust1', name: 'Eleanor Whispering', email: 'e.whispering@vogue.co.uk', phone: '+44 20 7946 0123', createdAt: '2023-10-12T10:00:00Z' },
  { id: 'cust2', name: 'Julian Mercer', email: 'j.mercer@paris.com', phone: '+33 1 42 68 53 00', createdAt: '2024-01-05T10:00:00Z' }
];
