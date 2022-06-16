---
title: Konfigurasi VIM - part 1
date: 2020-06-28
updatedAt: 2022-06-17 
tags:
    - vim
    - toos
---

![Banner](./sample-linux.png)

Karena `WHY NOT` menggunakan `vim` dalam keseharian ?

Sekilas cerita tentang saya dan `editor` yang saya gunakan, saya mulai mencoba
menggunakan `vim` pada tahun `2014`, setelah `hijrah` dari `sublime text`.

Alasannya, `iseng`. Mencoba menggunakan `vim`, padahal kesehariannya menggunakan
`submlime text`, adalah `sebuah percubaan yang mantap`. Mengapa ? pekerjaan yang
biasa saya lakukan menjadi lambat (berat). Namun, seiring berjalannya waktu
saya semakin terbiasa dan akhirnya menjadi ringan.

Okay, kita lupakan masa lalu karena `hidup terus mengalir` bagai `air` 🌊.

## Vim8

[Vim](Vim) yang saya gunakan saat ini adalah `Vi IMproved 8` bukan `nvim` seperti
kawan saya [@faultable](https://faultable.dev) yang `hipster`.  alasan pribadi
karena ~~senang aja dengan `kemurnian`~~ kebutuhan saya sudah terpenuhi dan
belum punya alasan untuk menggunakan `nvim` (neo-vim)

Menggunakan Vim tangan kosong (tanpa plugin) sangat menarik untuk kamu yang mau
belajar soal `essential` atau dasar - dasar dari vim. Untuk apa ? untuk
mengetahui bagaimana `vim` bekerja, contoh `vim` memiliki berkas konfigurasi
yang umumnya disimpan pada `path` `$HOME/.vimrc` atau `~/.vimrc`.  `.vimrc`
merupakan berkas untuk mengelola atau mengatur `vim` ketika kita gunakan
(`runtime`).

```bash
$ vim ~/.vimrc
# mulai-lah menambahkan konfigurasi yang kamu mau # simpan dengan perintah `:w`
# kemudian `:so %` untuk menerapkan konfigurasi saat menggunakan vim (apply in
# runtime)
```

Namun, Jika sudah dikejar `deadline` silahkan menggunakan `plugin` dengan
bantuan `plugin manager` yang bisa kamu dapatkan didunia ini.

## vim-plug

`vim-plug` merupakan `plugin manager`, mengapa membutuhkan ? Jadi, dengan menggunakan `manager` kita dapat mengurangi hal - hal, seperti ini:

```markdown

1. ambil berkas konfigurasi
2. ubah berkas konfigurasi `.vimrc`
3. terapkan dan gunakan

(start)
   |
   V
download configuration file
   |
   V
save to my local storage
   |
   V
apply in my vimrc 
   |
   V
 (end)
```

menggantikan hal tersebut dengan hanya menambahkan 1 baris kode pada `.vimrc` kamu, seperti ini:

```yaml
Plug 'username/plugin_name'
```

untuk menambahkan `vim-plug`, kamu hanya perlu menambahkan bari ini pada `.vimrc`:

```yaml
if empty(glob('~/.vim/autoload/plug.vim'))
    silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
                \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
    autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif
call plug#begin('~/.vim/plugged')
" Plugin List
" example: 
" Plug 'username/plugin_name'
call plug#end()
```

*   Baris 1: jika `'~/.vim/autoload/plug.vim'` tidak ada maka

*   Baris 2: mengunduh sebuah berkas `vim-plug` yang disimpan pada `github repository`

*   Baris 4: otomatis menjalankan perintah `Plugin --sync` dan `source $MYVIMRC` membaca konfigurasi `.vimrc`, ketika (`VimEnter`: `startup` atau dibuka melalui terminal)

*   Baris 5-9: tempat dimana kamu menuliskan `plugin` yang kamu gunakan

Okay, mari kita lanjut ke `unboxing` vim `saya`.
Untuk awal, saya akan mencoba membagi dalam beberapa bagian, seperti:

*   Interface (Theme, Style, Layout)
*   Language
*   Etc

## Interface (Theme, Style, Layout)

> Biar kamu jadi `pemakai` dan `pecandu` maka kita harus menawarkan hal - hal menarik yang membuat kamu melayang dan nyaman.

Untuk persoalan `antarmuka` atau `interface` atau jenis pekerjaanya para `frontend engineer`, maka kita dihadapkan kesebuah hal visual yang memiliki fungsi dan memberikan perasaan ketika kita menggunakan.

## NERDTree - `scrooloose/nerdtree`

`NERDTree`, `plugin` yang bertugas seperti ini

![NERDTree](./vim-nerdtree.png)

Hal - hal yang saya sukai:

*   menambahkan bookmark agar dapat berpindah - pindah dari project x ke y atau kemanapun yang saya mau
*   dapat mengetahui berkas mana yang telah dimodifikasi atau ditambahkan jika sedang aktif pada `git directory`

## edge - `sainnhe/edge`

Untuk `theme` dan `style` saya menggunakan `one dark` sebagai `color scheme`, dengan menggunakan plugin `sainnhe/edge`.
Hal menarik dari `plugin` ini adalah:

![edge](./sainhe-edge.png)

*   memiliki `variant` \[edge dark (aura), edge dark (neon),  edge light].
*   mendukung untuk `ligtline` dan `airline`.
*   1 theme yang dapat di terapkan ke `alacritty`, `zsh`, `kitty`, `termite`, dan `fzf`.

> BESOK, dilanjut
