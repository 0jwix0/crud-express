const table = document.querySelector('.show');

fetch('http://192.168.8.153:40/foods')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        data.map(d => {
            table.innerHTML += `
            <tr>
                <td>${d.name}</td>
                <td>${d.description}</td>
                <td>
                    <a href='http://192.168.8.153:40/foods/${d.id}/delete'>delete</a>
                    <a href='modify.html?id=${d.id}'>modify</a>
                </td>
            </tr>
        `;
        })
    })
    .catch(error => {
        console.error('There was an error while fetching data:', error);
    });
