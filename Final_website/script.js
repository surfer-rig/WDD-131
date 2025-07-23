// Genre data
const genreData = {
  rock: {
    artists: ["Queen", "Nirvana", "The Rolling Stones"],
    songs: ["Back In Black", "Stairway To Heaven", "Welcome To The Jungle"]
  },
  pop: {
    artists: ["Taylor Swift", "Ariana Grande", "Dua Lipa"],
    songs: ["Billie Jean", "Like A Prayer", "Dancing Queen"]
  },
  reggae: {
    artists: ["Bob Marley", "Toots & the Maytals", "Jimmy Cliff"],
    songs: ["Amber", "Rude Magic", "Get Up, Stand Up"]
  },
  rap: {
    artists: ["Kendrick Lamar", "Eminem", "J. Cole"],
    songs: ["The Message", "Rappers Delight", "Juicy"]
  },
  classical: {
    artists: ["Mozart", "Beethoven", "Bach"],
    songs: ["Eine kleine Nachtmusik", "Symphony No.5", "Toccata and Fugue in D minor"]
  },
  country: {
    artists: ["Johnny Cash", "Dolly Parton", "Luke Bryan"],
    songs: ["The Gambler", "He Stopped Loving Her Today", "Crazy"]
  },
  indie: {
    artists: ["Tame Impala", "Phoebe Bridgers", "Arctic Monkeys"],
    songs: ["Where Is My Mind", "Take Me Out", "Float On"]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const findBtn = document.querySelector(".find-btn");
  const genreSelect = document.getElementById("genre-select");
  const goBtn = document.getElementById("go-btn");
  const themeToggle = document.getElementById("theme-toggle");

  // Show/hide genre select form
  if (findBtn) {
    findBtn.addEventListener("click", () => {
      genreSelect.classList.toggle("hidden");
    });
  }

  // Handle multi-genre "Go" button
  if (goBtn) {
    goBtn.addEventListener("click", () => {
      const selected = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(input => input.value);
      const query = selected.length ? `?genres=${selected.join(",")}` : "";
      window.location.href = "recommendations.html" + query;
    });
  }

  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light");
      localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
    });
  }

  // Apply saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
  }

  // Render saved artists/songs (on saved.html)
  if (document.getElementById("saved-artists")) {
    renderSaved("savedArtists", "saved-artists");
  }
  if (document.getElementById("saved-songs")) {
    renderSaved("savedSongs", "saved-songs");
  }

  // Render genre content (on recommendations.html)
  const params = new URLSearchParams(window.location.search);
  const genreParam = params.get("genre");
  const genresParam = params.get("genres");

  let genres = [];
  if (genreParam) {
    genres = [genreParam.toLowerCase()];
  } else if (genresParam) {
    genres = genresParam.toLowerCase().split(",");
  }

  if (genres.length && document.querySelector(".artists") && document.querySelector(".songs")) {
    renderRecommendations(genres);
  }
});

// Save functions
function saveArtist(artist) {
  let saved = JSON.parse(localStorage.getItem("savedArtists")) || [];
  if (!saved.includes(artist)) saved.push(artist);
  localStorage.setItem("savedArtists", JSON.stringify(saved));
}

function saveSong(song) {
  let saved = JSON.parse(localStorage.getItem("savedSongs")) || [];
  if (!saved.includes(song)) saved.push(song);
  localStorage.setItem("savedSongs", JSON.stringify(saved));
}

// Render saved artists/songs
function renderSaved(type, containerId) {
  const data = JSON.parse(localStorage.getItem(type)) || [];
  const container = document.getElementById(containerId);
  container.innerHTML = data.length
    ? data.map(item => `<div class="card">${item}</div>`).join("")
    : "<p>Nothing saved yet.</p>";
}

// Render dynamic recommendations
function renderRecommendations(genres) {
  const artistSection = document.querySelector('.artists .card-list');
  const songSection = document.querySelector('.songs .card-list');

  let allArtists = [];
  let allSongs = [];

  genres.forEach(genre => {
    const entry = genreData[genre];
    if (entry) {
      allArtists.push(...entry.artists);
      allSongs.push(...entry.songs);
    }
  });

  if (allArtists.length === 0 && allSongs.length === 0) {
    artistSection.innerHTML = "<p>No recommendations found.</p>";
    songSection.innerHTML = "";
    return;
  }

  artistSection.innerHTML = "";
  songSection.innerHTML = "";

  allArtists.forEach(artist => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `${artist} <button onclick="saveArtist('${artist}')">Save</button>`;
    artistSection.appendChild(div);
  });

  allSongs.forEach(song => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `${song} <button onclick="saveSong('${song}')">Save</button>`;
    songSection.appendChild(div);
  });
}
