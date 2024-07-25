$(function () {
  // adding expert
  $(".js-add-expert").click(function () {
    var url = $(".js-add-expert").attr("dtc");
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-expert").modal("show");
      },
      success: function (data) {
        $("#modal-expert .modal-content").html(data.html_form);
      }
    });
  });

  $("#modal-expert").on("submit", ".js-add-expert-form", function () {
    var form = $(this);
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: form.attr("method"),
      dataType: 'json',
      success: function (data) {
        if (data.form_is_valid) {
          alert("Успешно добавлен");
          $("#modal-expert").modal("hide");
        }
        else {
          $("#modal-expert .modal-content").html(data.html_form);
        }
      }
    });
    return false;
  });

  // writing expertize
  $(".js-create-expertize").click(function () {
    var url = $(".js-create-expertize").attr("dtc");
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      beforeSend: function () {
        $("#modal-expertize").modal("show");
      },
      success: function (data) {
        $("#modal-expertize .modal-content").html(data.expertize_html_form);
      }
    });
  });

  $("#modal-expertize").on("submit", ".js-create-expertize-form", function () {
    var form = $(this);
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: form.attr("method"),
      dataType: 'json',
      success: function (data) {
        if (data.form_is_valid) {
          alert("Успешно отправлен");
          $("#modal-expertize").modal("hide");
        }
        else {
          $("#modal-expertize .modal-content").html(data.expertize_html_form);
        }
      }
    });
    return false;
  });


});
