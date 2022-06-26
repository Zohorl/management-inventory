import React from 'react';
import { Button, Card } from 'react-bootstrap';

const Product = ({ product }) => {
    const { _id, name, price, description, img } = product;
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Text>
                    Price : ${price}
                </Card.Text>
                <Button variant="primary">Order Now</Button>
            </Card.Body>
        </Card>
    );
};

export default Product;