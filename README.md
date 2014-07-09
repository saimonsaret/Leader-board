Leader-board
============

To work correctly, this project requires:

1) "developers.json" file in appropriate format: each developer should have a link to his account and photo 

2) to be located on web-server

3) "responsibility" file in format:

    1) test name
    2) - n) contributors emails
    n+1) "###" (end of test description)



Script responsibility_updater.py should be:

1) located in the "WebKit" directory

2) single(!) line in .config file. which contains the name of script output repository

This script creates a "responsibility" format file from WebKit repository
