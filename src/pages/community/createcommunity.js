import React, { useState } from 'react';

const PersonsList = ({ data }) => (
    <div className="personsList">
        {data.length > 0 ? (
            data.map((person) => (
                <div key={person.id} className="personItem">
                    {/* Display person details */}
                    <p>Name: {person.name}</p>
                    <p>Location: {person.location}</p>
                    <p>Type: {person.type}</p>
                    {/* Add other person details as needed */}
                </div>
            ))
        ) : (
            <div className="noResultsMessage">No results found</div>
        )}
    </div>
);

const CreateCommunityForm = ({ onBack }) => {
    const [formData, setFormData] = useState({
        communityName: '',
        location: '',
        type: '',
    });

    const [filteredPersons, setFilteredPersons] = useState([]);


    // Sample persons data
    const personsData = [
        { id: 1, name: 'ranjith', location: 'Hydrabad', type: 'nonveg' },
        { id: 2, name: 'sathish', location: 'chennai', type: 'veg' },
        { id: 3, name: 'rohit', location: 'Bangalore', type: 'veg' },
        { id: 4, name: 'simrathaa', location: 'Kochi', type: 'veg' },
        { id: 5, name: 'john', location: 'Hydrabad', type: 'nonveg' },
        { id: 6, name: 'emily', location: 'Hydrabad', type: 'veg' },
        { id: 7, name: 'alex', location: 'chennai', type: 'Mind diets' },
        { id: 8, name: 'priya', location: 'chennai', type: 'veg' },
        { id: 9, name: 'vikram', location: 'chennai', type: 'Vegan' },
        { id: 10, name: 'ananya', location: 'chennai', type: 'veg' },
        { id: 11, name: 'rahul', location: 'Bangalore', type: 'Mind diets' },
        { id: 12, name: 'shreya', location: 'Bangalore', type: 'veg' },
        { id: 13, name: 'akash', location: 'Bangalore', type: 'Vegan' },
        { id: 14, name: 'neha', location: 'Tirupati', type: 'veg' },
        { id: 15, name: 'arjun', location: 'Tirupati', type: 'Mind diets' },
        // Add more persons data as needed
    ];

    // Add even more data if required


    // const filteredPersons = personsData.filter(
    //     (person) =>
    //         person.location === formData.location || person.type === formData.type
    // );

    const handleBack = () => {
        onBack();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        const filteredPersons = personsData.filter((person) => {
            return (
                (person.location === formData.location && person.type === formData.type)

            );
        });


        console.log(filteredPersons)
        setFilteredPersons(filteredPersons);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const handleChange = (e, type) => {

        if (type === "input") {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));

            const filteredPersons = personsData.filter((person) => {
                return (
                    (person.location === formData.location && person.type === formData.type)
    
                );
            });
    
    
            console.log(filteredPersons)
            setFilteredPersons(filteredPersons);


        } else {

            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));



        }

    };

    return (
        <div className="cCContainer">
            <div className="cCBackButtonContianer">
                <button className="cCButtonBack" onClick={handleBack}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </div>
            <div className="cCContainerForm">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="cCInputContainer">
                        <input
                            type="text"
                            name="communityName"
                            className="cCSearchInput"
                            placeholder="Enter community name"
                            value={formData.communityName}
                            onChange={(e) => handleChange(e, "input")}
                            onKeyPress={handleKeyPress}
                        />

                        <select
                            name="location"
                            className="cCSearchSelect"
                            value={formData.location}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        >
                            <option value="Tirupati">Tirupati</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Hydrabad">Hydrabad</option>
                            <option value="Kochi">Kochi</option>
                        </select>
                        <select
                            name="type"
                            className="cCSearchSelect"
                            value={formData.type}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        >
                            <option value="nonveg">nonveg</option>
                            <option value="veg">veg</option>
                            <option value="Vegan">vegan</option>
                            <option value="Mind diets">Mind diets</option>
                        </select>
                    </div>
                </form>
                <div className='cCbuttonContainer'>
                    <button className='cCApplyButton'>Apply</button>
                    <button className='cCClearButton'>Clear</button>
                </div>
            </div>
            <PersonsList data={filteredPersons} />
        </div>
    );
};

export default CreateCommunityForm;
