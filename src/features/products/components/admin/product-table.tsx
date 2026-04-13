'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import type { Product } from '@/types/product';

type Props = {
  products: Product[];
  onDelete: (id: string) => void;
};

export function ProductTable({ products, onDelete }: Props) {
  if (products.length === 0) return null;

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b border-neutral-100">
          <th className="px-6 py-5 text-[10px] uppercase text-neutral-400 text-center w-24">Image</th>
          <th className="px-6 py-5 text-[10px] uppercase text-neutral-400">Product Name</th>
          <th className="px-6 py-5 text-[10px] uppercase text-neutral-400">Category</th>
          <th className="px-6 py-5 text-[10px] uppercase text-neutral-400">Stock</th>
          <th className="px-6 py-5 text-[10px] uppercase text-neutral-400">Price</th>
          <th className="px-6 py-5 text-[10px] uppercase text-neutral-400">Status</th>
          <th className="px-6 py-5 text-[10px] uppercase text-neutral-400 text-right">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-neutral-50">
        {products.map((product) => {
          const status =
            product.stock === 0
              ? { label: 'Out of Stock', color: 'bg-error', textColor: 'text-error' }
              : product.active
              ? { label: 'Active', color: 'bg-green-500', textColor: 'text-black' }
              : { label: 'Draft', color: 'bg-neutral-400', textColor: 'text-neutral-500' };

          return (
            <tr key={product.id} className="hover:bg-surface-container-low/50 group">
              {/* Image */}
              <td className="px-6 py-4">
                <div className="relative w-12 h-16 mx-auto rounded overflow-hidden bg-neutral-100">
                  <Image
                    src={product.images?.[0]?.url || 'https://via.placeholder.com/150'}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </td>

              {/* Name */}
              <td className="px-6 py-4">
                <p className="font-bold text-sm">{product.name}</p>
                <p className="text-[10px] text-neutral-400 uppercase">
                  SKU: {product.slug?.toUpperCase() || product.id.slice(-8).toUpperCase()}
                </p>
              </td>

              {/* Category */}
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-neutral-100 rounded text-[10px] uppercase">
                  {product.categoryName || 'Uncategorized'}
                </span>
              </td>

              {/* Stock */}
              <td className="px-6 py-4 text-sm">{product.stock}</td>

              {/* Price */}
              <td className="px-6 py-4 font-semibold">
                ${product.price.toLocaleString()}
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className={cn('w-1.5 h-1.5 rounded-full', status.color)} />
                  <span className={cn('text-[11px] uppercase', status.textColor)}>
                    {status.label}
                  </span>
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100">
                  <Link href={`/admin/products/${product.id}/edit`}>
                    ✏️
                  </Link>
                  <button onClick={() => onDelete(product.id)}>
                    🗑
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}