import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import './button.css'
import Error from '../error';
import gotService from '../../services/gotService';
import {CharacterPage, BooksPage, HousesPage, BookItem } from '../pages';
import {BrowserRouter as Router, Route} from 'react-router-dom';

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
           <Router>
                <div class='app'> 
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
                    <Route path='/characters' component={CharacterPage}/>
                    <Route path='/books' exact component={BooksPage}/>
                    <Route path='/houses' component={HousesPage}/>
                    <Route path='/books/:id' render = {
                        ({match}) => {
                            const {id} = match.params;
                            return <BookItem bookId={id}/>
                        }
                    }/>

                </Container>
            </div>
           </Router>
        );
    }
}


