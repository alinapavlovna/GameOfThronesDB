import React, {useEffect, useState} from 'react';
import './itemDetails.css';
import Error from '../error/error';
import Spinner from '../spinner/spinner';

const Field = ({item, field, label}) => {

    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}

export {Field};


//описываем компонент ItemDetails с помощью хуков

let itemIdLast;

 function ItemDetails({itemId, getData, children}) {

    const [item, update_Item] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(false); 


    useEffect(() => {
        updateItem();
    }, [itemId]);


    function updateItem(){

        if(itemId !== itemIdLast) {
            if(!itemId) return;

                setLoading(true);
        
                getData(itemId)
                    .then(item => {
                    update_Item(item);
                })
                .then(() => setLoading(false))
                .catch( () => setError(true));

                return () => {
                    itemIdLast = itemId;
                }
        }
    }
    
   if(!item && error){
        return <Error/>
   }

    if(!item){
        return <span className="select-error">Please select an item from the list</span>
    }

    if(loading){
        return (
            <div className="char-details rounded">
                <Spinner/>
            </div>
        )
    }

    const {name} = item;
    return (
        <div className="char-details rounded">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </div>
    );
    
}

export default ItemDetails;