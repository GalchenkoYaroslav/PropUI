function myFunction() {
    $.ajax({
        url: "http://localhost:8080/welcome",
        type: "POST",
        data: JSON.stringify(
            {hello: "Shahed"}
        ),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (json) {


            $('#records_table').remove();

            $('#t_wrapper').append('<table id="records_table" class="table table-bordered text-center" style="margin-top: 5%"/>');

            var props = {};

            for (var i = 0; i < json.length; i++) {
                $.each(json[i].properties, function (key, value) {
                    props[key] = value;
                });
            }

            var trHTML = '';
            trHTML += '<tr>';
            trHTML += '<td>' + '#' + '</td>'

            for (i = 0; i < json.length; i++) {
                trHTML += '<td>' + json[i]['fullHost'] + '</td>'
            }

            $.each(props, function (key, value) {

                var rowItems = [];

                for (i = 0; i < json.length; i++) {

                    var item = json[i].properties[key];

                    if (typeof item === "undefined") {
                        item = "N/A";
                    }

                    rowItems.push(item);
                }

                trHTML += '<tr>';
                trHTML += '<td>' + key + '</td>';

                if (checkForIdentical(rowItems) == true) {

                    for (i = 0; i < rowItems.length; i++) {

                        if (rowItems[i] === 'N/A') {
                            trHTML += '<td style="color: red; font-weight: bold; ">' + rowItems[i] + '</td>';
                        }else {
                            trHTML += '<td>' + rowItems[i] + '</td>';
                        }
                    }
                } else {
                    for (i = 0; i < rowItems.length; i++) {
                        if (rowItems[i] === 'N/A') {
                            trHTML += '<td style="background-color: yellow; color: red; font-weight: bold">' + rowItems[i] + '</td>';
                        } else {
                            trHTML += '<td style="background-color: yellow">' + rowItems[i] + '</td>';
                        }
                    }
                }
                trHTML += '</tr>';
            });
            trHTML += '</tr>';
            $('#records_table').append(trHTML);
        }
    });
};


function checkForIdentical(array) {
    return new Set(array).size == 1;
}






