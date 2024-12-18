import "reflect-metadata";
import { dataSource } from "./config/db";
import { buildSchema } from "type-graphql";
import { AdResolver } from "./resolvers/AdResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const port = 3000;

const start = async () => {
	await dataSource.initialize();

	const schema = await buildSchema({
		resolvers: [AdResolver],
	});

	const apiServer = new ApolloServer({ schema });

	const { url } = await startStandaloneServer(apiServer, {
		listen: { port: port },
	});
	console.log("Hey, ça marche ! =D");
	console.log(url);
};
start();
