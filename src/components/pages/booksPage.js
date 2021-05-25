import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import Error from '../error';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class BooksPage extends Component {

    gotService = new gotService();

    state = {
        selectedBook: null,
        error: false
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
   }

    render() {

        if(this.state.error){
            return <Error/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => name}/>
        );

        
        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedBook}
                getData={this.gotService.getBook}>
                    <Field field='numberOfPages' label='Number of pages'/>
                    <Field field='publisher' label='Publisher'/>
                    <Field field='released' label='Released'/>
            </ItemDetails>
        );

        return (
           <RowBlock itemList={itemList} itemDetails={itemDetails}/>
        );
    }
}