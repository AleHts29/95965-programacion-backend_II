export default class CoursesRepository {
    constructor(dao) {
        this.dao = dao
    }

    getAll = () => {
        return this.dao.getAll()
    }

    save = (data) => {
        return this.dao.save(data)
    }
}