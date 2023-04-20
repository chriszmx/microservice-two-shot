import React, { useState, useEffect } from "react";
function HatList() {
  const [hats, setHats] = useState([]);
  const fetchData = async () => {
    const url = "http://localhost:8080/api/hats/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data.hats, "data");
      setHats(data.hats);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="row">
      <div className="col-12">
        <h1>Hats</h1>
        <table className="table">
          <thead>
            <tr key={hats.href}>
              <th>Style Name</th>
              <th>Fabric</th>
              <th>Color</th>
              <th>Location</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {hats.map((hat) => (
              <tr key={hat.id}>
                <td>{hat.style_name}</td>
                <td>{hat.fabric}</td>
                <td>{hat.color}</td>
                <td>{hat.location}</td>
                <td>
                  <img
                    src={hat.picture_url}
                    alt={`${hat.style_name} ${hat.fabric}`}
                    width="100"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default HatList;
