import  mongoose from "mongoose";

interface ICategoria  {
    titolo?:string  //metto l'opzione di inserimento titolo o meno
    sottotitolo: string,
    descrizione?: string,   //metto l'opzione di inserimento descrizione o meno
    dataCreazione?: Date, //metto l'opzione di inserimento data di creazione o meno
    attiva?: boolean //metto l'opzione di inserimento attiva o meno

}// Andiamo a creare un interfaccia per la categoria come per angular

const categortiaSchema = new mongoose.Schema<ICategoria>({  // andiamo ad aggiungere il generico per la categoria per una forma piu correta di scrittura
    titolo : String, //classe che identifica una stringa se mettiamo con la maiuscola , mongoose la vuole con la maiuscola
    sottotitolo:{
        type: String,
        required: true  // non posso avere categorie senza sottotitolo
    },
    descrizione:{type: String}, //è la stessa cosa del titolo solo con scrittura diversa
    dataCreazione: {type:Date, default: Date.now}, // se non metto la data di creazione allora metti la data di default
    attiva: {type: Boolean, default: true} // se non metto niente allora la categoria è attiva


});

// creiamo il modello
export const Categoria = mongoose.model<ICategoria>('Categoria', categortiaSchema, "categoria"); // il modello è la rappresentazione della collection in mongoose
// i parametri sono il nome interno con cui definiamo la classe e lo schema di accoppiamento e infine definiamo il nome della collection nel db 
//questo è un lavoro che dobbiamo fare ogni volta che dobbiamo farte delle scritture nel db