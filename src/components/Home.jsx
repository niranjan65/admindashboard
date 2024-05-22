import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaArrowLeft, FaDownload, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from './Pagination';
import { FiSearch } from "react-icons/fi";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKey, setSearchKey] = useState("harry potter");
  const [pageNumber, setPageNumber] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [time, setTime] = useState(new Date().getHours());

  const book = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${searchKey}&limit=${limit}&offset=${pageNumber * limit}`
      );
      if (response.ok) {
        const data = await response.json();
        setBooks(data.docs);
        setTotalPages(Math.ceil(data.numFound / limit));
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const greeting = () => {
    if (time < 12) {
      return "Good morning!";
    } else if (time < 18) {
      return "Good afternoon!";
    } else {
      return "Good evening!";
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setPageNumber(page);
    }
  };

  useEffect(() => {
    book();
  }, [pageNumber, limit, searchKey]);

  useEffect(() => {
    if (sortConfig.key) {
      const sortedBooks = [...books].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setBooks(sortedBooks);
    }
  }, [sortConfig, books]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSortUp/>;
  };

  return (
    <div className="w-full p-5 flex flex-col gap-5">
      <div className="w-full bg-blue-600 flex justify-between h-16 items-center rounded-md p-2">
        <h1 className="text-2xl md:text-4xl font-bold text-white">Hey {greeting()}</h1>
        <p className="bg-yellow-400 rounded-full flex items-center p-2">User</p>
      </div>

      <h1 className="text-2xl md:text-3xl">Books</h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative flex items-center w-full md:w-[70%]">
          <FiSearch className="absolute left-4 text-gray-500" />
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="Search for books"
            className="pl-12 pr-20 py-2 rounded-full border w-full focus:outline-none focus:border-blue-500"
          />
          <button
            className="absolute right-2 bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800 focus:outline-none"
            onClick={() => setPageNumber(0)}
          >
            Search
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <p>Download</p>
          <FaDownload />
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="font-bold bg-[#e7e5fa]">
                  <th className="p-5 rounded-tl-md rounded-bl-md" onClick={() => requestSort("ratings_average")}>
                    <div className="flex items-center gap-2">
                      Rating_Average {getSortIcon("ratings_average")}
                    </div>
                  </th>
                  <th className="p-5" onClick={() => requestSort("author_name")}>
                    <div className="flex items-center gap-2">
                      Author Name {getSortIcon("author_name")}
                    </div>
                  </th>
                  <th className="p-5" onClick={() => requestSort("title")}>
                    <div className="flex items-center gap-2">
                      Title {getSortIcon("title")}
                    </div>
                  </th>
                  <th className="p-5" onClick={() => requestSort("first_publish_year")}>
                    <div className="flex items-center gap-2">
                      First_Publish_Year {getSortIcon("first_publish_year")}
                    </div>
                  </th>
                  <th className="p-5" onClick={() => requestSort("subject")}>
                    <div className="flex items-center gap-2">
                      Subject {getSortIcon("subject")}
                    </div>
                  </th>
                  <th className="p-5" onClick={() => requestSort("author_birth_date")}>
                    <div className="flex items-center gap-2">
                      Author_Birth_Date {getSortIcon("author_birth_date")}
                    </div>
                  </th>
                  <th className="p-5 rounded-tr-md rounded-br-md" onClick={() => requestSort("author_top_work")}>
                    <div className="flex items-center gap-2">
                      Author_Top_Work {getSortIcon("author_top_work")}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((res) => (
                  <tr key={res.key} className="border-b-2">
                    <td className="p-5">{res.ratings_average?.toFixed(2) ?? "NA"}</td>
                    <td className="p-5">{res.author_name?.join(", ") ?? "NA"}</td>
                    <td className="p-5">{res.title}</td>
                    <td className="p-5">{res.first_publish_year}</td>
                    <td className="p-5">{(res.subject && res.subject[1]) ?? "NA"}</td>
                    <td className="p-5">{res.author_birth_date ?? "NA"}</td>
                    <td className="p-5">{res.author_top_work ?? "NA"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
            <select
              name="record"
              id="record"
              className="border border-black rounded-lg p-2"
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPageNumber(0); // Reset to the first page when limit changes
              }}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>

            <div className="flex gap-2 items-center">
              <FaArrowLeft onClick={() => handlePageChange(pageNumber - 1)} />
              <Pagination
                currentPage={pageNumber}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
              <FaArrowRight onClick={() => handlePageChange(pageNumber + 1)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
