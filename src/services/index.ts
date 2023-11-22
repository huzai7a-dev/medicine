/* eslint-disable no-useless-catch */
import apiClient from "../lib/apiClient";

const searchByCriteria = async(findBy: string,searchText:string) => {
    try {
        const response = await apiClient.get('find-by', {
            params: {
                searchCriteria:findBy,
                searchQuery:searchText
            }
        });
        return response.data
    } catch (error) {
        throw(error)       
    }
}

const searchPriscription = async(brandNames:string[]) => {
    try {
        const response = await apiClient.post('/search-prescription', {
            brandNames: brandNames
        });
        return response.data
    } catch (error) {
        throw(error)
    }
}

export {searchByCriteria,searchPriscription}