import { selectCurrentFilter } from "@/redux/slices/filter-slice";
import { useDispatch, useSelector } from "react-redux";

export const useFilterConfig = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(selectCurrentFilter);
  return { currentFilter, dispatch };
};
