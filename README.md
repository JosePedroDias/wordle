# wordle

Playing with the algorithms after seeing https://www.youtube.com/watch?v=v68zYyaEmEA


## Game dictionaries:

- https://www.powerlanguage.co.uk/wordle/ (original one AFAIK)
- https://palavra-do-dia.pt/              (in pt_PT)
- https://wordle.wekele.com/              (in pt, with variants for 5, 6 and 7 letter words)
- https://term.ooo/                       (in pt_BR)


## Gathering my pt_PT dictionary the lazy way:

- https://natura.di.uminho.pt/wiki/doku.php?id=dicionarios:main
- https://natura.di.uminho.pt/download/sources/Dictionaries/wordlists/LATEST/

Created `pt-<n>-natura.js` by filtering out 5, 6 a 7 letter words out of the wordlists file, ignoring words with hiphen. All credits to Universidade do Minho!

The filtering approach it gets you back is super naive.
