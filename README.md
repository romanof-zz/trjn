## Project

This project is meant to empower adventurous souls of the world.
Those include both long-term and short-term travelers, nomads of any kind,
remote workers and that sort of crowd.

### Framing

What can empower such community? (feel free to suggest more things) :

1. help in **Discovery**:
  1. personal **Itineraries** of other ppl to help explore the world out of beaten path.
  2. **Tips** about places. both countries and cities to avoid mistakes.
  3. **Recommendations for places** in the city: good co-working spaces, friendly coffee-shop, nomad food.
2. help **Connecting** the community:
  1. IRC rooms for places.
  2. ppl in your area, meet-ups.
  3. joint planning, expense-sharing?
3. help **Sustaining** the community:
  1. remote jobs.
  2. helping content creators to monetize.

### Problems

- there are very few centralized platforms that serve this community and bring it together. the most prominent ones are paid services (e.g nomad-list).
- most of travel itinerary type content
  - is not community driven. which puts top tourist stops on top.
  - is location bound. mostly within cities.
  - is time bound. mostly optimized for 1-2 week vacation times.
  - is dis-organized. ppl write their own blogs, which makes it less useful for planning and discovery.
  - is dis-jointed. again separate blogs make it hard to discover.
  - most content is around US/EU, which makes other parts of the world hard explore.

### Multipliers

- community is rapidly growing as long-term travel becomes more trendy.
- remote work and flexible location also seems to become more normalized at least in tech community lately, which is another community growth driver.
- structuring and organizing personal itinerary content allows:
  - to explore opportunities to make it multi-lingual.
  - combine recorded experiences of different ppl to customize the itinerary per customer in terms of price, duration and personal preferences.

### MVP

#### Scope decision rational

- before you can work on **connecting** or **sustaining** smth you need to build it. Which automatically prioritizes **discovery** over 2 and 3. As you need to build smth useful to ppl, smth to connect around, before you can call it a community.
- **recommendations for places** are mostly relevant to nomads, so it doesn't target the broader community of travelers.
- **tips** are fairly narrow in terms of content and value. and it's hard to understand how to structure and present them on their own.
- both **tips** & **recommendations for places** can be incorporated into the **itineraries**.
- **itineraries** seem to provide the most value compared to others, as they should generate the comprehensive guide for the entire trip and also help generate other types of content.

__winner: itineraries__

#### MVP Entities

> describes entities and their logical properties.

__Journey__ is a structured way to describe your trip or experience.

_Examples_:

- your 1w or 1m travel to explore some country or a number of counties.
- track in the mountains.
- city tour.
- road trip.

_Properties_:

- name and description (optional).
- collection of milestones (see bellow).
- budget, duration and location. calculated values of separate milestones. could also be a ranges.

__Milestone__ is one of the destinations/highlights/interesting places of your journey. Can be a journey in itself (e.g: mountain trek as a milestone of a longer journey).

_Examples_:

- village along the trek.
- view point in the city.
- city itself.
- any attraction.
- just geo-location with a picture.

_Properties_:

- name, description (optional), picture (optional)
- duration and budget. budget could be a range. both input manually, not calculated.
- how did you get there. transport: type, description, expensiveness, satisfaction.
- where did you sleep. home option: name, type, description, expensiveness, satisfaction.
- food/drinks/coffee: name, description, expensiveness, satisfaction.
- working spots: name, description, expensiveness, satisfaction.
- tips: just written notes around the place.


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
