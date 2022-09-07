import { useFocusEffect } from '@react-navigation/native';
import { useState } from 'react';

function useRefresh() {

const [refresh, setRefresh] = useState(false)
   
useFocusEffect(() => {
  setRefresh(true)
  return () => {
    setRefresh(false)
  }
})
return refresh
}

export default useRefresh