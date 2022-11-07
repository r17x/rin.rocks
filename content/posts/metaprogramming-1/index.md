---
title: Metaprogramming, iyakah? wah ngerinya. - Part 1
date: 2022-11-07  
updatedAt: 
tags:
  - meta-programming
  - javascript
---
## Prolog

Yah ini adalah kata pengantar, sebenarnya saya tidak tahu mau menulis apa dan bagaimana saya ingin menyampaikan (sesuatu). Namun, dalam hati selalu dibayangi oleh perasaan dan keingin untuk menulis sesuatu. (Yah, sekalian ingin belajar kembali menulis dengan baik dan dapat dimengerti, supaya empati semakin terasa dan semakin berasa). 

Keseharian saya selalu diwarnai dengan pertemuan antara makhluk hidup yang berakal dan berakhlatuk qorimah karena selalu dalam ruang kerja yang penuh tanda tanya (Task kemarin, gimana? aman?). Yah, saya masih sering menulis sebuah kata untuk mesin komputer sehingga orang2 menyebutnya program atau aplikasi yang dapat digunakan untuk kebutuhan mereka. 

Karena keseringan menulis kode, saya sebenarnya merasa bosan namun rasa bosan ini tak kunjung pergi. Dia, semakin berkembang dan berevolusi dalam dimensi yang berbeda. Entahlah, saya juga bingung ngomong apa. Yang intinya, saya senang melakukan dan menghasilkan sesuatu tanpa perlu menulis baris kode demi kode. 

Karena kemalasan tersebut saya semakin larut dengan sebuah hal yang disebut "meta-programming". 

Wikipedia berseru tentang __meta-programming__

> `Metaprogramming` is a programming technique in which computer programs have the ability to treat other programs as their data. This means that a program can be designed to read, generate, analyze, or transform other programs, and even modify itself while running.

Mari, kita coba deskripsikan menggunakan diri kita sendiri (dimulai dari diri sendiri!):

Sebuah `program` yang memiliki kemampuan untuk memperlakukan program lain sebagai **DATA**. Ketika sebuah program mampu meperlakukan program lain sebagai data maka program tersebut dapat merancang ulang, menulis ulang, memodifikasi, membuat ulang, menganalisa, atau mengubah program lain dan bahkan dapat memanipulasi dirinya sendiri saat berjalan.


Wokay, sekian kata pengantar untuk hal ini. mari kita kembalik ke _taufik_. 


## Menulis kode

Menulis kode biasanya kita aktualisasikan dengan menggunakan alat bantu yang bernama *editor* atau *IDE*. Dengan menggunakan *editor*, editor pada dasarnya hanya mampu untuk membaca dan menulis (sebelum berbagai macam magic atau program tambahan kita tambahkan kedalam editor tersebut) Ini konteksnya editor  seperti vim, ed, atau sejenisnya kawan-kawan. Berbeda dengan *IDE*, biasanya sudah memiliki berbagai macam fitur dalam seni menulis kode seperti `formatting`, `linting`, & `refactoring`.

Sudahi soal alat tulis, poin pentingnya apa pak? 

Okay, jadi begini.

* Apakah kalian pernah berfikir bagaimana `formater` atau `linter` bekerja ? 

> bisa - bisanya dengan mencet tombol anu dia menghasilkan anu yah

* Apakah kalian pernah merasa terbantu oleh sebuah alat yang digunakan untuk menghasilkan ribuan kode demi kebutuhan anda terpenuhi? (generated sdk, library, function, and lain - lain)

Bagaimana hal tersebut bisa terjadi? apakah ada hubungannya dengan `meta-programming`?

Jawabannya "Iya" dan tidak semua "Iya".

Okay, kita lanjut kembali dengan menggunakan bahasa yang sangat populer dalam hal dicintai dan dibenci yakni JavaScript. 

Berikut potongan kode sebuah permintaan data kesalah satu alamat penyedia data (endpoint).

```javascript
fetch("/api/v1/ping")
  .then(response => response.json())
```

Dalam membangun program atau aplikasi  _client_ dan _server_ tentunya kalian harus berurusan dengan namanya network (http-request) dan semakin berkembang aplikasinya maka semakin banyak pula endpoint yang diperlukan (Gw gak bahas soal single file php yang menghasilkan triliunan yah).

Nah semakin banyak _endpoint_ maka semakin banyak pula program `client` atau `frontend` yang akan dituliskan untuk menunjang kebutuhan dari aplikasi yang kita kembangkan.

Semakin banyaknya hal tersebut kira - kira solusi apa saja yang akan lahir? ada banyak hal sebenarnya. Namun, saya mencoba memberikan sebuah gambaran dan sangat berkaitan dengan "meta-programming". 

Seperti yang dibahas pada kata pengantar, _meta-programming_ yakni memiliki kemampuan untuk mengubah program lain.

Dalam kasus ini saya ingin mencoba mengubah sebuah program dimana sebuah kode yang kita tuliskan seperti ini

```javascript
f.json("/api/v1/ping")
```
akan menghasilkan kode yang sama dengan ini

```javascript
fetch("/api/v1/ping")
  .then(response => response.json())
```

Hal yang kita dapatkan setelah melakukan hal tersebut, yakni:

* Menulis lebih singkat (yah hanya itu)

Meskipun sekecil itu sebenarnya ada banyak data dan fungsi yang kita lakukan. Untuk mencapai hal tersebut kita perlu **memperlakukan program lain sebagai DATA**.


Sebuah kode program tidak hanya sebuah text atau kata namun dibalik tulisan tersebut ada sebuah data yang disebut dengan "Abstract Syntax Tree" atau disingkat **AST** (Bukan astagafirullah).

AST merupakan sebuah data yang struktural dan digunakan untuk mengetahui informasi dari sebuah program dan digunakan untuk kebutuhan kompilasi (compilation), tranformasi (transform), dan manipulasi. Setiap bahasa pemrograman memiliki AST (tentunya).

Misalnya pada kode Berikut


```javascript
// yang kita lihat cuma 1 baris
console.log("Hai cantik!")
```

ASTnya (ketika kode tersebut menjadi sebuah data)

```json
{
  "type": "Module",
  "span": {
    "start": 0,
    "end": 26,
    "ctxt": 0
  },
  "body": [
    {
      "type": "ExpressionStatement",
      "span": {
        "start": 0,
        "end": 26,
        "ctxt": 0
      },
      "expression": {
        "type": "CallExpression",
        "span": {
          "start": 0,
          "end": 26,
          "ctxt": 0
        },
        "callee": {
          "type": "MemberExpression",
          "span": {
            "start": 0,
            "end": 11,
            "ctxt": 0
          },
          "object": {
            "type": "Identifier",
            "span": {
              "start": 0,
              "end": 7,
              "ctxt": 1
            },
            "value": "console",
            "optional": false
          },
          "property": {
            "type": "Identifier",
            "span": {
              "start": 8,
              "end": 11,
              "ctxt": 0
            },
            "value": "log",
            "optional": false
          }
        },
        "arguments": [
          {
            "spread": null,
            "expression": {
              "type": "StringLiteral",
              "span": {
                "start": 12,
                "end": 25,
                "ctxt": 0
              },
              "value": "Hai cantik!",
              "raw": "\"Hai cantik!\""
            }
          }
        ],
        "typeArguments": null
      }
    }
  ],
  "interpreter": null
}
```

Dengan begini, maka kita bisa lihat struktur dari kode singkat si-paling nge-console. dengan melihat struktur ini kita bisa memanipulasi.

Okay cukup sekian dulu, semoga tidak membuat hari - harimu menjadi pusing.

Dengan memahami sedikit demi sedikit AST ini kalian akan tercerahkan dengan pertanyaan sebelumnya mengenai `linter`, `formatter`, atau `codemod`. Karena dengan memahami `AST` kalian dapat membuat sebuah program untuk memanipulasi sebuah program (yeah, meta-programming). Hal ini mengapa `eslint` bisa seenak jidat memarahi kalian, memperbaiki kode kalian (jika ada autofix), `refmt` dapat menyusun kode `rust` kacau menjadi cantik, atau si `prettier` yang dapat mempercantik berbagai macam file seperti `markdown`, `json`, `javascript`, dan lain-lain (sampai siprettier gak ngerti ini kode atau bahasa apa).


## Memulai membuat "penulis"

Berikut project "penulis" yang telah saya buat:
1. `fetch.macro` - jika kalian berpengalaman dengan `styled-component` atau `tailwind` nah kalian dapat merasakan membuat fungsi `fetcher` dengan pengalaman yang sudah kalian rasakan pada `styled-component`. 

```javascript
import f from 'fetch.macro'

const ping = f.json("/api/v1/ping")

    ↓ ↓ ↓ ↓ ↓ ↓

const ping = (opts) => fetch("/api/v1/ping", opts)

      [Digunakan]

ping({method: "GET", headers: {...}})
```

[Github: r17x/fetch.macro](https://github.com/r17x/fetch.macro)

> Write with JavaScript and 🦀

2. `babel-plugin-react-suspense` karena malas menulis pembungkus component yang dapat `suspensed` pada react maka saya membuat bagaimana implementasi `React.Suspense` lebih sederhana.

```javascript
<User suspense={<Loading />} />

         ↓ ↓ ↓ ↓ ↓ ↓
<React.Suspense fallback={<Loading />}>
  <User />
</React.Suspense>
```
[Github: r17x/babel-plugin-react-suspense](https://github.com/r17x/babel-plugin-react-suspense)

> Write with JavaScript

3. `i18n.macro` sebuah library yang kerjanya mengubah sebuah kata kunci menjadi sebuah kata.

> Masih beta pak! 

```javascript
/// file: i18n.json { "message": "hai dunia" }
import { t } from 'i18n.macro'

// ditulis
t.message

// ketika ditranspile
"hai dunia"
```
[Github: r17x/babel-plugin-react-suspense](https://github.com/r17x/i18n.macro/tree/feat/minimum-translate)


Dari promosi project OSS diatas hal yang diperlukan adalah

* Sedikit pengetahuan tentang *AST*
* Dibantu dengan program seperti `transpiler` atau `compiler`

Misalnya pada `JavaScript` yang paling populer dengan menggunakan *Babel* dimana terdapat fungsi dan konsep yang disebut dengan `visitor`. visitor bekerja untuk melihat setiap kata dan baris kode namun diatur berdasarkan jenis dari struktur AST misalnya `CallExpression` artinya ada sebuah pernyataan untuk memanggil fungsi. 



Sekian dulu yah, nantikan lanjutannya.
