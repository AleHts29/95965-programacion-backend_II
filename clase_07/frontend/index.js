function testRequest() {
    console.log("Llamando al BackEnd de NodeJS");


    fetch('http://localhost:9090/api/students', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            result.json()
                .then(json => {
                    console.log(json.students[0].name);

                    // compile the template
                    const usersScriptHTML = document.getElementById('usersTemplate').innerHTML
                    var template = Handlebars.compile(usersScriptHTML)

                    var compileData = template(json);
                    console.log(compileData);

                    document.getElementById('content').innerHTML = compileData
                })
        } else {
            console.log(result);
            alert('Error al hacer el fetch al backEnd')
        }
    })
}