export default function(language = '', action) {
    if(action.type == 'selectLang') {
      console.log(action)
      return action.language;
    } else {
      return language;
    }  
   }