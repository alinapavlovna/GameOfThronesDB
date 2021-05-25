import React, {Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import Error from '../error';
import gotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousesPage extends Component {

    gotService = new gotService();

    state = {
        selectedHouse: null,
        error: false
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
   }

    render() {

        if(this.state.error){
            return <Error/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({name}) => name}/>
        );

        const itemDetails = (
            <ItemDetails 
                itemId={this.state.selectedHouse}
                getData={this.gotService.getHouse}>
                    <Field field='region' label='Number of pages'/>
                    <Field field='words' label='Publisher'/>
                    <Field field='titles' label='Released'/>
                    <Field field='ancestralWeapons' label='Released'/>
            </ItemDetails>
        );

        return (
           <RowBlock itemList={itemList} itemDetails={itemDetails}/>
        );
    }
}