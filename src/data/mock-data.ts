/**
 * Mock data for frontend testing without a backend.
 * Remove this file (and the imports in services) once the real API is available.
 */

import type { AuthUser } from '@/types/common';
import type { Cart } from '@/types/cart';
import type { Order } from '@/types/order';
import type { Product } from '@/types/product';
import type { WishlistItem } from '@/types/wishlist';

//  Products (reused across cart & orders) 

export const mockProducts: Product[] = [
    {
        id: 'prod_001',
        slug: '18studio-sculpted-blazer',
        name: '18.STUDIO Sculpted Blazer',
        description: 'A precisely tailored blazer with architectural shoulders and a subtly nipped waist.',
        price: 1450.0,
        compareAtPrice: 1800.0,
        stock: 12,
        categoryId: 'cat_rw',
        categoryName: 'Ready-to-Wear',
        images: [{ id: 'img_001', url: '/images/product-blazer.svg', alt: 'Sculpted Blazer front view' }],
        colors: ['Black', 'Charcoal'],
        sizes: ['S', 'M', 'L'],
        active: true,
    },
    {
        id: 'prod_002',
        slug: 'kinetic-pleat-trousers',
        name: 'Kinetic Pleat Trousers',
        description: 'Wide-leg trousers featuring a single front pleat and fluid drape.',
        price: 890.0,
        stock: 24,
        categoryId: 'cat_rw',
        categoryName: 'Ready-to-Wear',
        images: [{ id: 'img_002', url: '/images/product-trousers.svg', alt: 'Pleat Trousers' }],
        colors: ['Ivory', 'Black'],
        sizes: ['S', 'M', 'L', 'XL'],
        active: true,
    },
    {
        id: 'prod_003',
        slug: 'draped-cotton-poplin',
        name: 'Draped Cotton Poplin',
        description: 'Relaxed-fit shirt in washed cotton poplin with asymmetric hem.',
        price: 620.0,
        stock: 36,
        categoryId: 'cat_rw',
        categoryName: 'Ready-to-Wear',
        images: [{ id: 'img_003', url: '/images/product-shirt.svg', alt: 'Cotton Poplin Shirt' }],
        colors: ['White', 'Pale Blue'],
        sizes: ['XS', 'S', 'M', 'L'],
        active: true,
    },
    {
        id: 'prod_004',
        slug: 'artisan-leather-tote',
        name: 'Artisan Leather Tote',
        description: 'Hand-stitched vegetable-tanned leather tote with interior zip pocket.',
        price: 1120.0,
        stock: 8,
        categoryId: 'cat_acc',
        categoryName: 'Accessories',
        images: [{ id: 'img_004', url: '/images/category-accessories.svg', alt: 'Leather Tote' }],
        active: true,
    },
    {
        id: 'prod_005',
        slug: 'minimal-wool-overcoat',
        name: 'Minimal Wool Overcoat',
        description: 'Double-faced wool overcoat with clean, collarless silhouette.',
        price: 2200.0,
        compareAtPrice: 2600.0,
        stock: 5,
        categoryId: 'cat_ow',
        categoryName: 'Outerwear',
        images: [{ id: 'img_005', url: '/images/category-outerwear.svg', alt: 'Wool Overcoat' }],
        colors: ['Camel', 'Black'],
        sizes: ['M', 'L', 'XL'],
        active: true,
    },
];

//  Mock User 
export const mockUser: AuthUser = {
    id: 'usr_001',
    email: 'jane.doe@18studio.com',
    fullName: 'Jane Doe',
    role: 'CUSTOMER',
    phoneNumber: '+1 555-012-3456',
    avatarUrl: undefined,
};

//  Mock Cart 
export const mockCart: Cart = {
    id: 'cart_001',
    items: [
        {
            id: 'ci_001',
            productId: mockProducts[0].id,
            quantity: 1,
            product: mockProducts[0],
        },
        {
            id: 'ci_002',
            productId: mockProducts[1].id,
            quantity: 2,
            product: mockProducts[1],
        },
        {
            id: 'ci_003',
            productId: mockProducts[3].id,
            quantity: 1,
            product: mockProducts[3],
        },
    ],
    subtotal: 1450.0 + 890.0 * 2 + 1120.0,
    shippingFee: 0,
    discount: 0,
    total: 1450.0 + 890.0 * 2 + 1120.0,
};

//  Mock Orders 

export const mockOrders: Order[] = [
    {
        id: 'ord_001',
        orderNumber: 'FS-20260401',
        status: 'DELIVERED',
        paymentMethod: 'CARD',
        items: [
            { productId: mockProducts[0].id, name: mockProducts[0].name, quantity: 1, price: 1450.0, total: 1450.0 },
        ],
        subtotal: 1450.0,
        shippingFee: 0,
        discount: 0,
        total: 1450.0,
        createdAt: '2026-03-15T10:30:00Z',
    },
    {
        id: 'ord_002',
        orderNumber: 'FS-20260318',
        status: 'SHIPPED',
        paymentMethod: 'E_WALLET',
        items: [
            { productId: mockProducts[1].id, name: mockProducts[1].name, quantity: 1, price: 890.0, total: 890.0 },
            { productId: mockProducts[2].id, name: mockProducts[2].name, quantity: 2, price: 620.0, total: 1240.0 },
        ],
        subtotal: 2130.0,
        shippingFee: 0,
        discount: 150.0,
        total: 1980.0,
        createdAt: '2026-03-18T14:22:00Z',
    },
    {
        id: 'ord_003',
        orderNumber: 'FS-20260405',
        status: 'PENDING',
        paymentMethod: 'COD',
        items: [
            { productId: mockProducts[4].id, name: mockProducts[4].name, quantity: 1, price: 2200.0, total: 2200.0 },
        ],
        subtotal: 2200.0,
        shippingFee: 15.0,
        discount: 0,
        total: 2215.0,
        createdAt: '2026-04-05T09:15:00Z',
    },
    {
        id: 'ord_004',
        orderNumber: 'FS-20260210',
        status: 'DELIVERED',
        paymentMethod: 'CARD',
        items: [
            { productId: mockProducts[3].id, name: mockProducts[3].name, quantity: 1, price: 1120.0, total: 1120.0 },
            { productId: mockProducts[1].id, name: mockProducts[1].name, quantity: 1, price: 890.0, total: 890.0 },
        ],
        subtotal: 2010.0,
        shippingFee: 0,
        discount: 100.0,
        total: 1910.0,
        createdAt: '2026-02-10T16:45:00Z',
    },
    {
        id: 'ord_005',
        orderNumber: 'FS-20260112',
        status: 'DELIVERED',
        paymentMethod: 'BANK_TRANSFER',
        items: [
            { productId: mockProducts[2].id, name: mockProducts[2].name, quantity: 3, price: 620.0, total: 1860.0 },
        ],
        subtotal: 1860.0,
        shippingFee: 0,
        discount: 0,
        total: 1860.0,
        createdAt: '2026-01-12T11:00:00Z',
    },
];

// Shop Catalog Products (matches the listing page IDs) 

export const mockCatalogProducts: Product[] = [
    { id: 'modular-tech-parka', slug: 'modular-tech-parka', name: 'Modular Tech Parka', description: 'A storm-ready parka with detachable quilted liner and articulated hood. Built for function, styled for the city.', price: 840, stock: 15, categoryName: 'Outerwear', images: [{ url: '/images/product-blazer.svg', alt: 'Modular Tech Parka' }], colors: ['Black', 'Orange'], sizes: ['S', 'M', 'L', 'XL'], active: true },
    { id: 'boxy-sculptural-blazer', slug: 'boxy-sculptural-blazer', name: 'Boxy Sculptural Blazer', description: 'Oversized blazer in structured gray wool with padded shoulders and a single-button closure.', price: 1250, stock: 10, categoryName: 'Tailoring', images: [{ url: '/images/product-blazer.svg', alt: 'Boxy Sculptural Blazer' }], colors: ['Gray', 'Charcoal'], sizes: ['S', 'M', 'L'], active: true },
    { id: 'archival-cargo-trousers', slug: 'archival-cargo-trousers', name: 'Archival Cargo Trousers', description: 'Relaxed cargo trousers in washed green denim with oversized utility pockets.', price: 560, stock: 20, categoryName: 'Bottoms', images: [{ url: '/images/product-trousers.svg', alt: 'Archival Cargo Trousers' }], colors: ['Dark Brown', 'Olive'], sizes: ['S', 'M', 'L', 'XL'], active: true },
    { id: 'oversized-ribbed-knit', slug: 'oversized-ribbed-knit', name: 'Oversized Ribbed Knit', description: 'Deep teal oversized knit with exaggerated ribbing and dropped shoulders.', price: 720, stock: 18, categoryName: 'Knitwear', images: [{ url: '/images/product-shirt.svg', alt: 'Oversized Ribbed Knit' }], colors: ['Off-White', 'Teal'], sizes: ['S', 'M', 'L', 'XL'], active: true },
    { id: 'tactical-layering-vest', slug: 'tactical-layering-vest', name: 'Tactical Layering Vest', description: 'High-visibility vest with technical panelling and concealed zip storage.', price: 440, stock: 22, categoryName: 'Outerwear', images: [{ url: '/images/product-blazer.svg', alt: 'Tactical Layering Vest' }], colors: ['Black', 'Orange'], sizes: ['M', 'L', 'XL'], active: true },
    { id: 'fluid-silk-shirt', slug: 'fluid-silk-shirt', name: 'Fluid Silk Shirt', description: 'A muted rose satin shirt with a relaxed silhouette and mother-of-pearl buttons.', price: 380, stock: 30, categoryName: 'Tailoring', images: [{ url: '/images/product-shirt.svg', alt: 'Fluid Silk Shirt' }], colors: ['Light Gray', 'Rose'], sizes: ['XS', 'S', 'M', 'L'], active: true },
    { id: 'architectural-shell-coat', slug: 'architectural-shell-coat', name: 'Architectural Shell Coat', description: 'Sharp-silhouette shell coat with bonded seams and a concealed front closure.', price: 1180, stock: 8, categoryName: 'Outerwear', images: [{ url: '/images/product-blazer.svg', alt: 'Architectural Shell Coat' }], colors: ['Gray', 'Black'], sizes: ['S', 'M', 'L'], active: true },
    { id: 'narrow-pleat-trousers', slug: 'narrow-pleat-trousers', name: 'Narrow Pleat Trousers', description: 'Slim-cut trousers with a single forward pleat in dark green wool blend.', price: 610, stock: 16, categoryName: 'Bottoms', images: [{ url: '/images/product-trousers.svg', alt: 'Narrow Pleat Trousers' }], colors: ['Dark Brown', 'Dark Green'], sizes: ['S', 'M', 'L'], active: true },
    { id: 'merino-column-knit', slug: 'merino-column-knit', name: 'Merino Column Knit', description: 'Fine-gauge merino wool knit with vertical column ribbing and a fitted profile.', price: 690, stock: 14, categoryName: 'Knitwear', images: [{ url: '/images/product-shirt.svg', alt: 'Merino Column Knit' }], colors: ['Off-White', 'Teal'], sizes: ['XS', 'S', 'M', 'L'], active: true },
    { id: 'technical-trench-layer', slug: 'technical-trench-layer', name: 'Technical Trench Layer', description: 'Storm-ready trench with waterproof membrane and reflective piping.', price: 920, stock: 6, categoryName: 'Outerwear', images: [{ url: '/images/product-blazer.svg', alt: 'Technical Trench Layer' }], colors: ['Black'], sizes: ['M', 'L', 'XL'], active: true },
    { id: 'sculpted-tailoring-jacket', slug: 'sculpted-tailoring-jacket', name: 'Sculpted Tailoring Jacket', description: 'Charcoal melange tailoring jacket with sculpted shoulders and a clean front.', price: 980, stock: 12, categoryName: 'Tailoring', images: [{ url: '/images/product-blazer.svg', alt: 'Sculpted Tailoring Jacket' }], colors: ['Gray', 'Charcoal'], sizes: ['S', 'M', 'L'], active: true },
    { id: 'utility-canvas-trousers', slug: 'utility-canvas-trousers', name: 'Utility Canvas Trousers', description: 'Faded olive canvas trousers with reinforced knee panels and tool loops.', price: 510, stock: 25, categoryName: 'Bottoms', images: [{ url: '/images/product-trousers.svg', alt: 'Utility Canvas Trousers' }], colors: ['Dark Brown', 'Olive'], sizes: ['S', 'M', 'L', 'XL'], active: true },
    { id: 'ribbed-layer-tee', slug: 'ribbed-layer-tee', name: 'Ribbed Layer Tee', description: 'Washed slate ribbed tee with extended body length for layering.', price: 260, stock: 40, categoryName: 'Knitwear', images: [{ url: '/images/product-shirt.svg', alt: 'Ribbed Layer Tee' }], colors: ['Light Gray', 'Slate'], sizes: ['XS', 'S', 'M', 'L'], active: true },
    { id: 'canvas-overcoat', slug: 'canvas-overcoat', name: 'Canvas Overcoat', description: 'Oversized canvas overcoat with raw-edged seams and a heavy horn-button closure.', price: 1040, stock: 7, categoryName: 'Outerwear', images: [{ url: '/images/product-blazer.svg', alt: 'Canvas Overcoat' }], colors: ['Black', 'Khaki'], sizes: ['M', 'L', 'XL'], active: true },
    { id: 'pressed-wool-blazer', slug: 'pressed-wool-blazer', name: 'Pressed Wool Blazer', description: 'Precision-cut gray wool blazer with hand-pressed seams and a slim notch lapel.', price: 1320, stock: 9, categoryName: 'Tailoring', images: [{ url: '/images/product-blazer.svg', alt: 'Pressed Wool Blazer' }], colors: ['Gray'], sizes: ['S', 'M', 'L'], active: true },
    { id: 'archival-straight-jeans', slug: 'archival-straight-jeans', name: 'Archival Straight Jeans', description: 'Deep washed green straight-leg jeans with selvedge denim and hidden rivets.', price: 540, stock: 20, categoryName: 'Bottoms', images: [{ url: '/images/product-trousers.svg', alt: 'Archival Straight Jeans' }], colors: ['Dark Brown', 'Green'], sizes: ['S', 'M', 'L'], active: true },
    { id: 'textured-wool-pullover', slug: 'textured-wool-pullover', name: 'Textured Wool Pullover', description: 'Forest teal textured wool pullover with a relaxed fit and rolled hem.', price: 760, stock: 12, categoryName: 'Knitwear', images: [{ url: '/images/product-shirt.svg', alt: 'Textured Wool Pullover' }], colors: ['Off-White', 'Forest Teal'], sizes: ['S', 'M', 'L', 'XL'], active: true },
    { id: 'reflective-panel-parka', slug: 'reflective-panel-parka', name: 'Reflective Panel Parka', description: 'Safety-striped parka with reflective panelling and a quilted interior.', price: 890, stock: 10, categoryName: 'Outerwear', images: [{ url: '/images/product-blazer.svg', alt: 'Reflective Panel Parka' }], colors: ['Black'], sizes: ['M', 'L', 'XL'], active: true },
    { id: 'soft-shoulder-jacket', slug: 'soft-shoulder-jacket', name: 'Soft Shoulder Jacket', description: 'Relaxed-drape jacket with softened shoulders and a deconstructed lining.', price: 1150, stock: 11, categoryName: 'Tailoring', images: [{ url: '/images/product-blazer.svg', alt: 'Soft Shoulder Jacket' }], colors: ['Light Gray', 'Beige'], sizes: ['S', 'M', 'L'], active: true },
    { id: 'relaxed-cargo-trousers', slug: 'relaxed-cargo-trousers', name: 'Relaxed Cargo Trousers', description: 'Dark moss denim cargo trousers with a relaxed fit and oversized pockets.', price: 590, stock: 18, categoryName: 'Bottoms', images: [{ url: '/images/product-trousers.svg', alt: 'Relaxed Cargo Trousers' }], colors: ['Dark Brown', 'Moss'], sizes: ['S', 'M', 'L', 'XL'], active: true },
    { id: 'longline-rib-knit', slug: 'longline-rib-knit', name: 'Longline Rib Knit', description: 'Warm charcoal green longline knit with deep ribbing and side slits.', price: 680, stock: 15, categoryName: 'Knitwear', images: [{ url: '/images/product-shirt.svg', alt: 'Longline Rib Knit' }], colors: ['Gray', 'Charcoal Green'], sizes: ['S', 'M', 'L'], active: true },
    { id: 'panelled-field-coat', slug: 'panelled-field-coat', name: 'Panelled Field Coat', description: 'Technical field coat with panelled construction and a drawstring waist.', price: 960, stock: 8, categoryName: 'Outerwear', images: [{ url: '/images/product-blazer.svg', alt: 'Panelled Field Coat' }], colors: ['Black', 'Navy'], sizes: ['M', 'L', 'XL'], active: true },
    { id: 'silk-drape-shirt', slug: 'silk-drape-shirt', name: 'Silk Drape Shirt', description: 'Muted satin brown shirt with a dramatic drape front and hidden placket.', price: 420, stock: 25, categoryName: 'Tailoring', images: [{ url: '/images/product-shirt.svg', alt: 'Silk Drape Shirt' }], colors: ['Off-White', 'Satin Brown'], sizes: ['XS', 'S', 'M', 'L'], active: true },
];

/** All mock products combined (original + shop catalog) */
export const allMockProducts: Product[] = [...mockProducts, ...mockCatalogProducts];

//  Mock Wishlist 

export const mockWishlist: WishlistItem[] = [
    { productId: 'prod_005', name: 'Minimal Wool Overcoat', price: 2200.0, slug: 'minimal-wool-overcoat', imageUrl: '/images/category-outerwear.svg' },
    { productId: 'boxy-sculptural-blazer', name: 'Boxy Sculptural Blazer', price: 1250.0, slug: 'boxy-sculptural-blazer', imageUrl: '/images/product-blazer.svg' },
    { productId: 'fluid-silk-shirt', name: 'Fluid Silk Shirt', price: 380.0, slug: 'fluid-silk-shirt', imageUrl: '/images/product-shirt.svg' },
    { productId: 'archival-cargo-trousers', name: 'Archival Cargo Trousers', price: 560.0, slug: 'archival-cargo-trousers', imageUrl: '/images/product-trousers.svg' },
];
