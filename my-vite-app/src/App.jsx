import React, { useState } from "react";

const initialProducts = [
  { id: 1, name: "Áo thun nam", price: 199000, category: "Thời trang", stock: 15 },
  { id: 2, name: "Laptop ASUS", price: 15000000, category: "Công nghệ", stock: 5 },
  { id: 3, name: "Giày thể thao", price: 950000, category: "Thể thao", stock: 8 },
];

export default function ProductList() {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (id) => {
    const filtered = products.filter((product) => product.id !== id);
    setProducts(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Danh sách sản phẩm</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Tên sản phẩm</th>
            <th className="py-2 px-4 text-left">Giá</th>
            <th className="py-2 px-4 text-left">Danh mục</th>
            <th className="py-2 px-4 text-left">Tồn kho</th>
            <th className="py-2 px-4">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="py-2 px-4">{p.name}</td>
              <td className="py-2 px-4">{p.price.toLocaleString()} ₫</td>
              <td className="py-2 px-4">{p.category}</td>
              <td className="py-2 px-4">{p.stock}</td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                Không có sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
