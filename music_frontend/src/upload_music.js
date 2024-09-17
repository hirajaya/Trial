import { useState } from "react";
import "./App.css";

export default function Music() {
    const [title, setTitle] = useState("");
    const [aName, setName] = useState("");
    const [composer, setComposer] = useState("");
    const [rLabel, setLabel] = useState("");
    const [genre, setGenre] = useState("");
    const [rDate, setDate] = useState("");
    const [musicFile, setMusicFile] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const apiUrl = "http://localhost:8000";

    const handleSubmit = () => {
        setError("");

        if (title && aName && musicFile) {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("aName", aName);
            formData.append("composer", composer);
            formData.append("rLabel", rLabel);
            formData.append("genre", genre);
            formData.append("rDate", rDate);
            formData.append("musicFile", musicFile);

            console.log([...formData]);  // Log FormData entries

            fetch(apiUrl + "/music", {
                method: "POST",
                body: formData,
            })
            .then((res) => res.json())
            .then((data) => {
                setMessage("Music uploaded successfully!");
                setTitle("");
                setName("");
                setComposer("");
                setLabel("");
                setGenre("");
                setDate("");
                setMusicFile(null);
            })
            .catch((err) => {
                setError("Failed to upload. Please try again.");
            });
        } else {
            setError("Please fill in all required fields and attach a music file.");
        }
    };

    return (
        <div className="upload-form">
            <h3>Upload Music</h3>
            {message && <p className="success-message">{message}</p>}
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Artist Name"
                    value={aName}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Composer"
                    value={composer}
                    onChange={(e) => setComposer(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Record Label"
                    value={rLabel}
                    onChange={(e) => setLabel(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Release Date"
                    value={rDate}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setMusicFile(e.target.files[0])}
                    required
                />
                <button className="upload-button" onClick={handleSubmit}>
                    Upload
                </button>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}
