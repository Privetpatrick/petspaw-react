import axios from 'axios';

export default class RequestTool {
    static api = '612199da-1a7c-480a-be2b-0e3c6ef1f518';
    static users = {
        noUser: '',
        user1: 'patrichia',
        user2: '123123asdasdxxxz',
    }
    static createLikesDislikesData(data) {
        let likes = [];
        let dislikes = [];
        data.forEach(elem => {
            if (elem.value === 1) {
                likes.push(elem);
            } else {
                dislikes.push(elem);
            }
        });
        if (likes.length > 0) {
            likes = this._convertData(likes);
            this._createGridForLikesFavouritesDislikes(likes, 'likes');
        }
        if (dislikes.length > 0) {
            dislikes = this._convertData(dislikes);
            this._createGridForLikesFavouritesDislikes(dislikes, 'dislikes')
        }
    }
    static convertData(data) {
        let likes = [];
        let dislikes = [];
        data.forEach(elem => {
            let elemObj = {
                image: {},
            };
            elemObj.id = elem.id;
            elemObj.image_id = elem.image_id;
            elemObj.image.url = `https://cdn2.thecatapi.com/images/${elem.image_id}.jpg`;
            if(elem.value) {
                likes.push(elemObj);
            } else {
                dislikes.push(elemObj);
            }
        })
        return {likes, dislikes}; 
    }
    static async getAllBreeds() {
        let response = await fetch(`https://api.thecatapi.com/v1/breeds`, {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': this.api
            },
        });
        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            throw new Error(`GET не сработал этот ERROR`);
        };
    }
    static async postLikeOrNot(id, like) {
        let data = {};
        data.sub_id = this.users.user1;
        data.image_id = id;
        like === 'like' ? data.value = 1 : data.value = 0;
        data = JSON.stringify(data);
        await fetch(`https://api.thecatapi.com/v1/votes`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': this.api,
            },
            body: data,
        });
    }
    static async postFavourite(id) {
        let data = {};
        data.sub_id = this.users.user1;
        data.image_id = id;
        data = JSON.stringify(data);
        await fetch(`https://api.thecatapi.com/v1/favourites`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': this.api,
            },
            body: data,
        });
    }
    static async getRequest(breedId = '', limit = 10, order = 'Random', types = 'jpg') {
        let url;
            url = `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}&limit=${limit}&order=${order}&has_breeds=true&mime_types=${types}&size=small`
        let response = await fetch(url, {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': this.api
            },
        });
        if (response.ok) {
            let data = await response.json();
            return data;
        } else {
            throw new Error(`GET не сработал этот ERROR`);
        };
    }
    static async getLikesDislikes() {
        let response = await fetch(`https://api.thecatapi.com/v1/votes?sub_id=${this.users.user1}`, {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': this.api
            },
        });
        if (response.ok) {
            let data = await response.json();
            let result = this.convertData(data)
            return result;
        } else {
            throw new Error(`GET не сработал этот ERROR`);
        };
    }
    static async getFavourites() {
        let response = await fetch(`https://api.thecatapi.com/v1/favourites?sub_id=${this.users.user1}`, {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': this.api
            },
        });
        if (response.ok) {
            let data = await response.json();
            return data;
        } else {
            throw new Error(`GET не сработал этот ERROR`);
        };
    }
    static async postLikeOrNot(id, like) {
        let data = {};
        data.sub_id = this.users.user1;
        data.image_id = id;
        like === 'like' ? data.value = 1 : data.value = 0;
        data = JSON.stringify(data);
        await fetch(`https://api.thecatapi.com/v1/votes`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': this.api,
            },
            body: data,
        });
    }
    static async postFavourite(id) {
        let data = {};
        data.sub_id = this.users.user1;
        data.image_id = id;
        data = JSON.stringify(data);
        await fetch(`https://api.thecatapi.com/v1/favourites`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': this.api,
            },
            body: data,
        });
    }
    static async deleteLikeFavouritesDislike(id, type) {
        if (type === 'likes' || type === 'dislikes') {
            type = 'votes'
        }
        let response = await fetch(`https://api.thecatapi.com/v1/${type}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': this.api,
            },
        });
        if (response.ok) {
        } else {
            let data = await response.json();
            throw new Error(`GET не сработал этот ERROR`);
        };
    }
    static async uploadImage (formData, setDone, setIsLoading) {
        formData.append('sub_id', this.users.user1);
        let response = await fetch(`https://api.thecatapi.com/v1/images/upload`, {
            method: 'POST',
            headers: {
                'x-api-key': this.api,
            },
            body: formData,
        });
        if (response.ok) {
            setDone('ok')
            setIsLoading(false)
        } else {
            setDone('error')
            setIsLoading(false)
        };
    }
    static async getSearchRequest(value) {
        let response = await fetch(`https://api.thecatapi.com/v1/breeds/search?q=${value}`, {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': this.api
            },
        });
        if (response.ok) {
            let data = await response.json();
            return data
        } else {
            throw new Error(`GET не сработал этот ERROR`);
        };
    }
}
