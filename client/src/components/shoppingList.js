import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../redux/actions/actions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
    // state = {
    //     items: [
    //         { id: uuid(), name: 'Eggs' },
    //         { id: uuid(), name: 'Milk' },
    //         { id: uuid(), name: 'Steak' },
    //         { id: uuid(), name: 'Water' }
    //     ]
    // }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        items: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getItems()
    }

    deleteHandler = (id) => {
        this.props.deleteItem(id)
    }

    render() {
        const { items } = this.props.item
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) => ( // {items.map(({ id, name }) - Previously, it was like this but as we are now getting the id from the backend where the id is _id instead of id, so we replaced id with _id
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    { this.props.isAuthenticated ?                                     
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.deleteHandler.bind(this, _id)}
                                    >&times;</Button> : null }
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}


const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);