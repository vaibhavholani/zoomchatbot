import './App.css';
import Navbar from './Components/Navbar/Navbar'
import Meeting from './Components/Meeting/Meeting'
import FAQ from './Components/FAQ/FAQ'
import CustomCommand from './Components/CustomCommand/CustomCommand'
import Create from './Components/Create/Create'
import View from './Components/View/View'
import Dashboard from './Components/Dashboard/Dashboard'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/join/:meeting_data" component={View} />
          <Route path='/add' component={Create} />
        </Switch>
      </Router>
      
      {/* <Create/> */}
      {/* <Dashboard /> */}
      {/* <View/> */}
    </div>
  );
}

export default App;
