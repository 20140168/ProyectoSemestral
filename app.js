function initDB(){

	db = new Dexie('MyDatabase');
	db.version(1).stores({
		contactos: '++id, nombre, correo, telefono'
	});

};

function getData(_data_form){
	var obj = {};

	_data_form.forEach(function(ele, index){
		obj[ele.name] = ele.value;
	});

	return obj;

};

function getAllData(){
	var coleccion = db.contactos.toCollection();
	var html = "";
	coleccion.toArray().then(function(resultado){
		resultado.forEach(function(ele, index){
			console.log(ele);
			html += "<tr>"+
          				"<td>"+(index+1)+"</td>"+
          				"<td>"+ele.nombre+"</td>"+
          				"<td>"+ele.correo+"</td>"+
          				"<td>"+ele.telefono+"</td>"+
        			"</tr>";
		});

		$("#resultados > tbody").empty().append(html);
	});

	//return coleccion.toArray();
}

$(document).ready(function(){

	var modalNuevo = $('#modalNuevo');
	var nuevoElemento = $('#nuevoElemento');
	var btnGrabar = $('#btnGrabar');

	btnGrabar.on('click', function(event){
		console.log("click");
		var datos = nuevoElemento.serializeArray();
		db.contactos.add(getData(datos)).then(function(){
			modalNuevo.modal('hide');
			getAllData();
		});
	});

	initDB();
	getAllData();

});