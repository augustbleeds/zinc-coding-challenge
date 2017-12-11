$(document).ready( function() {
  $('#submit').click(function() {
    var link = $('#link').val()
    console.log('clicked ',link);
    $.ajax({
      url: `http://localhost:3000/api?link=${link}`,
      method: 'GET'
    })
      .then((resp) => {
        $('#table-anchor').empty();
        if(resp.data){
          var newTable = $(`<table class="table">`)
          var header = $(`<thead><tr><th> Speaker </th><th>Number of Lines</th></tr></thead>`);
          var body = $(`<tbody> </tbody>`)
          newTable.append(header);
          newTable.append(body);
          resp.data.forEach(function(obj){
            body.append($(`<tr> <td> ${obj.name} </td> <td> ${obj.numLines} </td> </tr>`));
          });
          $('#table-anchor').append(newTable);
        }else{
          $('#table-anchor').append(`<div class="alert alert-danger" role="alert"> Invalid URI, please submit again </div>`);
        }
      })
      .catch((err) => {
        console.log('err', err)
      });
  });
});
