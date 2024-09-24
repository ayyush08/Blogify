import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import SharedLayout from './components/SharedLayout'
import LandingPage from './pages/LandingPage'
import Blog from './pages/Blog'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import BlogWriter from './pages/BlogWriter'
const queryClient = new QueryClient()
function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
          <Route path='/' element={<LandingPage />} />
          <Route path='/blog/:id' element={<Blog/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard/:userId' element={<Dashboard/>} />
          <Route path='/write' element={<BlogWriter/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </>
  )
}

export default App
