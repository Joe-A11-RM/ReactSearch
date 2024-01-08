import React, { useEffect, useState } from "react";
import "./Search.css";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export default function Search() {
  const [searchdata, setSearchdata] = useState([]);
  const [filtereddata, setFilterdata] = useState([]);
  const [wordEntered , setEnteredword] = useState('');
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setSearchdata(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const handleFilter = (e) => {
    const searchword = e.target.value;
    setEnteredword(searchword)
    const newFilter = searchdata.filter((value) => {
      return value.title.toLowerCase().includes(searchword.toLowerCase());
    });
    if (searchword == "") {
      setFilterdata([]);
    } else {
      setFilterdata(newFilter);
    }
  };
  const clear = () =>{
    setFilterdata([])
    setEnteredword("")
  }
  const data = filtereddata.map((i) => {
    return <li key={i.id}>{i.title}</li>;
  });
  return (
    <div className="search">
      <div className="search-bar">
        <input type="text" placeholder="Search..." value={wordEntered} onChange={handleFilter} />
        <div className="search-icon">
          {data.length === 0 ? <FaSearch/> : <IoMdClose  onClick={clear} />}
        </div>
      </div>

      {data.length != 0 && (
        <div className="search-result">
          <div className="search-data">
            <ul>{data}</ul>
          </div>
        </div>
      )}
    </div>
  );
}
