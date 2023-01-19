import React, { useEffect, useState } from "react";
import { paginate } from "../helper/paginate";
import Pagination from "./Pagination";
import SideBar from "./SideBar";

const TabelProduct = ({ products , value}) => {
  const data = products.products;
  const [query, setQuery] = useState(value);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const searchData = (data) => {

    return data.filter(
      (item) =>
        item.brand.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query)
        // item.stock.includes(query)
    );
  };

  const changeSeacrh = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    searchData(data)
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };


  // console.log(data.filter((item) => console.log(item.price)));

  const paginatedProduct = paginate(searchData(data), currentPage, pageSize);

  // console.log(data.filter(item => item.brand.toLowerCase().includes("fe")));

  // console.log(categories?.value)

  return (
    <div className="md:flex">
      <SideBar />
      <div className="w-full px-2 md:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-between items-end py-5">
        
          <div >
            <select
              id={data.category}
              onChange={changeSeacrh}
              className="w-full border-2 border-blue-100 p-1 outline-none indent-2 rounded-md"
            >
              <option>Choose a Category</option>
              {data.map((item) => (
                 <option key={item.id} value={item.category}>{item.category}</option>
              ))}
            </select>
          </div>
          
          <div>
          <input
            type="text"
            placeholder="Search Product"
            onChange={changeSeacrh}
            className="border-2 border-blue-100 p-1 outline-none indent-2 rounded-md"
          />
          </div>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full border-collapse border border-blue-100">
            <thead className="text-xs text-gray-700 uppercase bg-slate-100">
              <tr>
                <th scope="col" className="px-6 py-3 border border-blue-100">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3 border border-blue-100">
                  Barnd
                </th>
                <th scope="col" className="px-6 py-3 border border-blue-100">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 border border-blue-100">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 border border-blue-100">
                  Category
                </th>
              </tr>
            </thead>
            {paginatedProduct.map((item) => (
              <tbody key={item.id}>
                <tr className="bg-white text-xs md:text-base">
                  <td className="px-6 py-4 border border-blue-100">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 border border-blue-100">
                    {item.brand}
                  </td>
                  <td className="px-6 py-4 border border-blue-100">
                    ${item.price}
                  </td>
                  <td className="px-6 py-4 border border-blue-100">
                    {item.stock}
                  </td>
                  <td className="px-6 py-4 border border-blue-100">
                    {item.category}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className="flex justify-end items-end mt-10">
          <Pagination
            items={data.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TabelProduct;
