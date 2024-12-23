import "./Crud.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Crud = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Function to fetch persons data from the backend
  const getPersons = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/persons/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch persons');
      }
  
      const result = await response.json();
  
      // Access the 'persons' array from the response
      if (Array.isArray(result.persons)) {
        setData(result.persons);  // Update state with the persons array
      } else {
        console.error('API did not return an array in the "persons" field:', result);
        setData([]);  // Fallback: set an empty array
      }
    } catch (error) {
      console.error('Error fetching persons:', error);
      setData([]);  // In case of error, reset data to an empty array
    }
  };
  
  

  // Handle adding or updating a person
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    try {
      if (editIndex !== null) {
        // Update the existing person
        const updatedPerson = {
          name,
          phoneNumber,
          city,
        };

        const response = await fetch("http://localhost:5000/api/persons/edit", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPerson),
        });

        if (response.ok) {
          console.log("Update successful");
          // Update the state after a successful update
          setData((prevData) =>
            prevData.map((item, index) =>
              index === editIndex ? updatedPerson : item
            )
          );
          setEditIndex(null); // Reset edit index
          navigate("/"); // Redirect after update
        } else {
          const data = await response.json();
          console.error(data.message || "Update Failed");
        }
      } else {
        // Add a new person
        const newPerson = { name, phoneNumber, city };
        const response = await fetch("http://localhost:5000/api/persons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPerson),
        });

        if (response.ok) {
          console.log("Person added successfully");
          setData((prevData) => [...prevData, newPerson]); // Add new person to state
          navigate("/"); // Redirect after adding
        } else {
          const data = await response.json();
          console.error(data.message || "Addition Failed");
        }
      }

      // Clear form fields after operation
      setName("");
      setPhoneNumber("");
      setCity("");
    } catch (error) {
      console.error("Error performing CRUD operation:", error);
    }
  };

  // Handle editing a person
  const handleEdit = (index) => {
    setName(data[index].name);
    setPhoneNumber(data[index].phoneNumber);
    setCity(data[index].city);
    setEditIndex(index);
  };

  // Handle deleting a person
  const handleDelete = async (index) => {
    const itemToDelete = data[index];

    try {
      const response = await fetch("http://localhost:5000/api/persons/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemToDelete),
      });

      if (response.ok) {
        const filteredData = data.filter((_, i) => i !== index);
        setData(filteredData);
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    getPersons(); // Fetch the data when the component mounts
  }, []);

  return (
    <div className="container">
      <h1>CRUD Operations</h1>
      <form onSubmit={handleAddOrUpdate}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter PhoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">{editIndex !== null ? "Update" : "Add"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>City</th>
            <th>PhoneNumber</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.city}</td>
              <td>{item.phoneNumber}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Crud;
