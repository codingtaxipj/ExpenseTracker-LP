import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useQueryToFetch = () => {
  const fetchData = async () => {
    const response = await axios.get("http://127.0.0.1:8080/expense/get-data");
    return response.data;
  };

  return useQuery({
    queryKey: ["expense"],
    queryFn: fetchData,
  });
};

export const useQueryToUpdate = () => {
  const pushData = async data => {
    const response = await axios.post(
      "http://127.0.0.1:8080/expense/add-data",
      data
    );
    return response.data;
  };

  return useMutation({
    mutationFn: pushData,
    onSuccess: data => {
      console.log("Expense added:", data);
      alert("Expense added successfully!");
    },
    onError: error => {
      console.error("Error adding expense:", error);
      alert("Something went wrong.");
    },
  });
};
