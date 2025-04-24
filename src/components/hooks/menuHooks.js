import { useEffect, useState } from "react";
import { rootUrl, url } from "../../utils/variables";
import { fetchData } from "../../utils/fetchData";

const useMenu = () => {
  const [menuArray, setMenuArray] = useState([]);

  const getMenu = async () => {
    try {
      const mediaData = await fetchData(url + "/menu");
      const favorites = mediaData[1].items

      const transformedFavorites = favorites.map(item => ({
        src: rootUrl + item.filename,
        name: item.name,
        price: item.price
      }));


      setMenuArray(transformedFavorites)

    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return menuArray;
};

export default useMenu;
