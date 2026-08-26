import { studentService } from '../services/service.js';
import StudentsDto from '../services/dto/student.dto.js'


export async function getAllStudents(req, res) {
    try {
        const students = await studentService.getAll();
        return res.status(200).json({ students });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function saveStudent(req, res) {
    try {
        // falta validar lo que viene en el req.body

        // usamos un DTO 
        const studentDto = new StudentsDto(req.body)

        const newStudent = await studentService.save(studentDto);
        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error saving student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}