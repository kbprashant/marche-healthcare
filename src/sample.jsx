import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Sample() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  // useEffect(() => {
  //   axios.get('/api/items')
  //     .then(res => {setItems(res.data);

  //       console.log(res);
  //       console.log(items);
  //     });
  // }, []);

  const handleAdd = () => {
    axios.post('/api/items', { name: input })
      .then(res => {setItems([...items, res.data]);
        console.log(res);
        console.log(items);
      }
    );
    setInput('');
  };

  return (
    <div>
      <h2>Fastify + MongoDB + React</h2>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
        <ul>
          {items.length>0?items.map(item => <li key={item._id}>{item.name}</li>):<></>}
        </ul>
    </div>
  );
}

export default Sample;
