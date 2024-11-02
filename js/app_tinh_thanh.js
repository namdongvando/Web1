async function GetPhuongXaTheoQuanHuyen(mahuyen, target) {
    await $.ajax({
        type: "get",
        url: "/phuongxa.json",
        dataType: "json",
        success: function (response) {
            //  danh sách phường xã response
            // khởi tạo chuỗi rỗng
            var quanHuyenOption = "";
            $.map(response, function (elementOrValue, indexOrKey) {
                // lấy danh sách xã theo huyện
                if (elementOrValue.parent_code == mahuyen) {
                    // console.log('elementOrValue', elementOrValue);
                    quanHuyenOption += `<option value='${elementOrValue.code}' >${elementOrValue.name_with_type}</option>`;
                }
            });
            // string -> html 
            $(`.phuongxa[data-target='${target}']`).html(quanHuyenOption);

        }
    });
}
async function GetQuanHuyenTheoTinh(matinh, target) {
    await $.ajax({
        type: "get",
        url: "/quanhuyen.json",
        dataType: "json",
        success: function (response) {
            // danh sách huyện response
            var quanHuyenOption = "";
            // lặp dang sách huyện -> lấy theo tỉnh
            $.map(response, function (elementOrValue, indexOrKey) {
                if (elementOrValue.parent_code == matinh) {
                    // console.log('elementOrValue', elementOrValue);
                    // json -> string
                    quanHuyenOption += `<option value='${elementOrValue.code}' >${elementOrValue.name_with_type}</option>`;
                }
            });
            // string -> html
            console.log(`.quanhuyen[data-target='${target}']`);

            $(`.quanhuyen[data-target='${target}']`).html(quanHuyenOption);

        }
    });

}
//  khi tải xong
$(document).ready(function () {

    $(".tinhthanh").each(function () {
        var target = $(this).data("target");
        console.log('target', target);
        $.ajax({
            type: "get",
            url: "/tinhthanh.json",
            dataType: "json",
            success: function (response) {
                var htmlOptions = "";
                $.map(response, function (elementOrValue, indexOrKey) {
                    htmlOptions += `<option value='${elementOrValue.code}' >${elementOrValue.name_with_type}</option>`;

                });
                $(".tinhthanh").html(htmlOptions);
            }
        });

        $(this).change(function (e) {
            GetQuanHuyenTheoTinh($(this).val(), target)

        });
    });
    $(".quanhuyen").change(function () {
        var target = $(this).data("target");
        GetPhuongXaTheoQuanHuyen($(this).val(), target);

    });

});
