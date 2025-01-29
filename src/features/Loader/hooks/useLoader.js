import { useDispatch } from "react-redux"
import { setLoading } from "../loadingSlice"

export const useLoader = () => {
  const dispatch = useDispatch()

  const showLoader = () => {
  
      dispatch(setLoading(true))

  }

  const hideLoader = () => {
    
    dispatch(setLoading(false))
  }

  return { showLoader, hideLoader }
}

