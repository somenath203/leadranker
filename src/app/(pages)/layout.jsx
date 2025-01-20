import Navbar from "../_components/shared-components/Navbar";

const Layout = ({ children }) => {
  return (
    <>
        
        <div className="container mx-auto px-6">
        
            <Navbar />
        
        </div>

        <div className="min-h-screen p-3 lg:p-8 bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-slate-900 dark:via-slate-800 dark:to-orange-950">

          { children }

        </div>
    </>
  )
}

export default Layout;