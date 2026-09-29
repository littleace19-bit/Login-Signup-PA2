import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        // Group the credentials to send to the backend
        const loginData = { username, password };

        try {
            // Will build this /login route on the Express server next
            const response = await fetch("http://localhost:9000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            // Display the success or error message from the backend
            setMessage(data.message);

        } catch (error) {
            console.error("Error connecting to server:", error);
            setMessage("Could not connect to the server");
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Log In</button>
            </form>

            {/* This renders the message on the screen if it exists */}
            {message && <p><strong>{message}</strong></p>}
        </div>
    );
}

export default Login;