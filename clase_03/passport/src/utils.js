import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


// createHash
export const createHash = password => {

    console.log('Metodo createHash pre')
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    console.log(hash)

    console.log('Metodo createHash post')
    return hash
}


// isValidPassword
export const isValidPassword = (userPasswordDb, password) => {
    console.log(`Datos a validar: userDb-password: ${userPasswordDb}, password: ${password}`)
    return bcrypt.compareSync(password, userPasswordDb)
}