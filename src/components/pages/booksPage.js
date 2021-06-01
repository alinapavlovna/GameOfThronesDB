import React, {Component} from 'react';
import ItemList from '../itemList';
import Error from '../error';
import gotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';

 class BooksPage extends Component {

    gotService = new gotService();

    state = {
        error: false
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

//     onItemSelected = (id) => {
//         this.setState({
//             selectedBook: id
//         })
//    }

    render() {

        if(this.state.error){
            return <Error/>
        }

        // const itemList = (
        //     <ItemList 
        //         onItemSelected={this.onItemSelected}
        //         getData={this.gotService.getAllBooks}
        //         renderItem={({name}) => name}/>
        // );

        
        // const itemDetails = (
        //     <ItemDetails 
        //         itemId={this.state.selectedBook}
        //         getData={this.gotService.getBook}>
        //             <Field field='numberOfPages' label='Number of pages'/>
        //             <Field field='publisher' label='Publisher'/>
        //             <Field field='released' label='Released'/>
        //     </ItemDetails>
        // );

        return (
            <ItemList 
            onItemSelected={(itemId) => {
                this.props.history.push(`/books/${itemId}`);
            }}
            getData={this.gotService.getAllBooks}
            renderItem={({name}) => name}/>
        );
    }
}

export default withRouter(BooksPage);
