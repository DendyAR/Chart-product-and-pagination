import React, { useState } from "react";
import { paginate } from "../helper/paginate";
import Pagination from "./Pagination";
import SideBar from "./SideBar";

const TabelProduct = ({products}) => {
  const data = products.products

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  const paginatedProduct = paginate(data, currentPage, pageSize)



  // console.log(data)

  return (
    <div className="md:flex">
      <SideBar />
      <div className="w-full px-2 md:px-10 py-10">
        <div className="flex justify-end items-end py-5">
          <input
            type="text"
            placeholder="Search Product"
            className="border-2 border-blue-100 p-1 outline-none indent-2 rounded-md"
          />
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
                <td className="px-6 py-4 border border-blue-100">{item.title}</td>
                <td className="px-6 py-4 border border-blue-100">{item.brand}</td>
                <td className="px-6 py-4 border border-blue-100">${item.price}</td>
                <td className="px-6 py-4 border border-blue-100">{item.stock}</td>
                <td className="px-6 py-4 border border-blue-100">{item.category}</td>
              </tr>
            </tbody>
          ))}
          </table>
        </div>
        <div className="flex justify-end items-end mt-10">
        <Pagination items={data.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  );
};

export default TabelProduct;
