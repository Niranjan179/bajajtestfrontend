import React, { useState } from "react";
import axios from "axios";
function App() {
    const [jsonData, setJsonData] = useState("");
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleChange = (event) => {
        setJsonData(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = JSON.parse(jsonData);
            const res = await axios.post("https://bajajtest-27ae.onrender.com/bfhl", payload);
            console.log(res.data);
            setResponse(res.data);
            setSelectedOptions([]);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleOptionChange = (event) => {
        const options = Array.from(
            event.target.selectedOptions,
            (option) => option.value
        );
        setSelectedOptions(options);
    };
    return (
        <div className="App">
            <header className="App-header">
                <h1>{response ? response.roll_number : "Enter JSON Data"}</h1>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={jsonData}
                        onChange={handleChange}
                        placeholder='Enter JSON data: {"data": ["A","C","z"]}'
                        rows={4}
                        cols={50}
                        required
                    />
                    <br />
                    <button type="submit">Submit</button>
                </form>
                {response && (
                    <div>
                        <select
                            multiple
                            value={selectedOptions}
                            onChange={handleOptionChange}
                        >
                            <option value="alphabets">Alphabets</option>
                            <option value="numbers">Numbers</option>
                            <option value="highest_alphabet">
                                Highest Alphabet
                            </option>
                        </select>
                        <br />
                        <br />
                        <div>
                            {selectedOptions.includes("alphabets") && (
                                <div>
                                    <h3>Alphabets:</h3>
                                    <pre>
                                        {JSON.stringify(
                                            response.alphabets,
                                            null,
                                            2
                                        )}
                                    </pre>
                                </div>
                            )}
                            {selectedOptions.includes("numbers") && (
                                <div>
                                    <h3>Numbers:</h3>
                                    <pre>
                                        {JSON.stringify(
                                            response.numbers,
                                            null,
                                            2
                                        )}
                                    </pre>
                                </div>
                            )}
                            {selectedOptions.includes("highest_alphabet") && (
                                <div>
                                    <h3>Highest Alphabet:</h3>
                                    <pre>
                                        {JSON.stringify(
                                            response.highest_alphabet,
                                            null,
                                            2
                                        )}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;

