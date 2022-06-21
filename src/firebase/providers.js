import {
  closeAlert,
  errorCodeAlert,
  loadingAlert,
  successAlert,
} from "../alerts/Alerts";
import { auth, db, storage } from "../firebase/firebaseconf";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";

export const loginUser = async (email, password) => {
  loadingAlert();
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      closeAlert();
      return true;
    })
    .catch(({ code }) => {
      closeAlert();
      errorCodeAlert(code);
      return false;
    });
};

export const resetPassword = async (email) => {
  loadingAlert();
  await sendPasswordResetEmail(auth, email)
    .then(() => {
      closeAlert();
      successAlert("Se ha enviado un correo para restablecer la contraseña!");
      return true;
    })
    .catch(({ code }) => {
      closeAlert();
      errorCodeAlert(code);
      return false;
    });
};

export const createUser = async (email, password) => {
  loadingAlert();
  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      closeAlert();
      return true;
    })
    .catch(({ code }) => {
      closeAlert();
      errorCodeAlert(code);
      return false;
    });
};

export const logout = async () => {
  return await signOut(auth);
};

export const createRefImage = async (file, formValues, setFiles, reset) => {
  loadingAlert();

  const storageRef = ref(
    storage,
    "images/alura-geek-izix-" +
      Math.floor(Math.random() * Date.now()) +
      "." +
      file.name.split(".").pop()
  );

  uploadImage(storageRef, file, formValues, setFiles, reset);
};

export const uploadImage = (storageRef, file, formValues, setFiles, reset) => {
  uploadBytes(storageRef, file)
    .then((resp) => {
      console.log(resp);
      getUrlImage(storageRef, formValues, setFiles, reset);
    })
    .catch(({ code }) => {
      closeAlert();
      errorCodeAlert(code);
    });
};

export const getUrlImage = async (storageRef, formValues, setFiles, reset) => {
  getDownloadURL(storageRef)
    .then((url) => {
      console.log(storageRef);

      uploadData(url, storageRef, formValues, setFiles, reset);
    })
    .catch(({ code }) => {
      closeAlert();
      errorCodeAlert(code);
    });
};

export const uploadData = async (
  url,
  storageRef,
  formValues,
  setFiles,
  reset
) => {
  const data = {
    name: formValues.name,
    price: formValues.price,
    category: formValues.category,
    description: formValues.description,
    imageUrl: url || "",
    imageRef: storageRef.fullPath,
  };

  await addDoc(collection(db, "products"), data)
    .then(() => {
      setFiles([]);
      reset();
      successAlert("Su producto ha sido creado con existo!");
    })
    .catch(({ code }) => {
      closeAlert();
      errorCodeAlert(code);
    });
};

export const getProducts = async (setProducts, setIsLoading) => {
  return await getDocs(collection(db, "products"))
    .then((querySnapshot) => {
      const newUserDataArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(newUserDataArray);
      setIsLoading(false);
    })
    .catch(({ code }) => {
      errorCodeAlert(code);
    });
};

export const deleteProduct = async (id, imageRef, products, setProducts) => {
  Swal.fire({
    title: "¿Esta seguro?",
    text: "!No podra deshacer los cambios!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "!Si, eliminar!",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      loadingAlert();
      deleteImage(imageRef, id, products, setProducts);
    }
  });
};

export const deleteImage = async (imageRef, id, products, setProducts) => {
  const desertRef = ref(storage, imageRef);

  await deleteObject(desertRef)
    .then(() => {
      deleteData(id, products, setProducts);
    })
    .catch(({ code }) => {
      closeAlert();
      errorCodeAlert(code);
    });
};

export const deleteData = async (id, products, setProducts) => {
  await deleteDoc(doc(db, "products", id))
    .then(() => {
      const filtredData = products.filter((item) => item.id !== id);
      setProducts(filtredData);
      closeAlert();
      successAlert("El producto ha sido eliminado!");
    })
    .catch(({ code }) => {
      closeAlert();
      errorCodeAlert(code);
    });
};

export const uploadProduct = async (formValues, id, products, setProducts) => {
  loadingAlert();

  const ProductRef = doc(db, "products", id);

  const data = {
    name: formValues.name,
    price: formValues.price,
    category: formValues.category,
    description: formValues.description,
  };

  await updateDoc(ProductRef, data)
    .then(() => {
      const newState = products.map((p) => {
        if (p.id === id) {
          const { name, price, category, description } = data;
          return { ...p, name, price, category, description };
        }
        return p;
      });
      setProducts(newState);
      successAlert("Su producto ha sido creado con existo!");
    })
    .catch(({ code }) => {
      errorCodeAlert(code);
    });
};
