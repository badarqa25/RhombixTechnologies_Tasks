async function uploadImage() {
  const fileInput = document.getElementById("imageInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData
    });

    if (!res.ok) throw new Error("Upload failed");

    const result = await res.json();
    alert(result.message);
    loadImages();
  } catch (err) {
    console.error("Error uploading image:", err);
    alert("Failed to upload image.");
  }
}

async function loadImages() {
  try {
    const res = await fetch("http://localhost:3000/images");
    if (!res.ok) throw new Error("Failed to load images");

    const urls = await res.json();
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    urls.forEach(url => {
      const key = url.split("/").pop();

      const container = document.createElement("div");
      container.className = "relative";

      const img = document.createElement("img");
      img.src = url;
      img.alt = "Uploaded image";
      img.className = "w-full h-48 object-cover rounded shadow";

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "🗑️";
      deleteBtn.className =
        "absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs";
      deleteBtn.onclick = () => deleteImage(key);

      container.appendChild(img);
      container.appendChild(deleteBtn);
      gallery.appendChild(container);
    });
  } catch (err) {
    console.error("Error loading images:", err);
    document.getElementById("gallery").innerHTML =
      "<p class='text-red-500'>Failed to load images.</p>";
  }
}

async function deleteImage(key) {
  if (!confirm(`Delete "${key}"?`)) return;

  try {
    const res = await fetch(`http://localhost:3000/image/${encodeURIComponent(key)}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Delete failed");

    const result = await res.json();
    alert(result.message);
    loadImages();
  } catch (err) {
    console.error("Error deleting image:", err);
    alert("Failed to delete image.");
  }
}

window.onload = loadImages;
