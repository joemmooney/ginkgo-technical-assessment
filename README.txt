Application to Search for DNA sequences in a Small Protein Database

Run online at 'https://search-proteins-for-dna.herokuapp.com'.

Run locally by doing the following:

1) Download project from GitHub.
2) Enter terminal.
3) Navigate to project folder.
4) Run 'pipenv shell' in terminal to enter the pipenv shell (requires pipenv downloaded on computer) (installs dependencies from requirements.txt on first time run).
5) Run 'bash local_build.txt' to run program.

After running the bash command, all dependencies for the project should be downloaded into your pipenv, then it should run on 'localhost:3000'.  You can access the underlying database by navigating to 'localhost:8000/api/SearchProteins/'.

The site has a button titled 'Match New Sequences' that you can press to enter a new DNA sequence to check.  Upon pressing it, a popup will appear with a text field titled 'DNA Sequence', a checkbox titled 'Force Rerun', and a button titled 'Find Matching Protein'.  Enter your desired sequence into the 'DNA sequence' text field and press the 'Find Matching Protein' button to find out if your sequence is a match with any of the proteins in the database.  A sequence will be considered invalid if it contains characters other than A, C, G, or T.  If you have already run a given sequence, it will not rerun it again unless you have checked the 'Force Rerun' box.  All sequences that are currently being processed and all sequences that have finished being processed are listed in a text list on the page.  For a given search, the list item has text fields titled 'DNA Sequence', 'Status', and 'Match'.  The 'DNA Sequence' corresponds to the sequence you searched for.  The 'Status' shows whether the search is still running, whether it completed, or whether it failed.  The 'Match' shows the first protein the sequence matched with in the database and where it matched it if applicable, and otherwise shows none.  There is also a 'Delete' button next to each entry that can be used to remove it from the database.