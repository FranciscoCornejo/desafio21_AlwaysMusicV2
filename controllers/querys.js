import pool from "../config/db.js";

//Funcion Promesa Asyncrona: SELECT usando un objeto JSON como argumento
const selectMusicos = async () => {
  try {
    const consulta = {
      text: "SELECT * FROM musicos",
      rowMode: "array",
    };
    const resultado = await pool.query(consulta);
    console.log("Musicos: ", resultado.rows);
  } catch (error) {
    console.log(error);
  }
};
//selectMusicos(); //las funciones se ejecutaran en switch

//parametros capturados por consola usando el metodo argv del modulo process
const parametros = process.argv.slice(2);

const opcion = parametros[0];
const nombre = parametros[1];
const rut = parametros[2];
const curso = parametros[3];
const nivel = parametros[4];

//Funcion Promesa Asyncrona: INSERT INTO, elementos Parametrizados: consulta, valor y respuesta
const insertMusico = async (nombre, rut, curso, nivel) => {
  try {
    const consulta = {
      text: "INSERT INTO musicos (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)",
      rowMode: "array",
    };
    const valores = [nombre, rut, curso, nivel];
    const respuesta = await pool.query(consulta, valores);
    console.log("perfil creado con exito." + respuesta.rows);
  } catch (error) {
    console.log(error);
  }
};
//insertMusico(nombre, rut, curso, nivel); //las funciones se ejecutaran en switch

//Funcion Promesa Asyncrona: UPDATE
const updateMusicos = async (nombre, rut, curso, nivel) => {
  try {
    const consulta = {
      text: "UPDATE musicos SET nombre = $1, rut = $2, curso = $3, nivel = $4 WHERE rut = $2",
      rowMode: "array",
    };
    const values = [nombre, rut, curso, nivel];
    const respuesta = await pool.query(consulta, values);
    console.log("perfil actualizado con exito." + respuesta.rows);
  } catch (error) {
    console.log(error);
  }
};
//updateMusicos(nombre, rut, curso, nivel); //las funciones se ejecutaran en switch

// //Funcion Promesa Asyncrona: DELETE
const deleteMusicos = async (rut) => {
  try {
    const consulta = {
      text: "DELETE FROM musicos WHERE rut = $1",
      rowMode: "array",
    };
    const values = [rut];
    const respuesta = await pool.query(consulta, values);
    console.log("perfil eliminado con exito." + respuesta.rows);
  } catch (error) {
    console.log(error);
  }
};
//deleteMusicos(rut); //las funciones se ejecutaran en switch

//Funcion Promesa Asyncrona: SELECT
const Musico = async (rut) => {
  try {
    let consulta = {
      text: "SELECT * FROM musicos",
      rowMode: "array",
    };
    const values = [];
    if (rut) {
      consulta.text += " WHERE rut = $1"; // Modificar la propiedad text
      values.push(rut);
    }
    const resultado = await pool.query(consulta, values);
    console.log("Musico: ", resultado.rows);
  } catch (error) {
    console.log(error);
  }
};
//Musico(rut);

switch (opcion) {
  case "crear":
    insertMusico(nombre, rut, curso, nivel);
    break;
  case "actualizar":
    updateMusicos(nombre, rut, curso, nivel);
    break;
  case "eliminar":
    const rutMusico = parametros[1];
    deleteMusicos(rutMusico);
    break;
  case "mostrar":
    selectMusicos();
    break;
  case "musico":
    const rutMusico2 = parametros[1];
    Musico(rutMusico2);
    break;
  default:
    console.log("opcion no valida");
}
