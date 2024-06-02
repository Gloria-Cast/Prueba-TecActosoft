
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

  const firebaseConfig = {
    apiKey: "AIzaSyANEEyzUwbB0gndivf-9UClFZDNjbYmsm0",
    authDomain: "prueba-tec-actosoft.firebaseapp.com",
    databaseURL: "https://prueba-tec-actosoft-default-rtdb.firebaseio.com",
    projectId: "prueba-tec-actosoft",
    storageBucket: "prueba-tec-actosoft.appspot.com",
    messagingSenderId: "17369011883",
    appId: "1:17369011883:web:d5784eedfda7ac044549ee"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import {getDatabase, ref, push, child, get, set, update, remove} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
  const db =getDatabase();

    let platillo = document.getElementById('platillo');
    let precio = document.getElementById('precio');
    let descripcion = document.getElementById('descripcion');      
    let categoria = document.getElementById('categoria');
    let ingredientes = document.getElementById('ingredientes');
    
    let AddBtn = document.getElementById('AddBtn');
    let EditBtn = document.getElementById('EditBtn');
    let DelBtn = document.getElementById('DelBtn');

    const newPostKey = push(child(ref(db), 'posts')).key;
    //console.log(newPostKey); | prueba

    //Añadir Producto
    function AddData (){
        set(ref(db, 'ProductoSet/' + newPostKey),{
            nombredelproducto: platillo.value,
            precio: Number(precio.value),
            descripcion: descripcion.value,
            categoria: categoria.value,
            ingredientes: ingredientes.value
        })
        .then(()=>{
            alert('Datos añadidos correctamente');
            console.log('hola');
        })
        .catch((error)=>{
            alert("Error, Datos no añadidos");
            console.log(error);
       })
    }
    //Obtener datos
    function RecData(){
        const dbRef = ref(db);

        get(child(dbRef, 'ProductoSet/')).then((snapshot)=>{
            if(snapshot.exists()){
                nombredelproducto.value = snapshot.val().platillo;
                precio.value = snapshot.val().precio;
                descripcion.value = snapshot.val().descripcion;
                categoria.value = snapshot.val().categoria;
                ingredientes.value = snapshot.val().ingredientes; 

            }
            else{
                alert("El producto no existe");
            }

        });

    }
    //Actualizar datos
    function EditData (){
        update(ref(db, 'ProductoSet/'),{
            nombredelproducto: platillo.value,
            precio: Number(precio.value),
            descripcion: descripcion.value,
            categoria: categoria.value,
            ingredientes: ingredientes.value
        })
        .then (()=>{
            alert('Datos actualizados correctamente');
        })
        .catch((error)=>{
            alert("Error, Datos no actualizados");
            console.log(error);
       })
    }
    //Eliminar Datos
    function DelData (){
        remove(ref(db, 'ProductoSet/'),{
        })
        .then (()=>{
            alert('Datos eliminados correctamente');
        })
        .catch((error)=>{
            alert("Error, Datos no eliminados");
            console.log(error);
       })
    }

    AddBtn.addEventListener('click', AddData);
    EditBtn.addEventListener('click', EditData);
    DelBtn.addEventListener('click', DelData);

    //producto.innerHTML = "<p>hola</p>";
