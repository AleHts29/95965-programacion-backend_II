import dotenv from 'dotenv';
import { Command } from 'commander';


const program = new Command();

program
    .option('-p, --port <number>', 'Puerto del servidor', '8081')
    .option('-m, --mode <mode>', 'Modo de ejecución', 'development')
program.parse()


dotenv.config({
    path: program.opts().mode === 'production' ? './src/config/.env.production' : './src/config/.env.development'
})



export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPassword: process.env.ADMIN_PASSWORD,
    persistence: program.opts().persist,
}



