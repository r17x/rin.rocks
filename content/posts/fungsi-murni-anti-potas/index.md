---
title: Pure Function
date: 2021-04-28
slug: /kemurnian-fungsi
tags:
    - JavaScript
    - Functional Programming
---

> Apa salahnya kujual Miras   
> Anggur, Vodka, Arak beras, dijamin MURNI tanpa potas    
> ~ silampukau

Membaca potongan lirik diatas, pembaca akan berfikir bahwa pedangang Miras tersebut menjual minuman yang MURNI tanpa campuran atau bahan pengawet yang dapat memberikan efek samping kepada konsumen, peminum, atau "pelanggan" . Padahal se-MURNI-nya minuman tersebut, tetap saja memberikan efek samping yakni mabuk jika banyak, kalau sedikit kayaknya nggak deh! 👀.

Okay, kembali kejalan yang benar. Pada tulisan ini saya ingin memberikan sebuah cerita tentang pemrograman fungsional atau _Functional Programming_. Dalam pemrograman fungsional kita akan familiar dengan istilah _Pure Function_ atau fungsi murni (saking murninya tanpa potas loh). 

> _Pure Function_ merupakan sebuah fungsi yang tidak memiliki efek samping. Dengan kata lain, masukan dan keluaran (_input/output_) dari fungsi tersebut selalu sama.  
   
Apakah pembaca memahami pernyataan diatas? jika belum, yah lanjut saja bacanya 🙌. 

Kunci utama yang perlu kita "pegang" dalam pernyataan diatas ialah _input_ dan _output_ sebuah fungsi selalu sama. Misalnya, ketika kita membuat sebuah fungsi menambahkan nilai {N} dengan 2, sehingga potongan kodenya seperti ini:

```js
/**
 * @pure add
 * @param {Number} a
 * @param {Number} b
 * @return {Number} a + b
 */
const add = (a, b) => a + b

/**
 * @pure addTwo
 * @param {number} n
 * @return {number} + 2
 */
const addTwo = (n) => add(n, 2)
```
   
Dari kode diatas, kita sudah tahu jika {N} bernilai 2 maka kembaliannya adalah ~~3~~ 4. (Yailah, kodenya pendek begitu, apapun yang terjadi yah N akan selalu ditambah dengan 2). Nah, sesederhana itu.

Dari fungsi `addTwo` kita belajar: 

* `addTwo` merupakan definisi dan nama fungsinya
* paramater {N} harus bertipe data {Number} (Javascript type-data) 
* paramater {N} HARUS di-operasikan dengan {2}
* Kembalian dari fungsi tersebut HARUS {Number} 

Mendapat kepastian tentang artikel ini ? 

Jika tidak, kamu boleh bertanya, memberikan kritik, atau apapun (terserah kamu) [Kita: Diskusikan Disini](https://github.com/ri7nz/rin.rocks/discussions/10)


## Referensi
* https://en.wikipedia.org/wiki/Pure_function
