import React, { useState, useEffect } from "react";

function ShoeList() {
  const [shoes, setShoes] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:8080/api/shoes/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log(data.shoes, "data");
      setShoes(data.shoes);
      console.log(data.shoes.id, 'data from line 13')
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
            <tr>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Color</th>
              <th>Bin</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {shoes.map((shoe) => {
              return (
                <tr key={shoe.href}>
                  <td>{shoe.manufacturer}</td>
                  <td>{shoe.model_name}</td>
                  <td>{shoe.color}</td>
                  <td>
                    <img
                      src={shoe.img_url}
                      className=""
                      alt="picture of specific shoe"
                      width="130"
                      height="100"
                    ></img>
                  </td>
                  <td>{shoe.bin}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShoeList;
