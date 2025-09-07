import './App.css'
import UserProfile from './components/UserProfile'
import WelcomeMessage from './components/WelcomeMessage'
import Footer from './components/Footer'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Counter from './components/Counter'
function App() {

  return (
    <>
      <Header />
      <MainContent />
      <Footer />
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
      <Counter/>
      <WelcomeMessage />

    </>
  )
}

export default App
