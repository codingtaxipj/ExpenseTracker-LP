import {
  selectMMofMonth,
  selectMMofPrime,
  selectMMofSub,
} from "@/redux/slices/minmax-slice";
import { useSelector } from "react-redux";

const useMinMaxConfig = () => {
  const { MinMaxLoading, MinMaxError } = useSelector((state) => state.MM);
  const MMofMonth = useSelector(selectMMofMonth);
  const MMofPrime = useSelector(selectMMofPrime);
  const MMofSub = useSelector(selectMMofSub);

  const MMgetPrimeofYear = (year) =>
    MMofPrime?.find((l) => l.year === year) ?? null;

  return {
    MMofMonth,
    MMofPrime,
    MMofSub,
    MMgetPrimeofYear,
    MinMaxLoading,
    MinMaxError,
  };
};

export default useMinMaxConfig;
