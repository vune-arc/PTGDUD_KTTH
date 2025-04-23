import React, { useState } from "react";

const initialProducts = [
  { id: 1, name: "Áo thun nam", price: 199000, category: "Thời trang", stock: 15 },
  { id: 2, name: "Laptop ASUS", price: 15000000, category: "Công nghệ", stock: 5 },
  { id: 3, name: "Giày thể thao", price: 950000, category: "Gia dụng", stock: 8 },
];

export default function ProductList() {
  const [products, setProducts] = useState(initialProducts);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    const { name, price, category, stock } = newProduct;

    if (!name || !price || !category || !stock) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
    };

    setProducts((prev) => [...prev, newItem]);
    setNewProduct({ name: "", price: "", category: "", stock: "" });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");
    if (confirmDelete) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tất cả" || p.category === selectedCategory;
    return matchesName && matchesCategory;
  });
  const totalProducts = filteredProducts.length;
  const totalStock = filteredProducts.reduce((total, product) => total + product.stock, 0);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 bg-white shadow-md rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Danh sách sản phẩm</h1>
      <div className="flex items-center gap-4 mb-4">
        {/* Ô tìm kiếm */}
        <input
          type="text"
          placeholder="Tìm sản phẩm theo tên..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border px-3 py-2 rounded w-80"
        />

        {/* Nút Tìm */}
        <button
          onClick={() => setSearchTerm(searchInput)}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 w-32"
        >
          Tìm
        </button>

        {/* Dropdown Lọc theo danh mục */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded w-56"
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Thời trang">Thời trang</option>
          <option value="Công nghệ">Công nghệ</option>
          <option value="Gia dụng">Gia dụng</option>
        </select>

        {/* Nút Lọc */}
        <button
          onClick={() => setSearchTerm(searchInput)}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 w-32"
        >
          Lọc
        </button>
      </div>

      {/* Form thêm sản phẩm */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Tên sản phẩm"
          className="border px-3 py-2 rounded"
          value={newProduct.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Giá"
          className="border px-3 py-2 rounded"
          value={newProduct.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Danh mục"
          className="border px-3 py-2 rounded"
          value={newProduct.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Tồn kho"
          className="border px-3 py-2 rounded"
          value={newProduct.stock}
          onChange={handleChange}
        />
        <button
          className="col-span-1 md:col-span-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          onClick={handleAddProduct}
        >
          Thêm sản phẩm
        </button>
      </div>

      {/* Bảng danh sách sản phẩm */}
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
          {filteredProducts.map((p) => (
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
   <div className="flex justify-between mb-4">
  <p className="text-lg font-semibold">Tổng sản phẩm: {products.length}</p>
  <p className="text-lg font-semibold">Tổng tồn kho: {products.reduce((total, product) => total + product.stock, 0)}</p>
</div>
    </div>
  );
}
