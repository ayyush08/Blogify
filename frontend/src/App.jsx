import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import SharedLayout from './components/SharedLayout'
import LandingPage from './pages/LandingPage'
import Blog from './pages/Blog'
const queryClient = new QueryClient()

function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
          <Route path='/' element={<LandingPage />} />
          </Route>
          <Route path='/blog/:id' element={<Blog/>} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </>
  )
}

export default App
