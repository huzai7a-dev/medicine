/* eslint-disable no-useless-catch */
import apiClient from "../lib/apiClient";

const searchByCriteria = async (findBy: string, searchText: string) => {
  try {
    const response = await apiClient.get("find-by", {
      params: {
        searchCriteria: findBy,
        searchQuery: searchText,
      },
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
export { searchByCriteria, searchPrescription, uploadPrescription };
