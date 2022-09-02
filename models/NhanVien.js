function NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam){
    this._taiKhoan = taiKhoan;
    this._hoTen = hoTen;
    this._email = email;
    this._matKhau = matKhau;
    this._ngayLam = ngayLam;
    this._luongCoBan = luongCoBan ;
    this._chucVu = chucVu ;
    this._gioLam = gioLam ;
    this._tongLuong = 0;
    this._xepLoai = "";

    this.tinhTongLuong = function(){
        if(this._chucVu === "Sếp"){
            this._tongLuong = parseFloat(this._luongCoBan) * 3;
        }
        else if(this._chucVu === "Trưởng phòng"){
            this._tongLuong = parseFloat(this._luongCoBan) * 2;
        }
        else if(this._chucVu === "Nhân viên"){
            this._tongLuong = parseFloat(this._luongCoBan) * 1;
        }
        // return this._tongLuong;
    }

    this.xepLoaiNhanVien = function(){
        if(parseFloat(this._gioLam) >= 192){
            this._xepLoai = "nhân viên xuất sắc";
        }
        else if(parseFloat(this._gioLam) >= 176){
            this._xepLoai = "nhân viên giỏi";
        }
        else if(parseFloat(this._gioLam) >= 160){
            this._xepLoai = "nhân viên khá";
        }
        else{
            this._xepLoai = "nhân viên trung bình";
        }
        // return this._xepLoai;
    }

}