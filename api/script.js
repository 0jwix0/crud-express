const express = require('express');
const fs = require('fs/promises');
const app = express();
const cors = require('cors');

const port = 40;
const ip = '192.168.8.153';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

async function loaddata(){
    try{
        const jsonstring = await fs.readFile('foods.json');
        let data = JSON.parse(jsonstring);
        return data;
    } catch(err) {
        console.error('error while reading file:',err);
    }
}

async function savedata(data) {
    try {
        await fs.writeFile('foods.json', JSON.stringify(data, null, 2)); 
    } catch (err) {
        console.error('Error while writing to file:', err);
    }
}

function Delete(id,data){
    let newdata = data.filter(d => d.id !== id);
    return newdata;
}


app.get('/foods', async (req,res) => {
    let data = await loaddata();
    res.json(data);
})

app.get('/foods/:id/delete', async (req,res) => {

    const id = parseInt(req.params.id);

    let data = await loaddata();
    
    let new_data = Delete(id,data);

    savedata(new_data);
    res.json({ message: 'Food item deleted successfully'});
})

app.get('/foods/:id/modify', async (req,res)=>{
    let data = await loaddata();
    const id = parseInt(req.params.id);
    let modify_data = data.find(d => d.id === id);
    res.json(modify_data);
});

app.post('/foods/:id/update', async (req,res)=>{

    const data = await loaddata();

    let {name,description} = req.body;

    const id = parseInt(req.params.id);

    const item = data.find(d=> d.id === parseInt(id));
    item.name = name;
    item.description = description;

    savedata(data);
    res.json({ message: 'Food item updated successfully'});
})

app.post('/foods/add', async (req, res) => {
    let data = await loaddata();
    
    const { id, name, description } = req.body;

    data.push({ 'id': parseInt(id), 'name': name, 'description': description });

    function uniqueid(jsondata) {
        let index = 0;
        jsondata.forEach(item => {
            item.id = index++;
        });
        return jsondata;
    }
    data = uniqueid(data);

    savedata(data);
    res.json({ message: 'Food item added successfully'});
});


app.listen(port,ip,()=>{
    loaddata();
    console.log(`server is runnign at http://${ip}:${port};`)
})
