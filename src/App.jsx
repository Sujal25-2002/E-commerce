import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/store"
import Navigation from "./webComponents/Navigation"
import HomePage from "./pages/HomePage"
import ECommercePage from "./pages/ECommercePage"
import TaskManagerPage from "./pages/TaskManagerPage"
import CartPage from "./pages/CartPage"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ecommerce" element={<ECommercePage />} />
            <Route path="/tasks" element={<TaskManagerPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}

export default App
