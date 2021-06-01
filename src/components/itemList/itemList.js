import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import Error from '../error';
// import gotService from '../../services/gotService';

//так как состояние используется в отдельном компоненте, то класс можем переделать в функцию
function ItemList(props) {

    function renderItemsToPage(arr){

        return arr.map((item) => {

            const {id} = item;
            const label = props.renderItem(item);

            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    
    const {data} = props;
    const items = renderItemsToPage(data);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );

}



//HOC - компонент высшего порядка
const withData = (View) => {
    return class extends Component{

        state = {
            data: null,
            error: false
        }
    
        componentDidMount(){
            const {getData} = this.props;
    
            getData()
                .then((data) => {
                    this.setState({
                        data
                    })
                })
        }


        render(){
            const {data, error} = this.state;

            if(!data){
                return (
                    <div className="char-details rounded">
                        <Spinner/>
                    </div>
                )
            }

            if(error){
                return <Error/>
            }


            return <View {...this.props} data={data}/>
        }
    };
}

// const {getData} = new gotService();
export default withData(ItemList);
