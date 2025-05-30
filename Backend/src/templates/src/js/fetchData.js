const form = document.getElementById("productForm");
const mensaje = document.getElementById("mensaje");

alert("SIJALA");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  mensaje.textContent = "⏳ Enviando...";

  const formData = new FormData(form);

  const URL = window.location.hostname.includes("localhost")
    ? "http://localhost:3000"
    : "https://3000-firebase-tienda-armasgit-1748497386001.cluster-aj77uug3sjd4iut4ev6a4jbtf2.cloudworkstations.dev/";

  try {
    const res = await fetch(`${URL}/api/v1/create-product`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      mensaje.textContent = "✅ Producto creado correctamente";
      form.reset();
    } else {
      mensaje.textContent = "❌ Error: " + (data.message || "No se pudo crear");
    }
  } catch (err) {
    console.error(err);
    mensaje.textContent = "❌ Error al conectar con el servidor";
  } finally {
    submitButton.disabled = false;
  }
});
