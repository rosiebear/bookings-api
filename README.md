# Bookings Api

## Setup

### MongoDB
Install mongodb https://docs.mongodb.org/v3.0/installation/

#### Import data to mongodb

```
mongoimport --db simple --collection events --jsonArray events-data.js
mongoimport --db simple --collection calendars --jsonArray calendar-data.js
```

#### Install dependencies

```
npm install
```

#### Start mongoDB

```
mongo
```

#### Start node server

```
npm start
```


