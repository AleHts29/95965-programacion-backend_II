export default class StudentsRepository {
    constructor(dao) {
        this.dao = dao
    }

    getAll = () => {
        return this.dao.getAll()
    }

    save = (data) => {
        return this.dao.save(data)
    }

    findByUsername = (username) => {
        return this.dao.findByUsername(username)
    }

    update = (id, data) => {
        return this.dao.update(id, data)
    }
}