import { useEffect, useState } from "react";
import axios from "axios";

const headers = {
  Authorization: "563492ad6f91700001000001f600d4b0691a48db9dc1fb4924dc754d",
};

function App() {
  const [imageToSearch, setImageToSearch] = useState("");
  const [resultImages, setResultImages] = useState([]);

  useEffect(() => loadDefaultPhotos(), []);
  return (
    <div className="App flex flex-col items-center p-2 gap-2">
      <form
        className="flex gap-4 fixed bg-gray-400 p-2 bg-opacity-50 rounded shadow"
        onSubmit={searchImage}
      >
        <input
          type="text"
          onChange={(e) => setImageToSearch(e.target.value)}
          className="p-2 border-2 border-black shadow"
          required
        />
        <button type="submit" className="font-bold">
          Search
        </button>
      </form>
      <div className="grid grid-cols-3 gap-2 mt-20 container">
        {resultImages.map((val, i) => (
          <a
            href={val.src.landscape}
            target="_blank"
            rel="noreferrer"
            download={"test.jpg"}
          >
            <img
              src={val.src.portrait}
              className="rounded shadow"
              key={i}
              alt={val.photographer}
            />
          </a>
        ))}
      </div>
    </div>
  );

  async function searchImage(e) {
    e.preventDefault();
    const url = `https://api.pexels.com/v1/search?query=${imageToSearch}&per_page=12`;

    const result = await axios.get(url, { headers });

    setResultImages(result.data.photos);
  }

  async function loadDefaultPhotos() {
    const url = `https://api.pexels.com/v1/curated?per_page=12`;
    const result = await axios.get(url, { headers });
    setResultImages(result.data.photos);
  }
}

export default App;
