export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("TiendaDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("usuarios")) {
        const usuariosStore = db.createObjectStore("usuarios", { keyPath: "id", autoIncrement: true });
        usuariosStore.createIndex("email", "email", { unique: true });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function agregarUsuario(usuario) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["usuarios"], "readwrite");
    const store = transaction.objectStore("usuarios");
    const request = store.add(usuario);

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function buscarUsuarioPorEmail(email) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["usuarios"], "readonly");
    const store = transaction.objectStore("usuarios");
    const index = store.index("email");
    const request = index.get(email);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
