import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import './button.css'
import Error from '../error';
import CharacterPage from '../pages/characterPage';
import ItemList from '../itemList';
import ItemDetails from '../itemDetails';
import gotService from '../../services/gotService';
import { BooksPage, HousesPage } from '../pages';


export default class App extends Component {

    gotService = new gotService();

    state = {
        show: true,
        error: false
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    onToggle = () => {  
        this.setState({
            show: !this.state.show
        })
    }

   
   render() {

        if(this.state.error){
            return <Error/>
        }

        const renderRandomChar = this.state.show ? <RandomChar /> : null;

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <button class='btn-toggle'
                            onClick={this.onToggle}>
                            Toggle Random Character</button>
                            {renderRandomChar}
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <BooksPage/>
                    <HousesPage/>

                    {/* <Row>
                        <Col md='6'>
                            <ItemList 
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={(item) => item.name}/>
                                
                        </Col>
                        <Col md='6'>
                            <ItemDetails 
                                itemId={this.props.bookId}
                                getData={this.gotService.getBook}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <ItemDetails 
                                itemId={this.props.houseId}
                                getData={this.gotService.getHouse}/>
                        </Col>
                    </Row>
                    */}

                </Container>
            </>
        );
    }
}


