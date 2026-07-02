let todos = [];
let filter = 'semua';

function tampilkanTodo() {
    let daftar = document.getElementById('daftarTodo');
    let keyword = document.getElementById('searchTodo').value;
    let jumlahSelesai = 0;

    daftar.innerHTML = '';
    
    todos.forEach((todo, index) => {
        let teksTodo = todo.todo;
        
        if (!teksTodo.toLowerCase().includes(keyword.toLowerCase())) {
            return;
        }
        if (filter === 'selesai' && !todo.selesai) {
            return;
        } 
        if (filter === 'belum' && todo.selesai) {
            return;
        }

        if (todo.selesai) {
            jumlahSelesai++;
        }

        let tombol = 'selesai';
        let icon = '';
        let prioritas = todo.prioritas;
        if (prioritas === 'Tinggi') {
            icon = '[Tinggi]';
        } else if (prioritas === 'Sedang') {
            icon = '[Sedang]';
        } else {
            icon = '[Rendah]';
        }
        
        if (todo.selesai) {
        teksTodo = '✔️ ' + todo.todo;
        tombol = 'Batal ';
     }
    daftar.innerHTML += `<li> 
    <span>${icon} ${teksTodo}</span>
        <div class="aksi">    
    <button class="hapus" onclick="hapusTodo(${index})"> Hapus</button> 
    <button class="selesai" onclick="selesaiTodo(${index})"> ${tombol}</button> 
    <button class="edit" onclick="editTodo(${index})"> Edit</button>
        </div>
    </li>`;
});

    let jumlah = document.getElementById('jumlahTodo');
    jumlah.textContent = 'Total To Do = ' + todos.length;

    let jumlahBelum = todos.length - jumlahSelesai;
    document.getElementById('jumlahSelesai').textContent = 'Selesai = ' + jumlahSelesai;
    document.getElementById('jumlahBelum').textContent = 'Belum Selesai = ' + jumlahBelum;

    let persen = 0;
    if (todos.length > 0) {
        persen = (jumlahSelesai / todos.length) * 100;
    }
    document.getElementById('progressBar').style.width = persen + '%';
    document.getElementById('persenProgress').textContent = Math.round(persen) + '%';
}

function tambahTodo() {
    let tugas = 
        document.getElementById('todoInput').value;
    let prioritas = document.getElementById('prioritas').value;

    if (tugas.trim() === '') {
        alert('Tidak boleh kosong!');
        return;
    };

    todos.push({
        todo: tugas.trim(),
        selesai: false,
        prioritas,
        
    });
   
    document.getElementById('todoInput').value = '';

    simpanData();
    tampilkanTodo();
}

function hapusTodo(index) {
    todos.splice(index, 1);
    simpanData();
    tampilkanTodo();
}

function selesaiTodo(index) {
    todos[index].selesai = !todos[index].selesai;
    simpanData();
    tampilkanTodo();
}

function editTodo(index) {
    let edit = prompt(todos[index].todo);
     if (edit !== null) {
        todos[index].todo = edit;
    }
    simpanData();
    tampilkanTodo();
}

function simpanData () {
    localStorage.setItem('todos', JSON.stringify(todos));
    
}

function keluarinData () {
    let data = localStorage.getItem('todos');
    if (data) {
        todos = JSON.parse(data);
    } 
    tampilkanTodo();
}

keluarinData();

function cekEnter(event) {
    if (event.key == 'Enter') {
        tambahTodo();
    }
}

function hapusSemua() {
    let yakin = confirm('Apakah Anda Yakin??');
    if (yakin === true) {
        todos = [];
        simpanData();
        tampilkanTodo();
    }
}

function ubahFilter(status) {
    filter = status;
    tampilkanTodo();
}
