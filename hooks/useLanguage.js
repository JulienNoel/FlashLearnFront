import { useState, useEffect } from 'react';

function useLanguage(language) {
    
  
    const listLangues = [
        {
          language: "Anglais",
          langAbrev: "en",
          image: require("../assets/royaume-uni.png"),
        },
        {
          language: "Italien",
          langAbrev: "it",
          image: require("../assets/italie.png"),
        },
        {
          language: "Espagnol",
          langAbrev: "es",
          image: require("../assets/espagne.png"),
        },
        {
          language: "Thailandais",
          langAbrev: "th",
          image: require("../assets/thailande.png"),
        },
        {
          language: "Portugais",
          langAbrev: "pt",
          image: require("../assets/le-portugal.png"),
        },
      ];
  
       
    return listLangues.filter((e) => e.langAbrev === language);
  }

  export default useLanguage