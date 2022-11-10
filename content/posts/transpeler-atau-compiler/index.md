---
title: Transpiler itu apa?
slug: transpiler-compiler-and-meler
description: Apakah kamu pernah berfikir untuk memahami lebih dalam bagaimana sebuah bahasa pemrograman itu dimaknai (berjalan) ?
date: 2022-10-02
updateAt:
tags:
    - Programming Language
    - Transpiler
    - Compiler
    - Tooling
---

> Apakah kamu pernah berfikir untuk memahami lebih dalam bagaimana sebuah bahasa pemrograman itu dimaknai (berjalan) ?


## Bahasa

Bahasa adalah sebuah sebuah simbol, lambang, atau bunyi - bunyian yang berkembang berdasarkan suatu aturan yang disepakati oleh pemakainya. Sederhananya, sesuatu yang digunakan untuk berkomunikasi. Namun, kali ini kita coba persempit dalam ruang lingkup pemrograman. Programmer adalah seseorang yang menulis dan berkomunikasi dengan komputer (tepatnya program komputer). Dalam berkomunikasi dengan komputer maka kita tanpa sadar sepakat terhadap aturan yang berlaku dan apapun yang menjadi dasar pada sebuah komputer. Programmer adalah seorang pemakai dari sebuah bahasa dan secara langsung mengakui aturan dan tata cara menulis dan berkomunikasi dengan bahasa tersebut. Ketika bahasa tersebut dituliskan apakah kalian berfikir siapa yang menegakkan aturan, struktur, dan tata cara tersebut? 

> jawabannya adalah tergantung.

Didalam komputer dan ketika kalian menulis sebuah program maka kalian akan berkomunikasi dengannya dan dibantu oleh alat yang biasanya kita kenal sebagai sebagai _"Compiler"_.

### Compiler

> Compile menerjemahkan antara kode sumber dari bahasa tingkat tinggi (high level) menjadi bahasa tingkat rendah (low level)


_High level_ adalah istilah ketika kalian menulis menggunakan sebuah bahasa dan menjadi bahasa utama dalam program yang kalian buat. Misalnya, kalian membuat aplikasi _web_ maka secara aturan yang berlaku kalian menggunakan _JavaScript_ sebagai alat komunikasi dilingkungan web.

_Low level_ adalah sebuah bahasa lanjutan dan menjadi hasil _compilation_ bahasa _High Level_ yang dikenali oleh sebuah lingkungan, _platform_, atau mesin untuk menjalankan sebuah instruksi tertentu (tergantung dari fungsi atau fitur yang dipakai pada _High Level_).

> Compiler adalah sebuah alat untuk menerjemahkan sebuah bahasa dari "HIGH Level" menjadi "LOW LEVEL".


```mermaid
flowchart LR;
  Start[High Level] --> Compiler --> Stop[Low Level];
```

### Transpiler

> Transpile: menerjemahkan antara kode sumber dalam tingkatan (level) abstraksi yang sama. (salah satunya ast - abstract syntax tree yang sama) 

Setelah kalian mengenal sedikit tentang _compiler_ sekarang kita berkenalan dengan _transpiler_. Yah, agak mirip dengan _compiler_ namun sebenarnya berbeda.

Perbedaannya yang paling "eksplisit" ialah transpiler masih ditingkatan bahasa yang sama namun diubah menjadi standar tertentu. Misalnya, dari format `es2022` menjadi `cjs` pada spesifikasi untuk bahasa *JavaScript*.


## Bahasa Dimaknai

Ketika tahap _compilation_ dari sebuah program itu selesai, maka program tersebut HARUSnya bisa dijalankan. Untuk dapat dijalankan maka hal tersebut sudah diketahui dan dipahami kumpulan instruksi yang ada pada program.

Siapa yang memaknai hal tersebut? *Runtime* (Tukang yang menjalankan program atau penggerak dari program)

> Program yang menjalankan program

Dimana Program tersebut dijalankan? 

* Entah itu Web
  * Chrome V8 
  * SpiderMonkey
  * JavascriptCore
* Entah itu disistem Operasi
  * Nodejs
  * LuatJIT
  * Zend Engine
  * BEAM
  * ART (bukan asisten rumah tangga tapi _Android Runtime_)
  * JVM (Ehem)
* Entah itu Hardware (Yah ujungnya hardware, atau mau tahu siapa ujungnya? yah listrik lah)
  * `1010101010101010101010100101010`
* Entah sampai kapan? (_sangat mencengankan_)

## Kesimpulan

* Mesin tidak pernah peduli soal _clean code_ yang dia peduli adalah hasil dari code kamu itu instruksinya sudah efisien, baik, terstruktur, dan tidak melewati batasan.
* Manusia sangat peduli dengan _clean code_ karena menjadi bagian proses komunikasi antara manusia, program, dan komputer itu sendiri.

## Referensi

* https://en.wikipedia.org/wiki/SpiderMonkey
* https://en.wikipedia.org/wiki/Runtime_system
* https://www.quora.com/How-does-computer-hardware-understand-binary-digits
* https://developer.apple.com/documentation/javascriptcore
* https://nodejs.org/en/
* https://luajit.org/
