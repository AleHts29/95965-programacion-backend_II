// DAOs
import StudentsDao from '../dao/mongo/student.services.js'
import CoursesDao from '../dao/mongo/courses.services.js'


// Repositorios
import StudentsRepository from '../repository/students.repository.js'
import CoursesRepository from '../repository/courses.repository.js'

// Export de Services
export const studentService = new StudentsRepository(new StudentsDao())
export const coursesService = new CoursesRepository(new CoursesDao())