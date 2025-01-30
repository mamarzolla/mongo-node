import { config } from 'dotenv';
config(); // Load .env file e mette la connessione aq DB in una variabile d'ambiente ci sarebbe da aggiungere anche l'API key nello stesso file
import * as driver from './driver'
import * as mongooseOrm from './orm';

console.log(process.env.MONGO_ATLAS_CONNECTION_STRING);/// si usa il process.env.nomedellaVariabile per accedere alle variabili contenue nel file .env

//driver.insertProdotto('barbie', 22); // inserisce un prodotto nel DB
// la funzione così necessita di una promise const insertProdotto: (nome: string, prezzo: number) => Promise<InsertOneResult<Document> | undefined>
// per ovviare il fatto che la funzione è asincrona vado ad impostare un funzione generale await dove poi richiamo le funzioni asincrone

const mainDriver = async () => {
  // console.log(await driver.insertProdotto('barbie', 22)) ;
  console.log(await driver.getProdotti()) ;
}

//mainDriver();

const mainOrm = async () => {
   // console.log(await mongooseOrm.insertCategoria('bambole', "giochi per bambino", "bambole di plastica")); 
    console.log(await mongooseOrm.getCategoria());
}
mainOrm();