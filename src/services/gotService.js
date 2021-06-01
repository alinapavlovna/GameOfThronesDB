export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }

        return await res.json();
    }

    getAllBooks = async () => {
        const res = await this.getResource(`/books/`); 
        return res.map(this._transformBook);
    }
    
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
    
    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    
    getCharacter = async (id) => {
        const char = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(char);
    }
    
    getAllHouses = async () => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
    }
    
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/; 
        return item.url.match(idRegExp)[1];
   }
    
    _transformCharacter = (char) => {
        const noData = 'data is not found';

        return {
            id: this._extractId(char),
            name: char.name !== '' ? char.name : noData,
            gender: char.gender !== '' ? char.gender : noData,
            born: char.born !== '' ? char.born : noData,
            died: char.died !== '' ? char.died : noData,
            culture: char.culture !== '' ? char.culture : noData
        }
    }

    _transformHouse = (house) => {
        const noData = 'data is not found';

        return {
            id: this._extractId(house),
            name: house.name !== '' ? house.name : noData,
            region: house.region !== '' ? house.region : noData,
            words: house.words !== '' ? house.words : noData,
            titles: house.titles !== '' ? house.titles : noData,
            overlord: house.overlord !== '' ? house.overlord : noData,
            ancestralWeapons: house.ancestralWeapons !== '' ? house.ancestralWeapons : noData
        }
    }

    _transformBook = (book) => {
        const noData = 'data is not found';

        return {
            id: this._extractId(book),
            name: book.name !== '' ? book.name : noData,
            numberOfPages: book.numberOfPages !== '' ? book.numberOfPages : noData,
            publisher: book.publiser !== '' ? book.publisher : noData,
            released: book.released !== '' ? book.released : noData
        }
    }

}