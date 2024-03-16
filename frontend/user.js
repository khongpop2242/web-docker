const BASE_URL = 'http://localhost:8000'

window.onload = async () => {
   await loadData()
}

const loadData = async () => {
    console.log('loaded');
    const response = await axios.get(`${BASE_URL}/users`)
    console.log(response.data);

    const userDOM = document.getElementById('user')

    let htmlData = '<table>'
    htmlData += '<tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Edit</th><th>Delete</th></tr>'
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i]
        htmlData += `<tr>
            <td>${user.id}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td><a href='index.html?id=${user.id}' class='edit-button'>Edit</a></td>
            <td><button class='delete-button' data-id='${user.id}'>Delete</button></td>
            </tr>`
    }
    htmlData += '</table>'
    userDOM.innerHTML = htmlData

    const deleteButtons = document.querySelectorAll('.delete-button')
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.dataset.id
            try {
                await axios.delete(`${BASE_URL}/users/${id}`)
                loadData()
            } catch (error) {
                console.log(error);
            }
        })
    })
}