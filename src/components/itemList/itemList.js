import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import Error from '../error';

export default class ItemList extends Component {
    
    state = {
        itemList: null,
        error: false
    }

    componentDidMount(){
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    componentDidCatch(){
        this.setState({
            itemList: null,
            error: true
        })
    }

    onError(){
        this.setState({
            itemList: null,
            error: true
        })
    }

    renderItemsToPage(arr){
        return arr.map((item) => {
            const {id} = item;
            const label = this.props.renderItem(item);

            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {
        const {itemList, error} = this.state;

        if(!itemList){
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        if(error){
            return <Error/>
        }


        const items = this.renderItemsToPage(itemList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}

