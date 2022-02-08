# wordle

Playing with the algorithms after seeing https://www.youtube.com/watch?v=v68zYyaEmEA

The filtering approach it gets you back is super naive.



## Game dictionaries:

- https://www.powerlanguage.co.uk/wordle/ (original one AFAIK)
- https://palavra-do-dia.pt/              (in pt_PT)
- https://wordle.wekele.com/              (in pt, with variants for 5, 6 and 7 letter words)
- https://term.ooo/                       (in pt_BR)


## Gathering my pt_PT dictionary the lazy way:

- https://natura.di.uminho.pt/wiki/doku.php?id=dicionarios:main
- https://natura.di.uminho.pt/download/sources/Dictionaries/wordlists/LATEST/

Created `pt-<n>-natura.js` by filtering out 5, 6 a 7 letter words out of the wordlists file, ignoring words with hiphen. All credits to Universidade do Minho!


## Gathering my en_US dictionary the lazy way:

- http://wordlist.aspell.net/ -> http://app.aspell.net/create

    Copyright 2000-2019 by Kevin Atkinson

    Permission to use, copy, modify, distribute and sell these word
    lists, the associated scripts, the output created from the scripts,
    and its documentation for any purpose is hereby granted without fee,
    provided that the above copyright notice appears in all copies and
    that both that copyright notice and this permission notice appear in
    supporting documentation. Kevin Atkinson makes no representations
    about the suitability of this array for any purpose. It is provided
    "as is" without express or implied warranty.

    Copyright (c) J Ross Beresford 1993-1999. All Rights Reserved.

    The following restriction is placed on the use of this publication:
    if The UK Advanced Cryptics Dictionary is used in a software package
    or redistributed in any form, the copyright notice must be
    prominently displayed and the text of this document must be included
    verbatim.

    There are no other restrictions: I would like to see the list
    distributed as widely as possible.

    Special credit also goes to Alan Beale <biljir@pobox.com> as he has
    given me an incredible amount of feedback and created a number of
    special lists (those found in the Supplement) in order to help improve
    the overall quality of SCOWL.

    Many sources were used in the creation of SCOWL, most of them were in
    the public domain or used indirectly.  For a full list please see the
    SCOWL readme.

    http://wordlist.aspell.net/

Created `en-<n>-scowl.js` by filtering out 5, 6 a 7 letter words out of the wordlists file, ignoring words with '. All credits to SCOWL!