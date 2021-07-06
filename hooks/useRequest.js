import { useState, useEffect } from "react";
import axios from "axios";

import { apiRoutes } from "routes";

export function useRequest(path, key) {
  const [items, setItems] = useState([]);
  const dests = process.env.NEXT_PUBLIC_CREATORSHUB_APIS.split(",");

  useEffect(() => {
    dests.forEach(async (dest) => {
      await axios.get(`${dest}${path}`).then(({ data }) => {
        setItems((prev) => {
          if (Array.isArray(data[key])) return [...prev, ...data[key]];
          return [...prev, data[key]];
        });
      });
    });
  }, []);

  return { items };
}
