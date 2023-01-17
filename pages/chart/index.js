import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import SideBar from "../../components/SideBar";
import { paginate } from "../../helper/paginate";

const Index = ({ products }) => {
  const data = products.carts;
  const pagesCart = data.find(x => x).products
  

  console.log(data.find(x => x).products.length);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const onPageChange = (page) => {
      setCurrentPage(page)
    }

    const paginatedProduct = paginate(data.find(x => x).products, currentPage, pageSize)

  return (
    <div className="md:flex">
      <SideBar />
      <div className="w-full px-2 md:px-10 py-10">
        <div className="flex flex-col">
          <h3>Cart ID: {data[0].id}</h3>
          <div className="flex flex-col py-10">
          <h3>Details</h3>
            <div className="w-full md:w-1/2 bg-blue-100 p-6 border-2 border-gray-400 grid grid-rows-2 grid-flow-col gap-10 justify-between items-start text-start">
              <div className="text-base font-normal">
                <h3>
                  UserID: <span>{data[0].userId}</span>
                </h3>
              </div>
              <div>
                <h3>
                  Added On: <span>Test</span>
                </h3>
              </div>
              <div>
                <h3>
         #Of Items: <span>{data[0].totalProducts}</span>
                </h3>
              </div>
              <div>
                <h3>
                  Total Amount: <span>{data[0].total}</span>
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="flex text-start py-5">
          <h3>Products</h3>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full border-collapse border border-blue-100">
            <thead className="text-xs text-gray-700 uppercase bg-slate-100">
              <tr>
                <th scope="col" className="px-6 py-3 border border-blue-100">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3 border border-blue-100">
                Quantity
                </th>
                <th scope="col" className="px-6 py-3 border border-blue-100">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 border border-blue-100">
                Total
                </th>
                <th scope="col" className="px-6 py-3 border border-blue-100">
                Discounted Price
                </th>
              </tr>
            </thead>
            {paginatedProduct.map((item) => (  
              <tbody key={item.id}>
                <tr className="bg-white text-xs md:text-base">
                  <td className="px-6 py-4 border border-blue-100">{item.title}</td>
                  <td className="px-6 py-4 border border-blue-100">{item.quantity}</td>
                  <td className="px-6 py-4 border border-blue-100">${item.price}</td>
                  <td className="px-6 py-4 border border-blue-100">{item.total}</td>
                  <td className="px-6 py-4 border border-blue-100">{item.discountedPrice}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className="flex justify-end items-end mt-10">
          <Pagination items={pagesCart.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
          </div>
      </div>
    </div>
  );
};
export default Index;

export const getStaticProps = async () => {
  const res = await fetch("https://dummyjson.com/carts");
  const data = await res.json();

  return {
    props: { products: data },
  };
};
