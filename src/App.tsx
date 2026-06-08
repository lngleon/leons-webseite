import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Impressum from '@/pages/Impressum'
import Datenschutz from '@/pages/Datenschutz'
import Moeglichkeiten from '@/pages/Moeglichkeiten'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        {/* Stille Route: existiert + prerendert, aber bewusst NICHT in der Navbar verlinkt. */}
        <Route path="/möglichkeiten" element={<Moeglichkeiten />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
