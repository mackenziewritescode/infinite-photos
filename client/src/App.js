import React, { useState, useRef, useCallback } from "react";
import "./App.css";
import usePhotoSearch from "./usePhotoSearch";
import Photo from "./Photo";

function App() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");

  const { loading, photoArr, hasMore } = usePhotoSearch(keyword, page);

  const observer = useRef();
  const lastPhotoRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleInput(e) {
    setInput(e.target.value);
    setPage(1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (e.value !== "") {
      setKeyword(input);
    }
  }

  const photos = photoArr.map((photo, index) => {
    if (photoArr.length === index + 1) {
      return <Photo ref={lastPhotoRef} key={photo.id} photo={photo} />;
    } else {
      return <Photo key={photo.id} photo={photo} />;
    }
  });

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleInput} />
        <input type="submit" value="Search" />
      </form>
      {keyword}
      {photos}
      {loading && "Loading..."}
    </div>
  );
}

export default App;

// start with: npm run dev
