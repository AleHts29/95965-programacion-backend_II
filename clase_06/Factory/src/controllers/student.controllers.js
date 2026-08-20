import { studentService } from '../services/factory.js';


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
        // faltan validaciones de datos
        const studentData = req.body;
        const newStudent = await studentService.save(studentData);
        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error saving student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}