import React, { useState, useEffect } from 'react';

function ShoeList() {
  const [shoes, setShoes] = useState([]);

  const fetchData = async () => {
      const url = "http://localhost:8080/api/shoes/";
      const response = await fetch(url);

      if (response.ok) {
          const data = await response.json();
          console.log(data.shoes, 'data')
          setShoes(data.shoes);
        }
    };

useEffect(() => {
    fetchData();
}, []);

  return (
    <div className="row">
      <div className="col-12">
        <h1>Shoes</h1>
        <table className="table">
          <thead>
            <tr key={shoes.href}>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Color</th>
              <th>Bin</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {shoes.map((shoe) => (
              <tr key={shoe.id}>
                <td>{shoe.manufacturer}</td>
                <td>{shoe.model_name}</td>
                <td>{shoe.color}</td>
                <td>{shoe.bin}</td>
                <td>
                  <img src={shoe.image_url} alt={`${shoe.manufacturer} ${shoe.model_name}`} width="100" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShoeList;
