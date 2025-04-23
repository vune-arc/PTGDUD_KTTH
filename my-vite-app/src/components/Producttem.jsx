// ProductItem.js
import React from "react";

export default function ProductItem({ product, handleDelete }) {
  return (
    <tr className="border-t">
      <td className="py-2 px-4">{product.name}</td>
      <td className="py-2 px-4">{product.price.toLocaleString()} ₫</td>
      <td className="py-2 px-4">{product.category}</td>
      <td className="py-2 px-4">{product.stock}</td>
      <td className="py-2 px-4 text-center">
        <button
          onClick={() => handleDelete(product.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Xoá
        </button>
      </td>
    </tr>
  );
}
