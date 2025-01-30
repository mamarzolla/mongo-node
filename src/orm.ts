import mongoose from "mongoose";   // object relational mapping library for MongoDB
import { Categoria } from "./models/categoria"; // imoportiasmo il modello della categoria

// MongoDB collection schema 
// nella collection possiamo mettere ogni sorta di dato e mongoose si occuperà di fare il mapping con il db per recuperare solo gli oggetti che corrispondono allo schema

// creiamo opera di mapping tra la collection e il modello
export const insertCategoria = async (titolo: string, sottotitolo: string, descrizione: string) => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS_CONNECTION_STRING!,{dbName:"amazon"}); // connessione al db e definiamo giò il nome del DB da utilizzare
        let cat = new Categoria(); // creiamo un oggetto categoria
        cat.titolo = titolo; // assegnamo i valori
        cat.sottotitolo = sottotitolo; // assegnamo i valori
        cat.descrizione = descrizione; // assegnamo i valori
        return await cat.save(); // salviamo l'oggetto nel db
    } catch (error) {
        console.log(error);
    }finally{
        await mongoose.disconnect(); // chiudiamo la connessione    
    }
}