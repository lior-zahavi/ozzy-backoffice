import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function BackofficePage(){
  return(
<div className="app-shell">
  <Sidebar/>

  <main className="main-area">
    <Header/>
    <section className="page-content">
    <h1>Organizations</h1>
    <p>Organization management will be added here.</p>
    </section>

  </main>
</div>
  );
}
export default BackofficePage;