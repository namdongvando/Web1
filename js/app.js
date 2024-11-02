async function GetPhuongXaTheoQuanHuyen(mahuyen) {
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
            $("#phuongxa").html(quanHuyenOption);

        }
    });
}
async function GetQuanHuyenTheoTinh(matinh) {
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
            $("#quanhuyen").html(quanHuyenOption);

        }
    });

}
//  khi tải xong
$(document).ready(function () {

    $("#chon").click(function (e) {
        $("#hienthi").toggle(100);
        $("#hienthi").show(100);
        $("#hienthi").hide(100);
    });
    // lấy danh sách tỉnh -> select
    $.ajax({
        type: "get",
        url: "/tinhthanh.json",
        dataType: "json",
        success: function (response) {
            // console.log('response', response);
            // json -> string ->  html
            // string
            var htmlOptions = "";
            // lặp lại các phần tử trong m
            $.map(response, function (elementOrValue, indexOrKey) {
                // console.log('elementOrValue', elementOrValue);
                // tao option html từ json 
                htmlOptions += `<option value='${elementOrValue.code}' >${elementOrValue.name_with_type}</option>`;

            });
            // string -> html
            $("#tinhthanh").html(htmlOptions);
        }
    });
    // lấy danh sách huyện -> select
    GetQuanHuyenTheoTinh("01");
    // lấy danh sách phường -> select
    GetPhuongXaTheoQuanHuyen("250");

    // khi tỉnh thành thay dổi
    $("#tinhthanh").change(async function (e) {
        var matinh = $(this).val();
        // lấy danh sách huyện theo tinh
        await GetQuanHuyenTheoTinh(matinh);
        $("#quanhuyen").change();
    });
    // khi quận huyện thay dổi
    $("#quanhuyen").change(function (e) {
        var mahuyen = $(this).val();
        // lấy danh sách phường xã theo quận huyện
        GetPhuongXaTheoQuanHuyen(mahuyen);
    });

});
