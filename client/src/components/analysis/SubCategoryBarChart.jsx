import SingleBarChart from "@/components/charts/SingleBarChart";
import useAnalysisConfig from "./useAnalysisConfig";
import moment from "moment";

const SubCategoryBarChart = ({
  list,
  year = moment().year(),
  month = moment().month(),
}) => {
  const { expenseTotalConfig } = useAnalysisConfig();
  const dd = expenseTotalConfig?.subCat?.data?.[year]?.[month];
  const FF = list.map((item) => {
    const value = dd?.[item]?.total || 0; // fallback to 0 if missing
    return {
      Title: item,
      Amount: value,
    };
  });

  return (
    <>
      <SingleBarChart
        barInfo={{ data: FF, label: "sub", color: "var(--color-expense)" }}
      ></SingleBarChart>
    </>
  );
};

export default SubCategoryBarChart;
