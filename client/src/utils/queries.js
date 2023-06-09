import { gql } from '@apollo/client';

export const GET_ME = gql`
query Me  {
    me {
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