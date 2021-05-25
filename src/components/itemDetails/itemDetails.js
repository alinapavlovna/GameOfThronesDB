import React, {Component} from 'react';
import './itemDetails.css';


const Field = ({item, field, label}) => {

    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};


export default class ItemDetails extends Component {


    state = {
        item: null
        // loading: true,
        // error: false
    }

    componentDidMount(){
        this.updateItem();
    }   

    componentDidUpdate(prevProps){
        if(this.props.itemId !== prevProps.itemId){
            this.updateItem();
        }
    }


    updateItem(){
        const {itemId, getData} = this.props;

        if(!itemId) return;

        // this.setState({
        //     loading: true
        // })

        getData(itemId)
            .then(item => {
            this.setState({item})
        })
            // .then(this.onCharDetailsLoaded)
            // .catch(() => this.onError())
            
        // this.foo.bar = 0;
    }

    // onError () {
    //     this.setState({
    //         char: null,
    //         error: true
    //     })
    // }

    // onCharDetailsLoaded = (char) => {
    //     this.setState({
    //         char,
    //         loading: false
    //     })
    // }
   
    render() {

        // if(!this.state.item && this.state.error){
        //     return <Error/>
        // } else 
        
        if(!this.state.item){
            return <span className="select-error">Please select an item from the list</span>
        }

        const {name} = this.state.item;
        const {item} = this.state;

        // if(this.state.loading){
        //     return (
        //         <div className="char-details rounded">
        //             <Spinner/>
        //         </div>
        //     )
        // }

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}