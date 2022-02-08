# wordle

## TL;DR

Playing with the algorithms after seeing https://www.youtube.com/watch?v=v68zYyaEmEA

This node script allows you to play in the console or helps you play (depending on the cheat argument).


Here's some demo playing sessions for you to check:
- [playing game in english (w/ google 10k)](https://asciinema.org/a/467566)
- [playing game in portuguese (w/ natura)](https://asciinema.org/a/467567)
- TODO: playing in cheat mode

I took a completely different approach to help solve the puzzle - just setting local and global restrictions.
Probabilities so far are the same for all words.
After each input, out of the candidates it computes, it shows you at most 10 random candidates.


## Game dictionaries:

- https://www.powerlanguage.co.uk/wordle/ (original one AFAIK)
- https://palavra-do-dia.pt/              (in pt_PT)
- https://wordle.wekele.com/              (in pt, with variants for 5, 6 and 7 letter words)
- https://term.ooo/                       (in pt_BR)


## Gathering wordlists the lazy way

## for pt_PT:

- https://natura.di.uminho.pt/wiki/doku.php?id=dicionarios:main
- https://natura.di.uminho.pt/download/sources/Dictionaries/wordlists/LATEST/

Created `pt-<n>-natura.json` by filtering out 5, 6 a 7 letter words out of the wordlists file, ignoring words with hiphen. All credits to Universidade do Minho!


## for en_US:

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


Created `en-<n>-scowl.json` by filtering out 5, 6 a 7 letter words out of the wordlists file, ignoring words with '. All credits to SCOWL!

- https://github.com/first20hours/google-10000-english -> https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-usa-no-swears-medium.txt

    Data files are derived from the Google Web Trillion Word Corpus, as described by Thorsten Brants and Alex Franz, and distributed by the Linguistic Data Consortium. Subsets of this corpus distributed by Peter Novig. Corpus editing and cleanup by Josh Kaufman.

    Educational and personal/research use of this data is permitted under the LDC license, Norvig's MIT license for his contributions, and US fair use doctrine. I do not recommend using this data for commercial purposes without licensing it from the Linguistic Data Consortium.

Created `en-<n>-google-10k.json` by filtering out 5, 6 a 7 letter words out of the wordlists file'. All credits to the Linguistic Data Consortium!
