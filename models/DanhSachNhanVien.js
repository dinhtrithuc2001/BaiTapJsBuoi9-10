function QuanLyNhanVien(){
    this.array = [];

    this.themNhanVien = function(nv){
        this.array.push(nv);
    }
    this.timViTriNhanVien = function(tk){
        var index = -1;

        this.array.forEach((nv, i) => {
            if(tk === nv._taiKhoan){
                index = i;
            }
        })

        return index;
    }
    this._xoaNV = function(tk){
        var index = this.timViTriNhanVien(tk);
        if( index !== -1){
            this.array.splice(index, 1);
        }
    }

    this._layThongTinNhanVien = function(tk){
        var nhanVien = null;
        if(this.timViTriNhanVien(tk) !== -1){
            nhanVien = this.array[this.timViTriNhanVien(tk)];
        }
        return nhanVien;
    }

    this._capNhatNhanVien = function(nv){
        var index = this.timViTriNhanVien(nv._taiKhoan);
        if(index !== -1){
            this.array[index] = nv; 
        }
    }

    this._timKiemNhanVien = (keyword) => {
        var mangTimKiem = [];

        this.array.forEach((nv) => {
            var keywordLowerCase = keyword.toLowerCase();
            var typeLowerCase = nv._xepLoai.toLowerCase();
            if(typeLowerCase.indexOf(keywordLowerCase) !== -1){
                mangTimKiem.push(nv);
            }
        })

        return mangTimKiem;
    }
}