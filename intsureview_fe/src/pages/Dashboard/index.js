import Header from '../../components/Header';
import Form from '../../components/Form';
import Footer from '../../components/Footer';
import './styles.css';

const Dashboard = () => {
  // after working on this, I released that I moved some of the function/state management around so it's not contained within just the components
  // this would help with some unnecesary rerenders
  return (
    <div>
      <Header />
      <Form />
      <Footer />
    </div>
  );
};

export default Dashboard;
