import axios from 'axios';
import { API_URL } from './config';
import { createErrorObject } from '../components/utils/createErrorObject';


axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const apiService = {
	get (resource) {
		return axios
			.get(resource)
            .catch((err) => {
				createErrorObject(err.response.status);
				console.log(err.response);

				throw err;
            })
	},

	put (resource, params) {
		return axios
			.put(resource, params)
            .catch((err) => {
				createErrorObject(err.response.status);

				throw err;
            })
	},

	post (resource, params) {
		return axios
			.post(resource, params)
            .catch((err) => {
				createErrorObject(err.response.status);

				throw err;
            })
	},

	delete (resource) {
		return axios
			.delete(resource)
            .catch((err) => {
				createErrorObject(err.response.status);

				throw err;
            })
	}
}

export const PokemonService = {
	pokemonList (limit = 20) {
		return apiService
			.get('pokemon?limit=' + limit + '&offset=' + limit)
	},

	pokemonDetail (id) {
		return apiService
			.get('pokemon/' + id)
	},

	typeList () {
		return apiService
			.get('type/')
	},

	raw (url) {
		return apiService
			.get(url)
	}
}

