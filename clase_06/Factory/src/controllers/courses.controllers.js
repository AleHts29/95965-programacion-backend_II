import { coursesService } from '../services/factory.js'


export async function getAllCourses(req, res) {
    try {
        const courses = await coursesService.getAll()
        return res.status(200).json({ courses });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function saveCourse(req, res) {
    try {
        // fantan validaciones de datos
        const courseData = req.body;
        const newCourse = await coursesService.save(courseData);
        res.status(201).json(newCourse);
    } catch (error) {
        console.error('Error saving course:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}   