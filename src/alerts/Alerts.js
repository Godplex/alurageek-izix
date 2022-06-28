import Swal from "sweetalert2";

export const errorCodeAlert = (code) => {
  console.log(code)

  switch (code) {
    case "auth/user-not-found":
      errorAlert("Este usuario no existe!");
      break;
    case "auth/wrong-password":
      errorAlert("Usuario o contraseña incorrectos!");
      break;
    case "auth/too-many-requests":
      errorAlert("Demasiados intentos fallidos, intente más tarde");
      break;
    case "auth/weak-password":
      errorAlert("Contraseña demasiado corta!");
      break;
    case "auth/email-already-in-use":
      errorAlert("Este correo electronico ya esta en uso!");
      break;
    case "storage/object-not-found":
      errorAlert("Archivo no encontrado!");
      break;
    case "storage/unauthorized":
      errorAlert("No tiene permiso para realizar esta acción!");
      break;
    case "storage/canceled":
      errorAlert("Subida cancelada, intentelo de nuevo!");
      break;
    case "storage/unknown":
      errorAlert("Error desconocido!");
      break;
    case "not-found":
      errorAlert("Producto no encontrado!");
      break;
    case "invalid-argument":
      errorAlert("Argumento invalido!");
      break;
    case "permission-denied":
      errorAlert("Usted no esta autorizado!");
      break;
    default:
      errorAlert(code);
      break;
  }
};

export const errorAlert = (message = "Error desconocido, intentelo de nuevo!") => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const successAlert = (message) => {
  Swal.fire({
    icon: "success",
    title: "Exito!",
    text: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const loadingAlert = () => {
  Swal.fire({
    title: "Cargando...",
    allowOutsideClick: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeAlert = () => {
  Swal.close();
};
