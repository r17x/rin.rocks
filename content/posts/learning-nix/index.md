---
title: Belajar Nix
date: 
updatedAt:  
tags:
    - nix
    - development
    - deployment
    - build
    - infra
    - software
---

# Belajar Nix

Jika kamu baru mendengar istilah ini atau masih bingung _Nix ini apa sebenarnya?_ maka tak perlu untuk terlalu bingung. Berikut beberapa hal yang membuat kamu memiliki alasan kenapa harus menggunakan:

* Nix adalah bahasa pemrograman dengan gaya bahasa seperti [Lisp](), tidak memiliki _type system_, dan tentunya _functional programming_.
* Nix adalah _package manager_ dengan menawarkan konsep yang unik dan sangat berbeda dengan beberapa _package manager_ seperti _brew_ , apt, apk, dan pacman.
* Nix adalah sebuah konsep bagaimana mengatur kebutuhan (dependencies management) dengan mengadopsi konsep _purely functional programming_ seperti *Immutable*, *Isolated*, & *Transparancy*.

# Mengapa anda harus mendengarkan saya?

Saya bukan guru, dosen, scientist, saya tidak punya pengalaman 10 tahun dengan Nix, saya juga tak memiliki gelar seperti PhD dan saya tidak menyelesaikan kuliah Teknik Informatika.

Namun, Nix dapat membantu anda dalam development ataupun deployment sebuah piranti lunak dari seorang yang 1 langkah lebih dari anda karena telah menggunakan sejak awal tahun 2022 untuk kebutuhan development (menyediakan kebutuhan sebuah project tanpa memerlukan waktu dan proses _setup_ yang panjang) dan mendefinisikan kebutuhan pribadi sehingga pengalaman dalam sebuah komputer dapat disamakan pada komputer yang berbeda.


* TODO....
* List Video
* List Artikel
* List repository


# Bagaimana memandang ecosystem nix? 

Nix memiliki ecosystem yang sangat luas. Namun, hal dasar yang perlu dipahami adalah dia sebagai package manager atau dependencies management yang sangat unik. karena keunikan tersebutlah maka kita dapat menggunakan lebih dari sekedar mengatur dependencies ataupun untuk kebutuhan yang spesifik. Misalnya: 
* kalian bisa menggunakan sebagai project setup agar mengurangi waktu onboard pengembang baru pada sebuah project yang anda miliki
* kalian bisa menggunakan nix sebagai alternative dari `Dockerfile` untuk urusan build docker image
* kalian bisa menggunakan untuk membangun `Dotfiles`. Sehingga, segala kebutuhan development anda secara personal mudah disediakan kembali pada komputer yang lain atau perangkat yang lain.

