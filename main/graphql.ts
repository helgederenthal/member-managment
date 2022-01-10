import cors from "cors";
import Electron, { dialog, ipcMain, BrowserWindow } from "electron"; // tslint:disable-line
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import { calc } from "./calc";

const GraphQlApi = (window : BrowserWindow) => {
    let apiPort : Number = 0

    const app = express();
    app.use(cors());

    // GraphQL Schema
    const schema = buildSchema(`
        type Query {
            awake: String
            calc(math: String = null): String
            exit: String
            hello: String
        }`);

    // Root resolver
    const root = {
        awake: () => "Awake",
        calc: (args:{ math:string }) => {
            const result = calc(args.math);
            // dialog.showMessageBox(
            //     null as unknown as BrowserWindow,
            //     {
            //         buttons:["OK"],
            //         detail:(args.math + " = " + result),
            //         message:"Full access to electron api available",
            //         title:"Main process",
            //     });
            return result;
        },
        hello: () => {
            return "world";
        },
    };

    app.use("/graphql", graphqlHTTP({
        graphiql: false,
        rootValue: root,
        schema,
    }));

    app.use("/graphiql", graphqlHTTP({
        graphiql: true,
        rootValue: root,
        schema,
    }));

    const initializeApi = async () => {
        apiPort = 5000
        app.listen(apiPort)
    };

    ipcMain.on("getApiDetails", () => {
        if (apiPort !== 0) {
            console.log("Send port " + apiPort)
            window.webContents.send("apiDetails", apiPort);
        } else {
            initializeApi()
                .then(() => {
                    window.webContents.send("apiDetails", apiPort);
                })
                .catch(() => {
                    window.webContents.send("apiDetailsError", "Error initializing API");
                });
        }
    });
}

export default GraphQlApi
