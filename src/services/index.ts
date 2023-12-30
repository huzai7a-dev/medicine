/* eslint-disable no-useless-catch */
import { QueryType } from "../interfaces/common";
import { Medicine, PaginatedMedicines } from "../interfaces/medicine";
import apiClient from "../lib/apiClient";

const searchByCriteria = async (
  findBy: string,
  searchText: string,
  dosageForm = ""
) => {
  try {
    const response = await apiClient.post("find-by", {
      searchCriteria: findBy,
      searchQuery: searchText,
      dosageForm,
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

// ************ pharmacist services ********************
const getAllPharmacistMedicines = async (
  page = 1,
  pageSize = 20,
  deleted = false,
  query: QueryType | null = null
) => {
  let url = `/get-full-medicines?page=${page}&pageSize=${pageSize}&deleted=${deleted}`;
  if (query?.searchBy) {
    url = `/get-full-medicines?page=${page}&pageSize=${pageSize}&deleted=${deleted}&findBy=${query.searchBy}&value=${query.value}`;
  }
  const response = await apiClient.get(url);
  return response.data;
};

const updateMed = async ( data: Medicine): Promise<any> => {

    const response = await apiClient.put(`/medicine/${data.id}`, data);
    return response.data;
 
};

const deleteMedicine = async (id: number | string) => {
  const response = await apiClient.delete(`/medicine/${id}`);
  return response.data;
};
// ************* auth services ***********************
const signupUser = async (formData: {
  name: string;
  username: string;
  password: string;
  mobile_no: string;
  address: string;
  details: string;
}) => {
  const response = await apiClient.post("/auth/signup", {
    ...formData,
    is_public: true,
  });
  return response.data;
};

const loginUser = async (formData: { username: string; password: string }) => {
  const response = await apiClient.post("/auth/login", {
    ...formData,
    is_public: true,
  });
  return response.data;
};

export {
  searchByCriteria,
  searchPrescription,
  uploadPrescription,
  getAllMedicines,
  getAllPharmacistMedicines,
  deleteMedicine,
  signupUser,
  loginUser,
   updateMed,
};
