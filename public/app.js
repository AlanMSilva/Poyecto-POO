
$(function(){
    $('#btnObtener').on('click',function(){//activar funcion cuando pulse el boton
        $.ajax({
            url: '/campeones',//peticion al servidor a /campeones esto devuelve un arreglo
            success: function(campeones){//si funciono entonces...

                let tbody = $('tbody');//seleccionar el cuerpo de la tabla html
                tbody.html('');//limpiarla

                campeones.forEach(campeon => {//recorrer para obtener cada producto y cuando lo obtenga lo agregarlos a una fila
                    tbody.append(`
                        <tr>
                            <td class ="id" >${campeon.id}</td>
                            <td>
                                <input type="text" class ="nombre rounded p-1 m-1" value="${campeon.nombre}"/>
                            </td>

                            <td>
                                <input type="text" class ="region rounded p-1 m-1" value="${campeon.region}"/>
                            </td>

                            <td>
                                <input type="text" class ="tipo rounded p-1 m-1" value="${campeon.tipo}"/>
                            </td>

                            <td>
                                <input type="text" class ="costo rounded p-1 m-1" value="${campeon.costo}"/>
                            </td>

                            <td>
                                <button class ="modificarBtn btn btn-warning">Modificar</button>
                                <button class="eliminarBtn btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    `)
                })
            }
        })
    });
    $('#formCampeones').on('submit',function(e){//obtener el submit xd
        e.preventDefault();//para cancelar el evento de reiniciar el navegador
        let Lnombre = $('#txtNombre');//declaro variables para obtener los input
        let Lregion = $('#txtRegion');
        let Ltipo = $('#txtTipo');
        let Lcosto = $('#txtCosto');

        $.ajax({
            url:'/campeones',
            method: 'POST',
            data: {
                nombre: Lnombre.val(),// obtengo el valor y lo asigno
                region: Lregion.val(),
                tipo: Ltipo.val(),
                costo: Lcosto.val()
            },
            success: function (response) {// regreso la funcion del btnObtener para que se muestre al agregar un nuevo campeon 
                $('#btnObtener').click();
            }
        })
    });
    $('table').on('click', '.modificarBtn', function () {//cuando de click en modificar se ejecutara una funcion
        let fila = $(this).closest('tr');//nos selecciona toda la fila de un campeon
        let id = fila.find('.id').text();//obtengo los valores y los agrego a la var fila
        let nombre = fila.find('.nombre').val();
        let region = fila.find('.region').val();
        let tipo = fila.find('.tipo').val();
        let costo = fila.find('.costo').val();

        $.ajax({
            url: "/campeones/" + id,//lo mando a campeones + el id que selecciono
            method: 'PUT',
            data:{
                nombre: nombre,
                region: region,
                tipo: tipo,
                costo: costo
            },
            success: function (response){
                $('#btnObtener').click();//regreso la funcion del btnObtener para que se muestren los datos modificados :u
            }
        })
    });
    $('table').on('click', '.eliminarBtn', function(){//cuando de click en eleminar se ejecutara una funcion
        let fila = $(this).closest('tr');
        let id = fila.find('.id').text();

        $.ajax({
            url: '/campeones/' + id,
            method: 'DELETE',
            success: function(response){
                console.log(response);
                $('#btnObtener').click();
            }
        })
    });
})
