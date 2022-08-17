export default function(listExercice = [], action) {
    if(action.type == 'addExercice') {
      
    const filtreExercice = action.exercice.map(({_id, ...rest}) => {
      return rest
    })
     
    let listExerciceCopy = [...listExercice]
        listExerciceCopy.push(filtreExercice)
       
        
      return listExerciceCopy;
    } else {
      return listExercice;
    }  
   }