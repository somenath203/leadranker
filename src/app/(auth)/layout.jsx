const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-slate-900 dark:via-slate-800 dark:to-orange-950">
        {children}
    </div>
  )
}

export default Layout;