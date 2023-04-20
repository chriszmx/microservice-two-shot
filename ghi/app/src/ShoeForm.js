import React, { useState, useEffect } from "react";

function ShoeForm() {
    const [closetNames, setClosetNames] = useState([]);
    const [formData, setFormData] = useState({
        manufacturer: '',
        model: '',
        color: '',
        picture_url: '',
        bin: '',
    })

const handleFormChange = (event) => {
    const inputName = event.target.name // eg manufacturer
    const value = event.target.value // eg jack
    setFormData({
        ...formData,
        [inputName]: value,
    })
}


  const handleSubmit = async (event) => {
    event.preventDefault();

    const shoeUrl = "http://localhost:8080/api/shoes/";
    const config = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(shoeUrl, config);

    if (response.ok) {
      const newShoe = await response.json();
      console.log(newShoe);

        setFormData({
            manufacturer: '',
            model: '',
            color: '',
            picture_url: '',
            bin: '',
        })
    }
  };


    const fetchData = async () => {
      const url = "http://localhost:8100/api/bins";
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setClosetNames(data.bins);
      }
    };

    useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1>Create a new Shoe</h1>
          <form onSubmit={handleSubmit} id="create-shoe-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Manufacturer"
                required
                type="text"
                name="manufacturer"
                id="manufacturer"
                className="form-control"
                value={formData.manufacturer}
              />
              <label htmlFor="manufacturer">Manufacturer</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Model"
                required
                type="text"
                name="model"
                id="model"
                className="form-control"
                value={formData.model}
              />
              <label htmlFor="model">Model</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Color"
                required
                type="text"
                name="color"
                id="color"
                className="form-control"
                value={formData.color}
              />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder="Picture URL"
                required
                type="text"
                name="picture_url"
                id="picture_url"
                className="form-control"
                value={formData.picture_url}
              />
              <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="mb-3">
              <select
                value={formData.bin}
                onChange={handleFormChange}
                required
                name="bin"
                id="bin"
                className="form-select"
              >
                <option value="">Choose a Bin</option>
                {closetNames.map((closetName) => (
                  <option value={closetName.href} key={closetName.id}>
                    {closetName.closet_name} Bin #: {closetName.bin_number}{" "}
                    Size: {closetName.bin_size}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
      </div>
    </div>
  );
}

export default ShoeForm;
