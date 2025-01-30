import api from "./api";

class PrefCardsService {
    async getAllPrefCards() {
        return await api.get('prefcards')
            .then((response) => response.data)
            .catch((err) => null);
    }

    async addPrefCard(prefcard) {
        return await api.post(`prefcards/add`, prefcard)
    }

    async updatePrefCard(id, prefcard) {
        return await api.put(`prefcards/edit/${id}`, prefcard)
            .catch((err) => err);
    }

    async getPrefCard(id) {
        return await api.get(`prefcards/${id}`)
            .then((response) => response)
            .catch((err) => null);
    }

    async removePrefCard(id) {
        return await api.delete(`prefcards/remove/${id}`);
    }
}

export default new PrefCardsService();