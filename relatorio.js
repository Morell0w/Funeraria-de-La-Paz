function buscar(){

let id = document.getElementById("idFalecido").value

fetch("buscar.php?id="+id)

.then(res => res.text())

.then(data => {
document.getElementById("resultado").innerHTML = data
})

}