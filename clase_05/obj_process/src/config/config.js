import dotenv from 'dotenv';
import { Command } from 'commander';



const program = new Command();

program
    .option('-p, --port <number>', 'Puerto del servidor', 8080)
    .option('-m, --mode <mode>', 'Modo de ejecución', 'development')
    .option('-d, --debug', 'Habilitar modo debug', false)
program.parse();

// console.log('Opciones de línea de comandos:', program.opts());
// console.log('Argumentos de línea de comandos para el Puerto:', program.opts().port);


const environment = program.opts().mode;

dotenv.config({
    path: environment === "production" ? "./src/config/.env.production" : "./src/config/.env.development"
});

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD
};

