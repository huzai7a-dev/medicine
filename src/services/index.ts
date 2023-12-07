/* eslint-disable no-useless-catch */
import { PaginatedMedicines } from "../interfaces/medicine";
import apiClient from "../lib/apiClient";

const searchByCriteria = async (findBy: string, searchText: string) => {
  try {
    const response = await apiClient.post("find-by", {
      searchCriteria: findBy,
      searchQuery: searchText,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const searchPrescription = async (brandNames: string[]) => {
  try {
    const response = await apiClient.post("/search-prescription", {
      brandNames: brandNames,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const uploadPrescription = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const response = await apiClient.post("/upload-prescription", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllMedicines = async (
  page = 1,
  pageSize = 20
): Promise<PaginatedMedicines> => {
  const response = await apiClient.get(
    `/get-all-medicines?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

export {
  searchByCriteria,
  searchPrescription,
  uploadPrescription,
  getAllMedicines,
};
