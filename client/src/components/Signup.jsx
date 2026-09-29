import { useState } from "react";

function Signup() {
    //  state variables. They remember what the user types into each input box.
    const [f_name, setFName] = useState("");
    const [l_name, setLName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // This state will hold success or error messages from the server later
    const [message, setMessage] = useState("");

    // function runs when the user clicks the submit button
    async function handleSubmit(event) {
        event.preventDefault();

        // Group all the users input into a single object
        const newUserData = { f_name, l_name, username, password };

        try {
            // Send the data to the /signup route we just built in server.js
            const response = await fetch("http://localhost:9000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUserData), // Convert the object to text for sending
            });

            // Wait for the server to send a response back
            const data = await response.json();

            // Update the message state to display the server's response on the screen
            setMessage(data.message);

        } catch (error) {
            console.error("Error connecting to server:", error);
            setMessage("A server error occurred.");
        }

    }

    return (
        <div>
            <h2>Sign Up</h2>

            {/* If there is a message, this line will display it on the screen */}
            {message && <p>{message}</p>}

            {/* The form calls handleSubmit when the button is clicked */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name: </label>
                    <input
                        type="text"
                        value={f_name}
                        // When the user types, update the f_name state with the new text
                        onChange={(event) => setFName(event.target.value)}
                    />
                </div>

                <div>
                    <label>Last Name: </label>
                    <input
                        type="text"
                        value={l_name}
                        onChange={(event) => setLName(event.target.value)}
                    />
                </div>

                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>

                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

// This allows other files to use this component
export default Signup;
