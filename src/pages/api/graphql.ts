import { ApolloServer, gql } from 'apollo-server-micro';
import type { NextApiRequest, NextApiResponse } from 'next'


import login from '../../graphql/loginResolver';
import me from '../../graphql/meResolver';
import visitorsOverTime from '../../graphql/visitorsOverTimeResolver';

const typeDefs = gql`
  scalar DateRange

  type Login {
    token: String!
  }

  type User {
    username: String!
  }

  "Collection of Total Visits values"
  type StatisticValue {
    "Amount of visits"
    sum: Int!

    "Average amount of visits (usually per day or hour dependent on the query)"
    avg: Int!

    "Relation between visitors and residents in the given context. Defaults to 1 if not specified"
    rel: Float!
  }

  type VisitorsOverTime {
    "Time offset in hours 0 - 23"
    time: Int!
    visitors: StatisticValue!
  }

  input VisitorsOverTimeWhereInput {
    date: DateRange!
  }

  type Query {
    login(username: String!, password: String!): Login
    me(token: String): User
    visitorsOverTime(where: VisitorsOverTimeWhereInput): [VisitorsOverTime!]!
  }
`;

const resolvers = {
  Query: {
    me,
    login,
    visitorsOverTime,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: { req },
  });

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await apolloServer.start();
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
