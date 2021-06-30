import { createContext, useState } from "react";

export const FavoriteContext = createContext(null);

export default function FavContext  ({children})  {
    const [favorite, setFavorite] = useState(null);

    return(
        <FavoriteContext.Provider value={{favorite, setFavorite}}>
            {children}
        </FavoriteContext.Provider>
    )
}