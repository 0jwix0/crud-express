const form = document.querySelector('.form');

const url = new URL(window.location.href);
const id = parseInt(url.searchParams.get('id'));

fetch(`http://192.168.8.153:40/foods/${id}/modify`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        form.setAttribute('action',`http://192.168.8.153:40/foods/${id}/update`)
        form.innerHTML += `
            <input type='text' name='name' value='${data.name}'/>
            <br>
            <input type='text' name='description' value='${data.description}'/>
            <br>
            <input type='submit' value='submit'/>
        `;
    })
    .catch(error => {
        console.error('There was an error while fetching data:', error);
    });