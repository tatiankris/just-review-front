import { instance } from "./api";



export const tagsAPI = {

    getTags() {
        return instance.get('/tags/tags')
    },
    getCategories() {
        return instance.get('/tags/categories')
    },

}


