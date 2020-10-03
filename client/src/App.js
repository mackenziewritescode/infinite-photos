import React, { useState, useRef, useCallback } from "react";
import "./App.scss";
import usePhotoSearch from "./usePhotoSearch";
import text from "./text";

function App() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const observer = useRef();

  const { loading, photoArr, hasMore } = usePhotoSearch(keyword, page);

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
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (e.value !== "") {
      setKeyword(input);
      setPage(1);
    }
  }

  const photos = photoArr.map((photo, index) => {
    // if this is the last photo in the array, give it a ref
    if (photoArr.length === index + 1) {
      return (
        <div ref={lastPhotoRef} className="thumb" key={photo.id}>
          <a href={photo.links.html}>
            <img className="photo" src={photo.urls.thumb} alt="" />
          </a>
        </div>
      );
      // every photo except the last in the array
    } else {
      return (
        <div className="thumb" key={photo.id}>
          <a href={photo.links.html}>
            <img className="photo" src={photo.urls.thumb} alt="" />
          </a>
        </div>
      );
    }
  });

  return (
    <div className="App">
      <header>
        <div id="gradient">
          <h1>Infinite Photos</h1>
          {text}
        </div>
      </header>
      <div id="sticky">
        <form id="search-wrap" onSubmit={handleSubmit}>
          <div id="search-bar">
            <input
              type="text"
              value={input}
              onChange={handleInput}
              placeholder="Search for anything, like 'coffee.'"
            ></input>
          </div>
          <input id="search-button" type="submit" value="Search" />
        </form>
      </div>
      <div id="content">
        {photos}
        {loading && "Loading..."}
      </div>
    </div>
  );
}

export default App;

// run with: npm run dev
