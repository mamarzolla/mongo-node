// installiamo libreria node npm install mongodb

//const connectionString = "STRIGNA CONNESSIONE MONGO DB";

// andiamo a mettere la stringa di connnessione e la mettiamo nelle variabili d'ambiente sul nostro sistema operativo ma utilizziamo una libreria almeno non ci mettiamo le mani dentro

// CREO FILE .ENV E METTO LA STRINGA INTERNO CON VARIABILE git ignorta in automatico il file .env

// sul driver mettiamo le funzioni di interrogazione al DB
import{ MongoClient, ObjectId } from 'mongodb';

export const insertProdotto = async (nome: string, prezzo:number) => {
    const client = new MongoClient(process.env.MONGO_ATLAS_CONNECTION_STRING!);  // process.env.MONGO_ATLAS_CONNECTION_STRING è la variabile d'ambiente che abbiamo creato nel file .env può trovare undefined se non è stata caricata correttamente
    // ! è un operatore che dice al compilatore che la variabile non sarà mai undefined

    try {
        const db = client.db('amazon');
        const prodotti = db.collection('prodotti');

        const prodott ={  // possiamo evitare di accoppiare nome con proprietà in quanto si chiamano uguali
            nome,
            prezzo
        }
        // const prudotto = {
        //     nome: nome,
        //     prezzo: prezzo
        // };
        const r = await prodotti.insertOne(prodott);
     //   client.close();  // chiudo la connessione per non rimanere impiccato in console 
        return r;

    } catch (error) {
        console.log(error);
    }finally{
        await client.close(); //  meglio chiuderla con il finally in quanto in fondo a tutte le istruzioni 
}}
    

// gestione null/undefined
// in dichiarazione possiamo specificare il tipo del dato 
// const pippo : string |undefined;
// function saluta (nome: string){ 
//         console.log('Ciao', pippo);
// };
// saluta(pippo!);   // abbiamo un errore perchè pippo potrebbe essere undefined quindi aggiungiamo l'operatore ! per dire che non sarà mai undefined
// // oppure
// saluta(pippo ?? 'sconosciuto'); // ?? operatore di coalescenza nullo se pippo è undefined allora metti sconosciuto

export const getProdotti = async () => {
    const client = new MongoClient(process.env.MONGO_ATLAS_CONNECTION_STRING!);  // process.env.MONGO_ATLAS_CONNECTION_STRING è la variabile d'ambiente che abbiamo creato nel file .env può trovare undefined se non è stata caricata correttamente
    // ! è un operatore che dice al compilatore che la variabile non sarà mai undefined

    try {
        const db = client.db('amazon');
        const prodotti = db.collection('prodotti');
        const r = await prodotti.find().toArray();// find() ritorna un cursore e con toArray() lo trasformo in un array perchè i dati del db sono in formato BSON
        return r;

    } catch (error) {
        console.log(error);
    }finally{
        await client.close(); //  meglio chiuderla con il finally in quanto in fondo a tutte le istruzioni 
}}

export const deleteProdotti = async (id:string) => {
    const client = new MongoClient(process.env.MONGO_ATLAS_CONNECTION_STRING!);  // process.env.MONGO_ATLAS_CONNECTION_STRING è la variabile d'ambiente che abbiamo creato nel file .env può trovare undefined se non è stata caricata correttamente
    // ! è un operatore che dice al compilatore che la variabile non sarà mai undefined

    try {
        const db = client.db('amazon');
        const prodotti = db.collection('prodotti');
        const r = await prodotti.deleteOne({
            _id: new ObjectId(id)
        });// per riuscire ad accedere all'id ci va questa sintassi

        return r;

    } catch (error) {
        console.log(error);
    }finally{
        await client.close(); //  meglio chiuderla con il finally in quanto in fondo a tutte le istruzioni 
}};


export const getProdottiConoSenzaCriterioRicerca = async (prezzoMaggioreDi : number |undefined=undefined) => {
    const client = new MongoClient(process.env.MONGO_ATLAS_CONNECTION_STRING!);  // process.env.MONGO_ATLAS_CONNECTION_STRING è la variabile d'ambiente che abbiamo creato nel file .env può trovare undefined se non è stata caricata correttamente
    // ! è un operatore che dice al compilatore che la variabile non sarà mai undefined

    try {
        const db = client.db('amazon');
        const prodotti = db.collection('prodotti');
        if(prezzoMaggioreDi){
           // const query={prezzo: prezzoMaggioreDi}; qui lo prende come valore di uguaglianza
           const query={prezzo: {$gt: prezzoMaggioreDi}}; // qui lo prende come valore maggiore di $gt sta per greater than

           //const option ={sort:{prezzo :1}};  //proprietà fissa sort e poi il campo su cui ordinare e 1 per ascendente -1 per discendente
     
            return await prodotti.find(query, {sort:{prezzo :1}}).toArray();  // nel caso di inserimento valore mi inserisce la query altrimenti mi restituisce tutto
        }else{
            return await prodotti.find().toArray()
        }
     

    } catch (error) {
        console.log(error);
    }finally{
        await client.close(); //  meglio chiuderla con il finally in quanto in fondo a tutte le istruzioni 
}}