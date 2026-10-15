
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"


import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './pages/home/Home.jsx';

import Login from './pages/login/Login.jsx';
import Admin from './pages/admin/Admin.jsx';

//import ItemNavbar from './layout/items/ItemNavbar.jsx'
import Items from './pages/items/Items.jsx'
import ViewItem from './pages/items/ViewItems.jsx';
import AddItem from './pages/items/AddItems.jsx';
import EditItem from './pages/items/EditItems.jsx';

import Employees from './pages/employees/Employees.jsx';
import AddEmployee from './pages/employees/AddEmployees.jsx';
import ViewEmployee from './pages/employees/ViewEmployees.jsx';
import EditEmployee from './pages/employees/EditEmployees.jsx';

import Reviews from './pages/reviews/Reviews.jsx';
import AddReview from './pages/reviews/AddReviews.jsx';
import ViewReview from './pages/reviews/ViewReviews.jsx';

import Vehicles from './pages/vehicles/Vehicles.jsx';
import AddVehicle from './pages/vehicles/AddVehicles.jsx';
import EditVehicle from './pages/vehicles/EditVehicles.jsx';
import ViewVehicle from './pages/vehicles/ViewVehicles.jsx';

import Booking from './pages/bookings/Bookings.jsx';
import AddBooking from './pages/bookings/AddBookings.jsx';
import ViewBooking from './pages/bookings/ViewBookings.jsx';
import EditBooking from './pages/bookings/EditBookings.jsx';

import HomeReview from './pages/home/HomeReview.jsx';

import Fleets from './pages/fleet/Fleets.jsx';
import AddFleet from './pages/fleet/AddFleets.jsx';
import ViewFleet from './pages/fleet/ViewFleets.jsx';
import EditFleet from './pages/fleet/EditFleets.jsx';

import NotFound from './pages/NotFound.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';


function App() {

  return (
    <div className="App">
      <Router>
        <ScrollToTop/>
        <Routes>

          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route exact path="/home/reviews" element={<HomeReview/>}/>


          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/admin" element={<Admin/>}/>

          <Route exact path="/employees"            element={<Employees/>}/>
          <Route exact path="/employees/add"        element={<AddEmployee/>}/>
          <Route exact path="/employees/view/:id"   element={<ViewEmployee/>}/>
          <Route exact path="/employees/edit/:id"   element={<EditEmployee/>}/>

          <Route exact path="/bookings"            element={<Booking/>}/>
          <Route exact path="/bookings/add"        element={<AddBooking/>}/>
          <Route exact path="/bookings/view/:id"   element={<ViewBooking/>}/>
          <Route exact path="/bookings/edit/:id"   element={<EditBooking/>}/>

          <Route exact path="/reviews"            element={<Reviews/>}/>
          <Route exact path="/reviews/add"        element={<AddReview/>}/>
          <Route exact path="/reviews/view/:id"   element={<ViewReview/>}/>

          <Route exact path="/vehicles"            element={<Vehicles/>}/>
          <Route exact path="/vehicles/add"        element={<AddVehicle/>}/>
          <Route exact path="/vehicles/view/:id"   element={<ViewVehicle/>}/>
          <Route exact path="/vehicles/edit/:id"   element={<EditVehicle/>}/>
          
          <Route exact path="/fleets"            element={<Fleets/>}/>
          <Route exact path="/fleets/add"        element={<AddFleet/>}/>
          <Route exact path="/fleets/view/:id"   element={<ViewFleet/>}/>
          <Route exact path="/fleets/edit/:id"   element={<EditFleet/>}/>


          {/*items are useless now anyway */}
          <Route exact path="/items"            element={<Items/>}/>
          <Route exact path="/items/add"        element={<AddItem/>}/>
          <Route exact path="/items/view/:id"   element={<ViewItem/>}/>
          <Route exact path="/items/edit/:id"   element={<EditItem/>}/>
          {/*
          <Route exact path="/viewuser/:id"   element={<ViewUser/>}/>
          */}

          <Route path="*" element={<NotFound/>}/>

        </Routes>
      </Router>

    </div>
  )
}

export default App
