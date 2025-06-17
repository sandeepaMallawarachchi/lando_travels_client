import Hero from '../components/Hero'
import Blogs from '../components/Blogs'
import About from '../components/About'
import OurServices from '../components/OurServices'
import Contact from '../components/Contact'
import Partnerships from '../components/Partnerships'

const Home = () => {
    return (
        <div>
            <Hero />
            <Blogs />
            <About />
            <OurServices />
            <Contact />
            <Partnerships />
        </div>
    )
}

export default Home