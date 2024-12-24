# WaterLevel-Backend

Node and Express Server for AJAX requests

Visit [Water Level Frontend](https://github.com/jessicatrans/WaterLevel-Frontend/tree/master)

Frontend
- use React to make chart and month picker appear and disappear, create a "see more" or "see less" button
- need to use the state hook with a state variable changed by the button and used to determine what to add to the virtual DOM
- install a package in Replit such as Chart.js and the react-month-year-picker; on backend, requiring cross-fetch will install it automatically

- send an AJAX request from the frontend to the backend
- AJAX POST request to get water data, include a month and year

Backend
- Backend server will handle an AJAX request for the reservoir data, for a given month and year, by getting the data from CDEC with an API call.
- gets data for all seven of the big reservoirs 
- Chart.js to add a chart
