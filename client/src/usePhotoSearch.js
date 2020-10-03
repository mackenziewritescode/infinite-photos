import { useEffect, useState } from "react";
import axios from "axios";

export default function usePhotoSearch(keyword, page) {
  const [loading, setLoading] = useState(true);
  const [photoArr, setPhotoArr] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPhotoArr([]);
  }, [keyword]);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/photos?keyword=${keyword}&page=${page}`).then((res) => {
      setPhotoArr((prevPhotoArr) => {
        return [...new Set([...prevPhotoArr, ...res.data.results])];
      });
      setHasMore(res.data.results.length > 0);
      setLoading(false);
    });
  }, [keyword, page]);

  return { loading, photoArr, hasMore };
}
