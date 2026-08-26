import MongoSingleton from "../config/mongodb-singleton.js";
import config from "../config/config.js";

let studentService
let coursesService


const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with an error code
    }
}


// Factory - Selector
switch (config.persistence) {
    case 'mongodb':
        mongoInstance() // Initialize MongoDB connection
        const { default: StudentMongoDAO } = await import('../dao/mongo/student.services.js');
        const { default: CoursesMongoDAO } = await import('../dao/mongo/courses.services.js');

        studentService = new StudentMongoDAO();
        coursesService = new CoursesMongoDAO();
        break;


    case 'file':
        const { default: StudentFileDAO } = await import('../dao/filesystem/students.service.js');
        const { default: CoursesFileDAO } = await import('../dao/filesystem/courses.service.js');

        studentService = new StudentFileDAO();
        coursesService = new CoursesFileDAO();
        break;

    // case 'sql':

}


export { studentService, coursesService };