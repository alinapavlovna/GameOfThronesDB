import React from 'react';
import {Col, Row} from 'reactstrap';

const RowBlock = ({itemList, itemDetails}) => {
    return (
        <Row>
        <Col md='6'>
           {itemList}
        </Col>
        <Col md='6'>
            {itemDetails}
        </Col>
    </Row>
    )
}

export default RowBlock;