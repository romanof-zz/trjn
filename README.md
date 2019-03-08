## Development
### Setup
- assuming you have **mysql** server setup already
- get the code
```
git clone git@bitbucket.org:romanof/trjn.git
cd trjn
```
- setup environment and packages
```
python3 -m venv env
source env/bin/activate
pip install --upgrade pip
pip install -r pip.cfg
```
- setup db
```
mysql -u root -p
[enter your password]
mysql> drop database trjn;
Query OK, 17 rows affected (0.05 sec)
mysql> create database trjn;
Query OK, 1 row affected (0.00 sec)
```
- data setup
```
python manage.py migrate
python manage.py createsuperuser
```
- run
```
python manage.py runserver
[separate tab] cd ng-trjn
ng serve --open
```
- access
```
backend: http://127.0.0.1:8000/
frontend: http://127.0.0.1:4200/
admin: http://127.0.0.1:8000/admin
```
