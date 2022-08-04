export default function(listExercice = [], action) {
    if(action.type == 'addExercice') {
        
    var listExerciceCopy = [...listExercice]
        listExerciceCopy.push(action.exercice)
       
        
      return listExerciceCopy;
    } else {
      return listExercice;
    }  
   }