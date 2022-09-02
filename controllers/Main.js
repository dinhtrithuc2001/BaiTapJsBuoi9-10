var dsnv = new QuanLyNhanVien();
var validation = new Validation();

// Lấy dữ liệu từ localStorage ra để hiển thị lên table
getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNhanVien(isUpdate) {
  var taiKhoan = getEle("tknv").value;
  var hoTen = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCoBan = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  var isValid = true;
  // Kiem tra tai khoan, Nếu isUpdate là false thì mới kiểm tra tài khoản
  if(!isUpdate){
    isValid &=
    validation.kiemTraRong(
      taiKhoan,
      "tbTKNV",
      "(*) Tài khoản không để trống"
    ) &&
    validation.kiemTraDoDaiKyTu(
      taiKhoan,
      "tbTKNV",
      "(*) Tài khoản từ 4 - 6 ký tự",
      4,
      6
    ) && validation.checkTaiKhoanTonTai(taiKhoan, "tbTKNV", "(*) Tài khoản đã tồn tại");
  }
  // Kiểm tra họ tên
    isValid &=
    validation.kiemTraRong(hoTen, "tbTen", "(*) Họ tên không để trống") &&
    validation.kiemTraKyTuChuoi(hoTen, "tbTen", "(*) Tên phải là ký tự chuỗi");
  // Kiem tra email
  isValid &=
    validation.kiemTraRong(email, "tbEmail", "(*) Email không để trống") &&
    validation.checkEmail(email, "tbEmail", "(*) Email phải đúng định dạng");
  // Kiểm tra mật khẩu
  isValid &=
    validation.kiemTraRong(
      matKhau,
      "tbMatKhau",
      "(*) Mật khẩu không để trống"
    ) &&
    validation.kiemTraDoDaiKyTu(
      matKhau,
      "tbMatKhau",
      "(*) Mật khẩu phải từ 6 - 10 ký tự",
      6,
      10
    ) &&
    validation.kiemTraPassWord(
      matKhau,
      "tbMatKhau",
      "(*) Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );
  // Kiểm tra ngày làm
  isValid &=
    validation.kiemTraRong(ngayLam, "tbNgay", "(*) Ngày làm không để trống") &&
    validation.kiemTraDinhDangNgayLam(
      ngayLam,
      "tbNgay",
      "(*) Ngày làm phải đúng định dạng dd/mm/yyyy"
    ) &&
    validation.kiemTraNgayLam(
      ngayLam,
      "tbNgay",
      "(*) Ngày tháng năm không đúng"
    );
  // Kiểm tra chức vụ
  isValid &= validation.checkChucVu("chucvu", "tbChucVu", "(*) Chức vụ không để trống");
  // Kiểm tra lương
  isValid &=
    validation.kiemTraRong(
      luongCoBan,
      "tbLuongCB",
      "(*) Lương cơ bản không để trống"
    ) &&
    validation.kiemTraChuoiSo(
      luongCoBan,
      "tbLuongCB",
      "(*) Lương phải ở dạng số và đúng định dạng"
    ) &&
    validation.kiemTraDoDaiSo(
      luongCoBan * 1,
      "tbLuongCB",
      "(*) Lương trong phạm vi 1tr - 20tr",
      1000000,
      20000000
    );
  // Kiểm tra thời gian làm
  isValid &=
    validation.kiemTraRong(gioLam, "tbGiolam", "(*) Giờ làm không để trống") && validation.kiemTraChuoiSo(gioLam, "tbGiolam", "(*) Giờ làm phải ở dạng số")
    && validation.kiemTraDoDaiSo(
      gioLam * 1,
      "tbGiolam",
      "(*) Giờ làm trong phạm vi 80 - 200 giờ",
      80,
      200
    );
  // Nếu isValid == false thì trả về null do vi phạm điều kiện kiểm tra nào đó ở trên
  if (!isValid) return null;
  // Tạo đối tượng nhân viên truyền vào các dữ kiện
  var nhanVien = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  );
  // Tính tổng lương
  nhanVien.tinhTongLuong();
  // Xếp loại cho nhân viên
  nhanVien.xepLoaiNhanVien();

  return nhanVien;
}
// Sự kiện thêm nhân viên
getEle("btnThemNV").addEventListener("click", () => {
  var nhanVien = layThongTinNhanVien(false);

  if (nhanVien) {
    dsnv.themNhanVien(nhanVien);

    setLocalStorage();

    renderTable(dsnv.array);
  }
});

// Show dữ liệu ra bảng
function renderTable(data) {
  var content = "";

  data.forEach((nv) => {
    content += `<tr>
            <td>${nv._taiKhoan}</td>
            <td>${nv._hoTen}</td>
            <td>${nv._email}</td>
            <td>${nv._ngayLam}</td>
            <td>${nv._chucVu}</td>
            <td>${nv._tongLuong}</td>
            <td>${nv._xepLoai}</td>
            <td>
                <button class="btn btn-success" onClick="suaNV('${nv._taiKhoan}')" data-toggle="modal" data-target="#myModal">Sửa</button>
                <button class="btn btn-danger mt-1" onClick="xoaNV('${nv._taiKhoan}')">Xóa</button>
            </td>
        </tr>`;
  });

  getEle("tableDanhSach").innerHTML = content;
}

function setLocalStorage() {
  var stringData = JSON.stringify(dsnv.array);
  localStorage.setItem("DanhSachNhanVien", stringData);
}

function getLocalStorage() {
  var stringData = localStorage.getItem("DanhSachNhanVien");
  var jsonData = JSON.parse(stringData);
  dsnv.array = jsonData;
  if (jsonData) {
    renderTable(jsonData);
  }
}

function xoaNV(taiKhoan) {
  dsnv._xoaNV(taiKhoan);
  setLocalStorage();
  renderTable(dsnv.array);
}

function suaNV(taiKhoan) {
  getEle("btnCapNhat").style.display = "block";
  getEle("btnThemNV").style.display = "none";

  var nhanVien = dsnv._layThongTinNhanVien(taiKhoan);

  if (nhanVien) {
    getEle("tknv").value = nhanVien._taiKhoan;
    getEle("tknv").disabled = true;
    getEle("name").value = nhanVien._hoTen;
    getEle("email").value = nhanVien._email;
    getEle("password").value = nhanVien._matKhau;
    getEle("password").type = "text";
    getEle("datepicker").value = nhanVien._ngayLam;
    getEle("luongCB").value = nhanVien._luongCoBan;
    getEle("chucvu").value = nhanVien._chucVu;
    getEle("gioLam").value = nhanVien._gioLam;
  }
  resetValidation();
}

getEle("btnCapNhat").addEventListener("click", () => {
  var nhanVien = layThongTinNhanVien(true);
  dsnv._capNhatNhanVien(nhanVien);
  setLocalStorage();
  renderTable(dsnv.array);
});

getEle("searchName").addEventListener("keyup", () => {
  var keyword = getEle("searchName").value;
  var mangTimKiem = dsnv._timKiemNhanVien(keyword);
  renderTable(mangTimKiem);
});

getEle("btnThem").onclick = () => {
  var today = new Date();
  getEle("tknv").value = "";
  getEle("tknv").disabled = false;
  getEle("name").value = "";
  getEle("email").value = "";
  getEle("password").value = "";
  getEle("password").type = "password";
  getEle("luongCB").value = "";
  getEle("chucvu").value = "Chọn chức vụ";
  getEle("gioLam").value = "";
  getEle("btnCapNhat").style.display = "none";
  getEle("btnThemNV").style.display = "block";
  resetValidation();
};

function resetValidation(){
    getEle("tbTKNV").style.display = "none";
    getEle("tbTen").style.display = "none";
    getEle("tbEmail").style.display = "none";
    getEle("tbMatKhau").style.display = "none";
    getEle("tbNgay").style.display = "none";
    getEle("tbLuongCB").style.display = "none";
    getEle("tbChucVu").style.display = "none";
    getEle("tbGiolam").style.display = "none";
}
