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
  query,
  where,
  getDoc
} from "firebase/firestore";
import Swal from "sweetalert2";
import { async } from "@firebase/util";

//Iniciar sesión

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

//Restablecer contraseña

export const resetPassword = async (email) => {
  loadingAlert();
  return await sendPasswordResetEmail(auth, email)
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

//Crear usuario

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

//Cerrar sesión

export const logout = async () => {
  return await signOut(auth);
};

//Crear producto

export const createProduct = async (file, formValues, setFiles, reset) => {
  loadingAlert();

  const storageRef = ref(
    storage,
    "images/alura-geek-izix-" +
    Math.floor(Math.random() * Date.now()) +
    "." +
    file.name.split(".").pop()
  );

  await uploadImage(file, storageRef).then(async (storageRef) => {
    await getUrlImage(storageRef).then(async (url) => {
      await uploadData(url, storageRef, formValues).then(() => {
        setFiles([]);
        reset();
        successAlert("Su producto ha sido creado con existo!");
      })
        .catch(({ code }) => {
          closeAlert();
          errorCodeAlert(code);
        });
    }).catch(({ code }) => {
      closeAlert();
      errorCodeAlert(code);
    });
  }).catch(({ code }) => {
    closeAlert();
    errorCodeAlert(code);
  });

}

//Subir imagen de un producto

const uploadImage = async (file, storageRef) => {

  return await uploadBytes(storageRef, file).then(() => {
    return storageRef;
  });
};

//Obterner url imagen de un producto

const getUrlImage = async (storageRef) => {
  return await getDownloadURL(storageRef)
    .then((url) => {
      return url;
    });
};

//crear contenido del producto

const uploadData = async (
  url,
  storageRef,
  formValues
) => {
  const data = {
    name: formValues.name,
    price: formValues.price,
    category: formValues.category,
    description: formValues.description,
    imageUrl: url || "",
    imageRef: storageRef.fullPath,
  };

  return await addDoc(collection(db, "products"), data);
};

//Obtener todos los productos

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

//Eliminar producto

export const deleteProduct = async (id, imageRef, products, setProducts) => {
  Swal.fire({
    title: "¿Esta seguro?",
    text: "!No podra deshacer los cambios!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "!Si, eliminar!",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      loadingAlert();
      await deleteImage(imageRef).then(async () => {
        await deleteData(id)
          .then(() => {
            let filtredData = products.filter((item) => item.id !== id);
            setProducts(filtredData);
            closeAlert();
            successAlert("El producto ha sido eliminado!");
          }).catch(({ code }) => {
            closeAlert();
            errorCodeAlert(code);
          });
      }).catch(({ code }) => {
        closeAlert();
        errorCodeAlert(code);
      });
    }
  });
};

//Eliminar imagen producto

const deleteImage = async (imageRef) => {
  const desertRef = ref(storage, imageRef);

  return await deleteObject(desertRef);
};

//Eliminar contenido producto

const deleteData = async (id) => {
  return await deleteDoc(doc(db, "products", id));
};

//Actualizar producto

export const updateProduct = async (formValues, id, products, setProducts) => {
  loadingAlert();

  const data = {
    name: formValues.name,
    price: formValues.price,
    category: formValues.category,
    description: formValues.description,
  };

  return await updateData(id, data)
    .then(() => {
      const newState = products.map((p) => {
        if (p.id === id) {
          const { name, price, category, description } = data;
          return { ...p, name, price, category, description };
        }
        return p;
      });
      setProducts(newState);
      successAlert("Su producto ha sido actualizado con exito!");
    })
    .catch(({ code }) => {
      errorCodeAlert(code);
    });
};

//Actualizar contenido del producto

const updateData = async (id, data) => {
  const ProductRef = doc(db, "products", id);
  return await updateDoc(ProductRef, data)
}

//Actualizar imagen producto

export const updateImage = async (file, imageRef, id, products, setProducts, handleClose2, setFiles) => {

  loadingAlert();

  const storageRef = ref(storage, imageRef);

  return await uploadImage(file, storageRef).then(async (storageRef) => {
    await getUrlImage(storageRef).then(async (url) => {

      const data = {
        imageUrl: url,
        imageRef: imageRef
      };

      await updateData(id, data).then(() => {
        const newState = products.map((p) => {
          if (p.id === id) {
            const { imageUrl, imageRef } = data;
            return { ...p, imageUrl, imageRef };
          }
          return p;
        });
        setFiles([]);
        handleClose2();
        setProducts(newState);
        successAlert("Su imagen ha sido actualizada con exito!");
      })
        .catch(({ code }) => {
          errorCodeAlert(code);
        });

    }).catch(({ code }) => {
      closeAlert();
      errorCodeAlert(code);
    });
  }).catch(({ code }) => {
    closeAlert();
    errorCodeAlert(code);
  });

}

export const getProductsByCategory = async (category, setProducts, setIsLoading) => {
  const q = query(collection(db, "products"), where("category", "==", category));

  return await getDocs(q).then((querySnapshot) => {
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
}

export const getSimilarProducts = async (id, setProducts, setIsLoading, category) => {

  const q = query(collection(db, "products"), where("category", "==", category));

  return await getDocs(q).then((querySnapshot) => {
    const newUserDataArray = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    let filtredData = newUserDataArray.filter((item) => item.id !== id);
    setProducts(filtredData);
    setIsLoading(false);
  })
    .catch(({ code }) => {
      errorCodeAlert(code);
    });
}

export const getProductById = async (id, setProduct, setIsLoading, setExits) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    setProduct({ ...docSnap.data(), id: docSnap.id });
    setIsLoading(false);
  } else {
    setExits(false);
    setIsLoading(false);
  }
}


