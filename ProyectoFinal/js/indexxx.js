$(function(){
  cargarCiudades();
  cargarTipo();
  $('#mostrarTodos').on('click', function(){
    cargarArticulos();
  });
  $('select').material_select();
  $("#formulario").submit(activoFiltro);
});

var ciudad ="x";
var tipo="x";
$("select[name=ciudad]").change(function(){
  ciudad = $(this).val();
});
$("select[name=tipo]").change(function(){
  tipo = $(this).val();
});


function activoFiltro(event){
  event.preventDefault();
  var rangoCompleto = $("#rangoPrecio").val();
  var rangoMin = rangoCompleto.substr(0, rangoCompleto.search(";"));
  var rangoMax = rangoCompleto.substr((rangoCompleto.search(";")+1),((rangoCompleto.length)-rangoCompleto.search(";")+1));
  form_data = new FormData();
  form_data.append('ciudad', ciudad);
  form_data.append('tipo', tipo);
  form_data.append('rangoMin', rangoMin);
  form_data.append('rangoMax', rangoMax);
  $.ajax({
    url: './filtrarArticulos.php',
    dataType: 'text',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
    success: function(data){
      if (data == "") {
        $("quote").remove();
        $(".itemMostrado").remove();
        $("<quote>No se encuentran registros...</quote>").insertAfter(".divider");
      }else{
        $("quote").remove();
        $(".itemMostrado").remove();
        $(data).insertAfter(".divider");
      }
    },
    error: function(){
      alert("Error al filtrar articulos");
    }
  })
}

/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

function cargarArticulos(){
  var ciudad, telefono;
  $.ajax({
    url: './mostrarArticulos.php',
    dataType: 'text',
    type: 'post',
    data: {},
    success: function(data){
      $("quote").remove();
      $(".itemMostrado").remove();
      $(data).insertAfter(".divider");
      $("#filtroCiudad select").prop('selectedIndex', 0);
      $("#filtroCiudad select").material_select();
    },
    error: function(){
      alert("Error al cargar articulos");
    }
  })
}

function cargarCiudades(){
  $.ajax({
    url: './cargarCiudad.php',
    dataType: 'text',
    type: 'post',
    data:{},
    success: function(data){
      $(".filtroCiudad select").append(data);
      $(".filtroCiudad select").material_select();
    },
    error: function(){
      alert("Error al cargar ciudades");
    }
  })
}

function cargarTipo(){
  $.ajax({
    url: './cargarTipo.php',
    dataType: 'text',
    type: 'post',
    data:{},
    success: function(data){
      alert(data);
      $(".filtroTipo select").append(data);
      $(".filtroTipo select").material_select();
    },
    error: function(){
      alert("Error al cargar tipo");
    }
  })
}

inicializarSlider();
playVideoOnScroll();
