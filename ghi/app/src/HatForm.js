import React, { useState, useEffect } from "react";
function HatForm() {
  const [closetNames, setClosetNames] = useState([]);
  const [formData, setFormData] = useState({
    style_name: "",
    fabric: "",
    color: "",
    picture_url: "",
    location: "",
  });
  const handleFormChange = (event) => {
    const inputName = event.target.name; // eg manufacturer
    const value = event.target.value; // eg jack
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const hatUrl = "http://localhost:8080/api/hats/";
    const config = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(hatUrl, config);
    if (response.ok) {
      const newHat = await response.json();
      console.log(newHat);
      setFormData({
        style_name: "",
        fabric: "",
        color: "",
        picture_url: "",
        location: "",
      });
    }
  };
  const fetchData = async () => {
    const url = "http://localhost:8100/api/locations/";
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
        <h1>Create a new Hat</h1>
        <form onSubmit={handleSubmit} id="create-hat-form">
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              placeholder="Style Name"
              required
              type="text"
              name="style_name"
              id="style_name"
              className="form-control"
              value={formData.style_name}
            />
            <label htmlFor="style_name">Style Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              placeholder="Fabric"
              required
              type="text"
              name="fabric"
              id="fabric"
              className="form-control"
              value={formData.fabric}
            />
            <label htmlFor="fabric">Fabric</label>
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
              value={formData.location}
              onChange={handleFormChange}
              required
              name="location"
              id="location"
              className="form-select"
            >
              <option value="">Choose a Location</option>
              {closetNames.map((closetName) => (
                <option value={closetName.id} key={closetName.id}>
                  {closetName.closet_name}
                  {/* Section #: {closetName.section_number}
                    Shelf #:{" "} {closetName.shelf_number} */}
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
export default HatForm;
