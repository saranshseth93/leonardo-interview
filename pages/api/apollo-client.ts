import { ApolloClient, InMemoryCache, HttpLink, NormalizedCacheObject } from '@apollo/client';

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
    return new ApolloClient({
        link: new HttpLink({
            uri: 'https://graphql.anilist.co',
            credentials: 'same-origin',
        }),
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;
