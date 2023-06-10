import { gql } from '@apollo/client';
import { saveBook } from './API';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
    user {
            _id
            email
            password
            username
        savedBooks {
                _id
                authors
                bookId
                description
                image
                link
                title
            }
        }
    }
}
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
    user {
            _id
            email
            password
            username
        savedBooks {
                _id
                authors
                bookId
                description
                image
                link
                title
            }
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($description: String!, $bookId: String!, $title: String!, $image: String, $authors: [String]!) {
    saveBook(description: $description, bookId: $bookId, title: $title, image: $image, authors: $authors) {
    _id
    email
    password
    username
    savedBooks {
        _id
        authors
        bookId
        description
        image
        link
        title
        }
    }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        email
        password
        username
        savedBooks {
            _id
            authors
            bookId
            description
            image
            link
            title
        }
    }
}
`;